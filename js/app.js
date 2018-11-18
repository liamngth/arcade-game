
const defaultPlaPosInX = 200;
const defaultPlaPosInY = 380;
const minSpeed = 200;
const maxSpeed = 600;
// Create an a global function for generate the speed
generateTheSpeed = function() {
  return minSpeed + Math.floor(Math.random() * maxSpeed);
};

// Enemies our player must avoid
var Enemy = function(x, y, movement) {
    this.x = x;
    this.y = y;
    this.movement = movement;

    // The image/sprite for our enemies, this uses
    // a helper to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.checkColisions = function() {
  const spaceBwtPlaVsEnInX = 60;
  const spaceBwtEnVsPlaInx = 75;
  const spaceBwtPlaVsEnInY = 30;
  if (player.x < this.x + spaceBwtPlaVsEnInX &&
      player.x + spaceBwtEnVsPlaInx > this.x &&
      player.y < this.y + spaceBwtPlaVsEnInY &&
      spaceBwtPlaVsEnInY + player.y > this.y) {
      player.x = defaultPlaPosInX;
      player.y = defaultPlaPosInY;
  }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.movement * dt;

    // Reset position of enemy to move across again
    // Set the postion of the bugs from outside the wall
    bugPostions = -100;
    widthOfCanvas = 510;
    if (this.x > widthOfCanvas) {
      this.x = bugPostions;
      this.movement = generateTheSpeed();
    }

    // Check for collisions
    this.checkColisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Playrer section

var Player = function(x, y, movement) {
    this.x = x;
    this.y = y;
    this.movement = movement;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // Wall boundaries
    const heightBoundary = 380;
    const widthBoundary = 400;
    if (this.y > heightBoundary) {
        this.y = heightBoundary;
    }

    if (this.x > widthBoundary) {
        this.x = widthBoundary;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // When the player reaching the top or the water
    if (this.y < 0) {
        this.x = defaultPlaPosInX;
        this.y = defaultPlaPosInY;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    const canvasInXpixel = 50;
    const canvasInYpixel = 35;
    switch (keyPress) {
        case 'left':
            this.x -= this.movement + canvasInXpixel;
            break;
        case 'up':
            this.y -= this.movement + canvasInYpixel;
            break;
        case 'right':
            this.x += this.movement + canvasInXpixel;
            break;
        case 'down':
            this.y += this.movement + canvasInYpixel;
            break;
    }
};

// Instantiate the objects.
let allEnemies = [];
let player = new Player(200, 380, 50);

// Create three bugs in three different positions on the canvas in 'Y'
let enemyPosition = [65, 145, 230];
let enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, generateTheSpeed());
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
