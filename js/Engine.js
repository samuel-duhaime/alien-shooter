const gameOverElement = document.getElementById("gameOver"); // Game over Element
const scoreEl = new Text(AppElement, "20px", "20px"); // Score element
const highScoreEl = new Text(AppElement, "20px", "60px"); // Score element
const lvlEl = new Text(AppElement, "485px", "20px"); // Lvl element
scoreEl.update("Score: " + 0); // Initial score element
highScoreEl.update("Highest score: " + 0); // Initial high score element
lvlEl.update("Level: " + 1); // Initial level element

// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    this.root = theRoot; // We need the DOM element every time we create a new enemy
    this.player = new Player(this.root); // Create the player
    this.enemies = []; // All the enemies class
    this.round = null; // Define the initial round number
    this.score = 0; // Define the initial score
    this.highscore = 0; // Define the initial score
    this.lvl = 1; // Define the inital level
    this.live = 3; // Define the initial number of lives

    addBackground(this.root); // We add the background image to the game
  }

  // Make the game start
  gameStart = () => {
    this.gameLoop(); // Start the game loop
    this.player.laser = LASER_NUMBER; // Restart the laser numbers
    laserContainerEl.update("Laser: " + LASER_NUMBER); // Update the laser
  };

  // Make the game restart
  gameRestart = () => {
    const enemiesElements = document.getElementsByClassName("enemy"); // Get all the enemies
    const laserElements = document.getElementsByClassName("laser"); // Get all the lasers

    // Transform enemiesElements to an Array
    Array.from(enemiesElements).forEach((enemy) => {
      enemy.remove(); // Remove all the enemies
    });

    // Transform laserElements to an Array
    Array.from(laserElements).forEach((laser) => {
      laser.remove(); // Remove all the lasers
    });

    /* Reset the engine */
    this.player = new Player(this.root); // Create the player
    this.enemies = []; // All the enemies class
    this.round = null; // Define the initial round number
    this.score = 0; // Define the initial score
    this.lvl = 1; // Define the inital leveldw
    this.live = 3; // Define the initial number of lives

    gameOverElement.style.display = "none"; // Hide the game over info
    changePlayerLives(this.live); // Show lives
    lvlEl.update("Level: " + 1); // Initial level element
    laserContainerEl.update("Laser: " + LASER_NUMBER); // Update the laser

    this.gameLoop(); // Start the game loop
  };

  // Loop every few milliseconds to update enemy positions, detect collision and removes enemies
  gameLoop = () => {
    // when the game start
    if (this.round === null) {
      this.round = 0;
      const introductionElement = document.getElementById("introduction");
      introductionElement.style.display = "none"; // Remove the introduction element
    }

    // Change the lvl every round 50
    if (this.round === GAME_ROUND_PER_LEVEL) {
      this.round = 0; // Restart the round number
      this.lvl++; // Add a lvl
      lvlEl.update("Level: " + this.lvl); // Update the lvl text
    }

    this.round++; // Add a round every loop
    this.score = this.score + 1 * this.lvl; // Add score every loop depending of the level

    scoreEl.update("Score: " + this.score); // Update the score text

    if (this.lastFrame === undefined) {
      // Time has elapsed since the last time this method was called.
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies. Every level, update the MAX_ENEMIES.
    while (this.enemies.length < MAX_ENEMIES * this.lvl) {
      const spot = nextEnemySpot(this.enemies); // We find the next available spot and, using this spot, we create an enemy.
      this.enemies.push(new Enemy(this.root, spot)); // We add this enemy to the enemies array
    }

    // We check if the player is dead. If he is, the user loose one live or the game is over and the player can restart the game
    if (this.isPlayerDead()) {
      const player = this.player;
      // Update the highscore if possible
      if (this.score > this.highscore) {
        this.highscore = this.score;
        highScoreEl.update("Highest score: " + this.highscore); // Update the hight score element
      }

      soundEffect("explosion-effect.mp3"); // Play a sound explosion effect

      // Make an explosion with the player
      player.domElement.src = "images/explosion.gif";
      player.domElement.style.height = PLAYER_HEIGHT;
      player.domElement.style.width = PLAYER_WIDTH;

      // Delete the player after the explosion
      setTimeout(() => {
        player.domElement.remove();
      }, 1000);

      gameOverElement.style.display = "unset"; // Show the game over element
      clearTimeout(this.gameLoop);
      return;
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop with the game speed
    setTimeout(this.gameLoop, GAME_SPEED);
  };

  // Check if the player is dead
  isPlayerDead = () => {
    const enemies = this.enemies;
    const player = this.player;
    const playerX = player.x;
    const playerY = player.y;
    let isPlayerDead = false;

    // Reference : "https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection"
    // Check if there is a collision with each enemies
    enemies.forEach((enemy) => {
      const enemyX = enemy.x;
      const enemyY = enemy.y;

      // Check if there is a collision with the player and the enemy
      if (
        playerX < enemyX + ENEMY_WIDTH &&
        playerX + PLAYER_WIDTH > enemyX &&
        playerY < enemyY + ENEMY_HEIGHT &&
        playerY + PLAYER_HEIGHT > enemyY
      ) {
        // Remove the enemy with the collision
        enemy.root.removeChild(enemy.domElement);
        enemy.destroyed = true;

        // If enemy is a bonusPoint
        if (enemy.bonusPoint > 0) {
          this.score += enemy.bonusPoint; // Add the bonus point
          soundEffect("money-effect.mp3"); // Play a money effect sound
        } else if (this.live > 0) {
          this.live--; // if the player still have more than 0 live. Delete one live

          player.showHit(); // This method will show the player hit for some time

          changePlayerLives(this.live); // Update the players lives
        } else {
          isPlayerDead = true; // If no live. The player is dead.
        }
      }
    });

    return isPlayerDead;
  };
}
