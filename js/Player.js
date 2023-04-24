const laserContainerEl = new Text(AppElement, "20px", "60px", "right"); // Create a laser container element
laserContainerEl.update("Laser: " + LASER_NUMBER); // Initial laser container element

// Player class.
class Player {
  // The constructor takes one parameter. This parameter refers to the parent DOM node.
  constructor(root) {
    this.x = GAME_WIDTH / 2 - PLAYER_WIDTH / 2; // The x position starts off in the middle of the screen.
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10; // It represents the y position of the top of the player.
    this.root = root; // Get the root parent
    this.laser = LASER_NUMBER; // Number of laser beam

    // We create a DOM node so we will be updating the DOM node every time we move the player
    this.domElement = document.createElement("img");
    this.domElement.src = "images/player.gif";
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.width = PLAYER_WIDTH;
    this.domElement.style.height = PLAYER_HEIGHT;
    this.domElement.style.zIndex = "10";
    this.domElement.style.transition =
      "top 0.2s ease-in-out, left 0.2s ease-in-out"; // Add an animation

    this.root.appendChild(this.domElement);
  }

  // This method will show the player hit for some time
  showHit = () => {
    /* Change the player filter img to red */
    this.domElement.style.filter =
      "invert(21%) sepia(100%) saturate(7414%) hue-rotate(359deg) brightness(94%) contrast(117%)";

    soundEffect("hit-sound-effect.mp3"); // Play a sound hit effect

    // Clear the style after some time
    setTimeout(() => {
      this.domElement.style.filter = "unset";
    }, 300);
  };

  // This method will be called when the user press space
  shootLaser = (event, enemies) => {
    event.preventDefault(); // Don't scrollbar
 
    // Check if there is some laser 
    if (this.laser >= 1) {
      const laserEl = document.createElement("img"); // Create an laser img element
      laserEl.src = "images/laser.gif"; // Get the image
      laserEl.classList.add("laser"); // Add the laser class

      // Styles the images
      laserEl.style.position = "absolute";
      laserEl.style.zIndex = "10";
      laserEl.style.height = LASER_HEIGHT;
      laserEl.style.width = LASER_WIDTH;
      laserEl.style.left = `${this.x}px`;
      laserEl.style.top = `${this.y - 400}px`; // Ajust the laser to the good place

      this.root.appendChild(laserEl);

      // Show the number of laser
      this.laser -= 1; // Substract one laser
      laserContainerEl.update("Laser: " + this.laser); // Update the laser beam number

      soundEffect("/laser-beam-effect.mp3"); // Play a Laser sound effect

      // Kill all the ennemies with a collision with the laser
      enemies.forEach((enemy) => {
        const enemyX = enemy.x;
        const enemyY = enemy.y;
        const laserX = this.x;
        const laserY = this.y - 400;

        // Check if there is a collision with the laser and the enemy
        if (
          laserX < enemyX + ENEMY_WIDTH &&
          laserX + LASER_WIDTH > enemyX &&
          laserY < enemyY + ENEMY_HEIGHT &&
          laserY + LASER_HEIGHT > enemyY
        ) {
          // Remove the enemy with the collision
          enemy.root.removeChild(enemy.domElement);
          enemy.destroyed = true;
        }
      });

      // Remove the laser Element after a time
      setTimeout(() => {
        laserEl.remove();
      }, 500);
    }
  };

  // This method will be called when the user presses the left key or KeyA.
  moveLeft = (event) => {
    event.preventDefault(); // Don't scrollbar

    if (this.x > 0) {
      this.x -= PLAYER_WIDTH;
    }

    this.domElement.style.left = `${this.x}px`;
  };

  // We do the same thing for the right key or KeyD.
  moveRight = (event) => {
    event.preventDefault(); // Don't scrollbar

    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x += PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.x}px`;
  };

  // The up key or KeyW method
  moveUp = (event) => {
    event.preventDefault(); // Don't scrollbar
    const minY = 0; // Min y position

    if (this.y > minY) {
      this.y -= PLAYER_HEIGHT;
    }
    this.domElement.style.top = `${this.y}px`;
  };

  // The down key or KeyS method
  moveDown = (event) => {
    event.preventDefault(); // Don't scrollbar
    const maxY = GAME_HEIGHT - PLAYER_HEIGHT - 10; // Max y position

    if (this.y < maxY) {
      this.y += PLAYER_HEIGHT;
    }
    this.domElement.style.top = `${this.y}px`;
  };
}
