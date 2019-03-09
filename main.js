var blockSize = 40;
var velocityX = 1;
var velocityY = 0;
const INITIAL_LENGHT = 5;
var tail = INITIAL_LENGHT;
var px; 
var py;

var appleX = 0;
var appleY = 0;

var snake  = [];

var currentScore = 0;
var bestScore = 0;
var globalTime = 0;
var roundTime = 0;

function keyPush(evt){
    switch(evt.keyCode){
        case 37:
        if(velocityX == 1) {break;}
        velocityX = -1; velocityY = 0;
        break;
        case 38:
        if(velocityY == 1) {break;}
        velocityX = 0; velocityY = -1;
        break;
        case 39:
        if(velocityX == -1) {break;}
        velocityX = 1; velocityY = 0;
        break;
        case 40:
        if(velocityY == -1) {break;}
        velocityX = 0; velocityY = 1;
        break;
    }
}


window.onload = function() {
    canvas = document.getElementById('snake_game');
    canvasContext = canvas.getContext('2d');
    scoreBoard = document.getElementById('score_board');
    scoreBoardContext = scoreBoard.getContext('2d');
    var d = new Date();
    globalTime = d.getTime();
    roundTime = d.getTime();
    snake = initializeSnake();

    document.addEventListener("keydown", keyPush);
    var framesPerSecond = 5;
    setInterval(main, 1000/framesPerSecond);
}

function main(){
    moveSnake();
    if(snakeGetApple()){
        // extendSnake();
        currentScore++;
        getNewApple();
        tail++;
    }
    drawEverything();
}

function extendSnake(){
    newX = appleX - velocityX * blockSize;
    newY = appleY - velocityY * blockSize;
    snake.push({x:newX, y:newY});
}

function snakeGetApple(){
    if(px == appleX && py == appleY){
        return true;
    } else {
        return false;
    }
}

function drawEverything(){
    colorRect(0, 0, canvas.width, canvas.height, 'gray');
    // colorRect(100, 100, blockSize, blockSize, 'green');
    // colorRect(canvas.width/2, canvas.height/2, blockSize, blockSize, 'green');
    drawSnake(snake);
    drawApple();
    drawScoreBoard();
}

function drawScoreBoard(){
    // const scoreBoardWidth = 200;
    // const scoreBoardHeight = 80;
    // const scoreBoardTopMargin = 50;

    // // context.lineWidth = 2;
    // // context.strokeStyle='white';
    // // context.strokeRect(canvas.width - scoreBoardWidth/2, 200, scoreBoardWidth, scoreBoardHeight);

    // canvasContext.beginPath();
    // canvasContext.lineWidth = "2";
    // canvasContext.strokeStyle = "white";
    // canvasContext.rect(canvas.width/2-scoreBoardWidth/2, scoreBoardTopMargin, scoreBoardWidth, scoreBoardHeight);
    // canvasContext.rect(canvas.width/2-scoreBoardWidth/2, scoreBoardTopMargin, scoreBoardWidth/2, scoreBoardHeight);
    // canvasContext.stroke();
    scoreBoardContext.fillStyle = 'white';
    scoreBoardContext.fillRect(0, 0, scoreBoard.width, scoreBoard.height);
    scoreBoardContext.fillStyle = 'black';
    scoreBoardContext.font = '20px Lucida Console';

    // textY = scoreBoardTopMargin + scoreBoardHeight/2 + 20;
    // textX = canvas.width/2 - 15;

    scoreBoardContext.fillText('Score: ' + currentScore, 10, 20);
    scoreBoardContext.fillText('Best score: ' + bestScore, 10, 37);
    // canvasContext.fillText(ballSpeedY, 100, 100);
    d = new Date();
    scoreBoardContext.fillText('Round time: ' + Math.round((d.getTime() - roundTime)/1000) + ' s', 250, 20);
    scoreBoardContext.fillText('Total time: ' + Math.round((d.getTime() - globalTime)/1000) + ' s', 250, 37);

    
}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function drawApple(){
    colorRect(appleX, appleY, blockSize - 2, blockSize - 2, 'red');
}

function getNewApple(){
    var keepLooking = true;
    while(keepLooking){
        appleX = Math.floor(Math.random() * canvas.width / blockSize) * blockSize;
        appleY = Math.floor(Math.random() * canvas.height / blockSize) * blockSize;
        keepLooking = false;
        for(var i=0; i<snake.length; i++){
            if(snake[i].x == appleX && snake[i].y == appleY){
                keepLooking = true;
            }
        }
    }
}

function moveSnake(){
    px += velocityX * blockSize;
    py += velocityY * blockSize;
    if(px < 0) {
        px = canvas.width - blockSize;
    } else if (px > canvas.width - blockSize) {
        px = 0;
    } else if (py < 0 ) {
        py = canvas.height - blockSize;
    } else if (py > canvas.height - blockSize) {
        py = 0;
    }

    for(var i=0;i<snake.length;i++){
        colorRect(snake[i].x, snake[i].y, blockSize, blockSize, 'lime');
        if(snake[i].x == px && snake[i].y == py){
            if(currentScore > bestScore){
                bestScore = currentScore;
            }
            currentScore = 0;
            d = new Date();
            roundTime = d.getTime();
            tail = INITIAL_LENGHT;
        }
    }

    snake.push({x: px, y:py});

    while(snake.length > tail){
        snake.shift();
    }

}

function drawSnake(snake){
    for(var i=0;i<snake.length;i++){
        colorRect(snake[i].x, snake[i].y, blockSize-2, blockSize-2, 'green');
    }
}

function initializeSnake(){
    var snakeBody = [];
    startX = Math.floor(Math.random() * canvas.width / blockSize) * blockSize;
    startY = Math.floor(Math.random() * canvas.height / blockSize) * blockSize;
    px = startX;
    py = startY;
    snakeBody.push({x:startX, y:startY});
    return snakeBody;
}