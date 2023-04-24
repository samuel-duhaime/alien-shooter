// Text class for score or more
class Text {
  constructor(root, xPos, yPos, direction = "left") {
    this.domElement = document.createElement("div"); // Create a div

    // CSS of the Text
    this.domElement.style.position = "absolute";
    this.domElement.style.top = yPos;
    this.domElement.style.color = "white";
    this.domElement.style.font = "normal 30px Time";
    this.domElement.style.fontFamily = "Courier New";
    this.domElement.style.zIndex = 2000;

    // Change depending of the direction
    if (direction === "left") {
      this.domElement.style.left = xPos;
    } else if (direction === "right") {
      this.domElement.style.right = xPos;
    }

    root.appendChild(this.domElement);
  }

  // Update the text displayed in the DOM element
  update(txt) {
    this.domElement.innerText = txt;
  }
}
