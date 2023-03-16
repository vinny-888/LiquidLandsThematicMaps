// Get canvas element and context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Load images
const attackingImage = new Image();
attackingImage.src = "./images/attacking.png";

const defendingImage = new Image();
defendingImage.src = "./images/defending.png";

// Set starting positions and strength levels
let attackingX = 50;
let attackingY = 100;
let defendingX = 350;
let defendingY = 100;
let attackingStrength = parseInt(document.getElementById("attack").value);
let defendingStrength = parseInt(document.getElementById("defense").value);

// Draw initial images
attackingImage.onload = function() {
  ctx.drawImage(attackingImage, attackingX, attackingY);
};
defendingImage.onload = function() {
  ctx.drawImage(defendingImage, defendingX, defendingY);
};

// Move attacking image to the right and check for collision with defending image
function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw images at new positions
  attackingX += attackingStrength;
  defendingStrength = parseInt(document.getElementById("defense").value);
  ctx.drawImage(attackingImage, attackingX, attackingY);
  ctx.drawImage(defendingImage, defendingX, defendingY);

  // Check for collision and adjust positions
  if (attackingX + attackingImage.width >= defendingX) {
    attackingX = defendingX - attackingImage.width;
    defendingStrength -= attackingStrength;
  }

  // Draw strength levels
  ctx.fillStyle = "red";
  ctx.fillRect(attackingX, attackingY - 20, attackingStrength * 10, 10);
  ctx.fillStyle = "green";
  ctx.fillRect(defendingX, defendingY - 20, defendingStrength * 10, 10);

  // Check for end of animation
  if (defendingStrength <= 0) {
    clearInterval(animation);
  }
}

// Start animation on button click
document.getElementById("start").addEventListener("click", function() {
  attackingStrength = parseInt(document.getElementById("attack").value);
  defendingStrength = parseInt(document.getElementById("defense").value);
  animation = setInterval(animate, 50);
});
