// const bodyElement = document.body; // Body Element
const gameEngine = new Engine(AppElement); // Create an engine class with id app

// Handler when a key is press for arrowLeft, arrowRight, keyA or keyD
const keydownHandler = (event) => {
  const eventCode = event.code; // event.code contains a string. The string represents which key was press.

  // If player press space
  if (eventCode === "Space") {
    const enemies = gameEngine.enemies; // Get all the enemies

    gameEngine.player.shootLaser(event, enemies); // Shoot a laser and kill enemies
  }

  // If player press left or a
  if (eventCode === "ArrowLeft" || eventCode === "KeyA") {
    gameEngine.player.moveLeft(event);
  }

  // If player press right or d
  if (event.code === "ArrowRight" || eventCode === "KeyD") {
    gameEngine.player.moveRight(event);
  }

  // If player press up or w
  if (event.code === "ArrowUp" || eventCode === "KeyW") {
    gameEngine.player.moveUp(event);
  }

  // If player press down or s
  if (event.code === "ArrowDown" || eventCode === "KeyS") {
    gameEngine.player.moveDown(event);
  }
};

document.addEventListener("keydown", keydownHandler); // Listen to the keydown for keydownHandler
