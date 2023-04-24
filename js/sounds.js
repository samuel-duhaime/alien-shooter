// Make a sound when the player get hit or explosion
const soundEffect = (soundName) => {
  const sound = new Audio("sounds/" + soundName); // Create a sound
  sound.play(); // Play the sound
};
