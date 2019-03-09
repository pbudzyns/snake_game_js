var blockSize = 40;
var velocityX = 1;
var velocityY = 0;

var snake  = [];

function keyPush(evt){
    switch(evt.keyCode){
        case 37:
        velocityX = -1; velocityY = 0;
        break;
        case 38:
        velocityX = 0; velocityY = -1;
        break;
        case 39:
        velocityX = 1; velocityY = 0;
        break;
        case 40:
        velocityX = 0; velocityY = 1;
        break;
    }
}


window.onload = function() {
    canvas = document.getElementById('snake_game');
    canvasContext = canvas.getContext('2d');
    snake = initializeSnake();

    document.addEventListener("keydown", keyPush);
    var framesPerSecond = 10;
    setInterval(main, 1000/framesPerSecond);
}

function main(){
    moveSnake();
    drawEverything();
}

function drawEverything(){
    colorRect(0, 0, canvas.width, canvas.height, 'gray');
    // colorRect(100, 100, blockSize, blockSize, 'green');
    // colorRect(canvas.width/2, canvas.height/2, blockSize, blockSize, 'green');
    drawSnake(snake);
}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function moveSnake(){
    for(var i=0;i<snake.length;i++){
        if(snake[i].x >= canvas.width) {
            snake[i].x = 0;
        } else if (snake[i].x < 0) {
            snake[i].x = canvas.width - blockSize;
        } else {
            snake[i].x += velocityX * blockSize;
        }

        if(snake[i].y >= canvas.height) {
            snake[i].y = 0;
        } else if (snake[i].y < 0) {
            snake[i].y = canvas.height - blockSize;
        } else {
            snake[i].y += velocityY * blockSize;
        }
    }
}

function drawSnake(snake){
    // console.log('drawing snake');
    // console.log(snake[0].x);
    for(var i=0;i<snake.length;i++){
        // console.log(i);
        colorRect(snake[i].x, snake[i].y, blockSize, blockSize, 'green');
        
    }
    
}

function initializeSnake(){
    var snakeBody = [];
    startX = Math.floor(Math.random() * canvas.width / blockSize) * blockSize;
    startY = Math.floor(Math.random() * canvas.height / blockSize) * blockSize;
    snakeBody.push({x:startX, y:startY});
    // snakeBody.push({x:100, y:100});
    return snakeBody;
}