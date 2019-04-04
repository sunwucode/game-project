// General Setting

var currentColor = "black";

var myGameArea = {
  canvas: document.getElementById("canvas"),
  containedObjects: [],
  setCanvas: function() {
    this.canvas.width = canvas.scrollWidth;
    this.canvas.height = canvas.scrollHeight;
    this.canvas.color = canvas.color;
    this.ctx = canvas.getContext("2d");

    this.interval = setInterval(updateGameArea, 100);
  },
  listenKeyboard: function() {
    document.onkeydown = function(event) {
      switch (event.keyCode) {
        case 38: // up arrow
          player1.speedY -= 10;
          break;
        case 40: // down arrow
          player1.speedY += 10;
          break;
        case 37: // left arrow
          player1.speedX -= 10;
          break;
        case 39: // right arrow
          player1.speedX += 10;
          break;
        case 88: // key x
          currentColor = currentColor === "black" ? "white" : "black";
          // ternaire, très utile pour des attributions.
          // containedObjects.map(function(item) {
          //   if (item.color === "white") {
          //     color = "black";
          //   }
          //   if (item.color === "black") {
          //     color = "white";
          //   }
          //   console.log(item);
          // });
          break;
      }
    };
  },
  start: function() {
    console.log(this);
    this.setCanvas();
    this.listenKeyboard();
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

// update() {

function drawObstacles() {
  myGameArea.ctx.fillRect(220, 500, 100, 100);
  myGameArea.ctx.fillRect(330, 500, 100, 100);
  myGameArea.ctx.fillRect(220, 390, 100, 100);
  myGameArea.ctx.fillRect(330, 390, 100, 100);
  myGameArea.ctx.fillRect(330, 280, 100, 100);

  // moving plateforme
  myGameArea.ctx.fillRect(800, 280, 200, 50);
}

function updateGameArea() {
  myGameArea.clear();

  drawObstacles();
  player1.newPos();
  player1.boundaries();
  player1.draw();
}
// Definition of the Player object / Ball class

class Ball {
  constructor(x, y, radius, color) {
    this.radius = radius;
    this.color = color;
    this.x = x;
    this.y = y;
    // new speed properties
    this.speedX = 0;
    this.speedY = 0;
    isblocked: false;
  }
  draw(context) {
    //myGameArea.ctx.fillStyle = this.color;
    myGameArea.ctx.fillStyle = currentColor;
    myGameArea.ctx.beginPath();
    // ctx.arc(x, y, radius, startAngle, endAngle)
    myGameArea.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    myGameArea.ctx.fill();
  }
  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  boundaries() {
    if (this.y + this.speedY > canvas.height || this.y + this.speedY < 0) {
      this.speedY = 0;
    }
    if (this.x + this.speedX > canvas.width || this.x + this.speedX < 0) {
      this.speedX = 0;
    }
  }
}
myGameArea.start();
let player1 = new Ball(50, 550, 50, "black");
myGameArea.containedObjects.push(player1);
player1.draw(myGameArea.ctx);

//Keyboard controls

// key up function - to apply ?
// document.onkeyup = function(event) {
//   Ball.speedX = 0;
//   Ball.speedY = 0;
// };

// obstacles /////////////////////////////////////////////
class Shapes {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw() {
    myGameArea.ctx.fillStyle = currentColor;
    myGameArea.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Column extends Shapes {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
  }
  // draw() {
  //   myGameArea.ctx.fillStyle = currentColor;
  //   myGameArea.ctx.fillRect(this.x, this.y, this.width, this.height);
  // } not necessary
}
//first obstacle
drawObstacles();

//column Array
// ctx.fillRect(600, 280, 100, 310);
// var column2 = new column(1500, 100, 100, 100);
// column2.draw();
// var columns = [new Column(1500, 100, 100, 100), new Column(600, 280, 100, 310)];
myGameArea.containedObjects.push(new Column(1500, 100, 100, 100));
myGameArea.containedObjects.push(new Column(600, 280, 100, 310));
class movingPlateform {}

// drawLoop();

// function drawLoop() {
//   ctx.clearRect(player1.x, player1.y, 50, 0, Math.PI * 2);
//   drawPlayer1();

//   requestAnimationFrame(function() {
//     drawLoop();
//   });
// }
// setInterval(function() {
//   update();
//   player1.draw(ctx);
// }, 100);

// function update() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

// window.onclick = function() {
//   currentColor = "yellow";
// };

// Collision
// -----------------------------------------------------------------------------
// function rectangleCollision(player1, rectB) {
//   return (
//     player1.y + player1.height >= rectB.y &&
//     player1.y <= rectB.y + rectB.height &&
//     player1.x + player1.width >= rectB.x &&
//     player1.x <= rectB.x + rectB.width
//   );
// }

// function checkCrashes() {
//   allPipes.forEach(function(onePipe) {
//     if (rectangleCollision(celine, onePipe)) {
//       celine.isCrashed = true;
//       onePipe.isCrashed = true;
//     }
//   });
// }
