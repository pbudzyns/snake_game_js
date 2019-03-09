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
    snake = initializeSnake();

    document.addEventListener("keydown", keyPush);
    var framesPerSecond = 5;
    setInterval(main, 1000/framesPerSecond);
}

function main(){
    moveSnake();
    if(snakeGetApple()){
        // extendSnake();
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
}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function drawApple(){
    colorRect(appleX, appleY, blockSize, blockSize, 'red');
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