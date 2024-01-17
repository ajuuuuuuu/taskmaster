let inputDir = { x: 0, y: 0 }
let scoreBox=document.querySelector('#ScoreBox');
let hiScoreBox=document.querySelector('#HiScoreBox');
const foodSound = new Audio('food.mp3')
const gameOverSound = new Audio("gameover.mp3")
const moveSound = new Audio("move.mp3")
const musicSound = new Audio("music.mp3")
let score = 0;
let HiScoreVal=0
let speed = 5
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
food = { x: 16, y: 12 }


//Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}
function isCollide(snake) {
    //if you bump into yourself

    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }

    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}
function gameEngine() {
    //:Part 1: Updateing the snake array & food

    if (isCollide(snakeArr)) {
        gameOverSound.play()
        musicSound.pause();
        scoreBox.innerText=` score :${score}`;
        inputDir = { x: 0, y: 0 }
        alert("game over press any key")
        score = 0;
        snakeArr = [{ x: 13, y: 15 }]// for reset game head dikahna
    }

    // // if you have eaten the food increment the score and  regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score+=1;
        if(score>HiScoreVal){
            HiScoreVal =score;
            localStorage.setItem("hiScore",JSON.stringify(HiScoreVal));
            hiScoreBox.innerHTML="Hi SCORE:"+HiScoreVal;
        }
        foodSound.play()
        scoreBox.innerText=` score :${score}`;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 3;
        let b = 14;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

    }

    // // Move the snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }

    }
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y



    //Part 2: Dispaly the snake and food
    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {//e is element
        snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head")
        }
        else {

            snakeElement.classList.add("snake")
        }

        board.appendChild(snakeElement);

    });
    //display the food
    foodElement = document.createElement("div")
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food")
    board.appendChild(foodElement);


}

//Main logic starts here
let hs= localStorage.getItem("HIScore");
if(hs===null){
   HiScoreVal=0;
    localStorage.setItem("hiScore",JSON.stringify(HiScoreVal))
}
else{
    HiScoreVal=JSON.parse(hs);
    hiScoreBox.innerText=`Hi SCORE:${hs}`
}
window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDir = { x: 1, y: 0 }// start the game
    moveSound.play();
    musicSound.play();

    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0
            inputDir.y = -1
            console.log("arrow up")
            break;

        case "ArrowDown":
            inputDir.x = 0
            inputDir.y = 1
            console.log("arrow down")
            break;


        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            console.log("arrow left")
            break;

        case "ArrowRight":
            inputDir.x = 1
            inputDir.y = 0
            console.log("arrow right")
            break;

        default:
            break;
    }
});
