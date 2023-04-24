// The Enemy class for the object and to update
class Enemy {
  constructor(theRoot, enemySpot) {
    this.root = theRoot; // theRoot refers to the parent DOM element.
    this.spot = enemySpot; // enemySpot is the position of the enemy (either 0, 1, 2, 3 or 4)
    this.x = enemySpot * ENEMY_WIDTH; // Initial enemy x position
    this.y = -ENEMY_HEIGHT; // Initial Enemy y
    this.destroyed = false; // Is enemy destroyed

    // All the ennemy images
    this.enemiesImg = [
      "./images/enemy-1.gif",
      "./images/enemy-2.gif",
      "./images/enemy-3.gif",
      "./images/bonus.gif",
    ];
    this.enemyIndex = Math.floor(Math.random() * (3 - 0 + 1) + 0); // Random Enemy img between 0 and 3
    this.bonusPoint = this.enemyIndex === 3 ? 500 : 0; // If the enemy is a bonus, give point

    /* Modify the DOM of the img */
    this.domElement = document.createElement("img"); // Img element
    this.domElement.classList.add("enemy"); // Class to get all the enemies when restart
    this.domElement.src = this.enemiesImg[this.enemyIndex];
    this.domElement.style.position = "absolute";
    this.domElement.style.width = ENEMY_WIDTH;
    this.domElement.style.height = ENEMY_HEIGHT;
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;

    // Show that the user can actually see the img DOM node, we append it to the root DOM node.
    theRoot.appendChild(this.domElement);
    this.speed = Math.random() / 2 + 0.25; // Random speed
  }

  // Update the enemy
  update = (timeDiff) => {
    this.y = this.y + timeDiff * this.speed; // Update the enemy y position
    this.domElement.style.top = `${this.y}px`; // Update the CSS y position

    // if If the y position of the DOM element is greater than the GAME_HEIGHT then remove the enemy
    if (this.y > GAME_HEIGHT) {
      this.delete(); // Delete the enemy
    }
  };

  // Delete the enemy
  delete = () => {
    this.root.removeChild(this.domElement);
    this.destroyed = true;
  };
}
