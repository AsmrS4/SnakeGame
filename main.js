const playBoard = document.querySelector(".play-board");
const scoreElem = document.querySelector(".curr-score");
const highScoreElem = document.querySelector(".max-score");
const controls = document.querySelectorAll(".controls i");


let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let setIntervalId;
let snakeBody = [];
let score = 0;

let highScore = localStorage.getItem("max-score") || 0;
highScoreElem.innerText = `Max score: ${highScore}`;

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30 + 1);
    foodY = Math.floor(Math.random() * 30 + 1);
}

const alertGameOver = () => {
    clearInterval(setIntervalId);
    alert("GAME OVER!");
    location.reload();
}

const changeDirection = e => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.key === "ArrowRight" && velocityY != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


const initGame = () => {
    if (gameOver) {
        return alertGameOver();
    }
    let html = `<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
        score++;
        highScore = score > highScore ? score : highScore;

        localStorage.setItem("max-score", highScore);
        scoreElem.innerText = `Score: ${score}`;
        highScoreElem.innerText = `Max score: ${highScore}`;
    }
    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;

        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);