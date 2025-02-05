//board
var blockSize = 20;
var rows = 20;
var cols = 20;
var board;
var context;
var drawScore;
var restartGame;
//Snake head
var snakeyX = blockSize * 3;
var snakeyY = blockSize * 3;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];


var score = 0;

//bait
var munchyX;
var munchyY;

var youLose = false;

var score = 0;

// Calculating Score function

function drawScore() {
    context.fillStyle = "white";
    context.font = "10px Verdana";
    context.fillText("Score" + score, 5, 20);
    var scoreElement = document.getElementById("score"); // calling the element to score
    drawScore.display;
    updateScore();// update current score
    
}
function updateScore() {
    var scoreElement = document.getElementById("score"); // calling the element to score
    scoreElement.innerHTML = "Score: " + score;
}

// example usage
score += 0;
updateScore(); //function to update current score



//Calling the movement 

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);

    //update();
    setInterval(update, 1000 / 10); //100 millisec
}

//Operating Objects
function update() {

    if (youLose) {
        return;
    }

    
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "pink";
    context.fillRect(munchyX, munchyY, blockSize, blockSize);

    if (snakeyX == munchyX && snakeyY == munchyY) {
        snakeBody.push([munchyX, munchyY]);
        score+=2;
        placeFood();
        console.log(score)
        drawScore();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeyX, snakeyY];
    }

    context.fillStyle = "teal";
    snakeyX += velocityX * blockSize;
    snakeyY += velocityY * blockSize;
    context.fillRect(snakeyX, snakeyY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);


    }


    //You lose conditioning

    
    if (snakeyX < 0 || snakeyX > cols * blockSize || snakeyY < 0 || snakeyY > rows * blockSize) {
        youLose = true;
        alert("Game Over     Score: " + score);
    updateScore();
        
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeyX == snakeBody[i][0] && snakeyY == snakeBody[i][1]) {
            youLose = true;
            alert("Game Over");
        }
    }

}



//Function controls Arrows
function changeDirection(s) {
    if (s.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (s.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (s.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (s.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}



function placeFood() {
    munchyX = Math.floor(Math.random() * cols) * blockSize;
    munchyY = Math.floor(Math.random() * rows) * blockSize;
}

//snakeBody collision function
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (snakeyX == array[i].x && snakeyY == array[i].y) {
            return true;
        }
    }
    return false;
}

// Draw function for canvas

function draw() {

    for (var i = 0; i < snakeyX.length; i++) {
        ctx.fillStyle = "white";
        ctx.fillRect(snakeyX[i].x, snakeyX[i].y, blockSize, blockSize);
    }
}




var updatehead = {
    x: snakeyX,
    y: snakeyY
}

//game over rule

if (snakeyX < blockSize || snakeyX > 17 * blockSize || snakeyY < 3 * blockSize || snakeyY > 17 * blockSize || collision(updatehead, snakeBody)) {
    clearInterval(game);

    snakeyX.unshift(updatehead);
}
// Call draw function

let game = setInterval(draw, 100);
console.log(document.getElementById("restart-button"))

// Add event listener to button
document.getElementById("restart-button").addEventListener("click", restartGame);

// Define function to handle button click event
function restartGame() {

// Reset score
score = 0;

// Stop ongoing game loop
clearInterval(game);

// Reset game objects to initial state


// Start new game loop
game = setInterval(draw, 100);

    // Perform actions to restart game

    console.log("Game restarted!");
}



 var play = true;

 var myAudio = document.getElementById("game Music");

function onKeyDown(event) {
         switch (event.keyCode) {
            case 32: //SpaceBar                    
                if (play) {
                    myAudio.pause();
                    play = false;
                } else {
                 myAudio.play();
                     play = true;
                }
                 break;
        }
   return false;
 }

window.addEventListener("keydown", onKeyDown, false);
