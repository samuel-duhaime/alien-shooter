// The purpose of this function is to determine in which slot to place our next enemy. 
const nextEnemySpot = (enemies) => {
  const enemySpots = GAME_WIDTH / ENEMY_WIDTH; // enemySpots will refer to the number of spots available

  // To find out where to place an enemy, we first need to find out which are the spots available
  const spotsTaken = [false, false, false, false, false];
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true;
  });

  // We are now in a position to find out position. We declare a variable candidate that is initially undefined.
  // candidate represents a potential spot. The variable will be repeatedly assigned different numbers.
  // We will randomly try different spots until we find out that is available
  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    // candidate is assigned a random number between 0 and enemySpots (not including enemySpots). (what number is enemySpots?)
    candidate = Math.floor(Math.random() * enemySpots);
  }

  // When the while loop is finished, we are assured that we have a number that corresponds to a free spot, so we return it.
  return candidate;
};

// addBackground contains all the logic to display the starry background of the game.
const addBackground = (root) => {
  const bg = document.createElement("img"); // We create a new img DOM node.

  /* Background css */
  bg.src = "images/alien-background.jpg";
  bg.style.height = `${GAME_HEIGHT}px`;
  bg.style.width = `${GAME_WIDTH}px`;

  root.append(bg); // We add it to the root DOM node

  const whiteBox = document.createElement("div"); // Create a whiteBox to hide the enemy
  whiteBox.style.zIndex = 100; // We put a high z-index so that the div is placed over all other DOM nodes
  whiteBox.style.position = "absolute";
  whiteBox.style.top = `${GAME_HEIGHT}px`;
  whiteBox.style.height = `${ENEMY_HEIGHT}px`;
  whiteBox.style.width = `${GAME_WIDTH}px`;
  whiteBox.style.background = "#fff";
  root.append(whiteBox);
};

// Change the player lives
const changePlayerLives = (lives) => {
  const live1 = document.getElementById("live-1"); // Get the live 1 element
  const live2 = document.getElementById("live-2"); // Get the live 1 element
  const live3 = document.getElementById("live-3"); // Get the live 1 element

  // Reset when restart the game
  if (lives === 3) {
    live3.style.color = "white";
    live2.style.color = "white";
    live1.style.color = "white";
  }

  if (lives < 3) {
    live3.style.color = "black";
  }

  if (lives < 2) {
    live2.style.color = "black";
  }

  if (lives <= 0) {
    live1.style.color = "black";
  }
};
