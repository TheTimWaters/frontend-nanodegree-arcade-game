// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = (Math.floor(Math.random() * 3 + 1)) * 83 - 20;
    this.speed = (Math.floor(Math.random() * 100) + 90);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x > canvas.width) {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = (Math.floor(Math.random() * 5)) * 101;
    this.y = 5 * 83 - 31;
    this.input = '';
};

Player.prototype.update = function() {
    switch (this.input) {
        case "up":
            this.y -= 83;
            break;
        case "down":
            if (this.y < 5 * 83 - 31) {
                this.y += 83;
            }
            break;
        case "left":
            this.x -= 101;
            break;
        case "right":
            this.x += 101;
            break;
        default:
            break;
    }
    this.input = "";
};

Player.prototype.render = function() {
    // check for 'colision' with water
    if (this.y < 50) {
        allKeys[Math.floor(this.x / 101.0)].found = true;
        this.x = (Math.floor(Math.random() * 5)) * 101;
        this.y = 5 * 83 - 31;
    } else {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

Player.prototype.handleInput = function(input) {
    console.log("input received " + input);
    this.input = input;
};

var Key = function(x, y) {
    this.sprite = 'images/Key.png';
    this.x = x;
    this.y = y;
    this.found = false;
};

Key.prototype.render = function() {
    if (this.found) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var i = 0;
var numEnemies = 5;
var allEnemies = [];
for (i = 0; i < numEnemies; i++) {
    allEnemies.push(new Enemy());
}

var numKeys = 5;
var allKeys = [];

for (i = 0; i < numKeys; i++) {
    allKeys.push(new Key(101 * i, 0));
}

// Place the player object in a variable called player
var player = new Player();

function checkCollisions() {

    allEnemies.forEach(function(enemy) {
        if (Math.abs(enemy.x - player.x) < 50 &&
            Math.abs(enemy.y - player.y) < 40) {
            console.log("Collision detected!!");
            player.x = (Math.floor(Math.random() * 5 + 1)) * 101;
            player.y = 5 * 83 - 31;
        }
    });

    gameOver = true;
    allKeys.forEach(function(key) {
        if (key.found === false) {
            gameOver = false;
        }
    });
    if (gameOver === true) {
        allKeys.forEach(function(key) {
            key.found = false;
        });
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});