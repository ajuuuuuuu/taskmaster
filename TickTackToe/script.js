let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".Reset-Button");
let newGamebtn = document.querySelector(".new-game-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let turn0 = true;

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turn0 = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    box.innerText = "0";
    if (turn0) {
      box.style.color = "dodgerblue";
      turn0 = false;
    } else {
      box.style.color = "red";
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `${winner} is the winner`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
let count = 0;
const checkWinner = () => {
  for (let pattern of winPattern) {
    // console.log(pattern[0],pattern[1],pattern[2]);
    // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);

    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    console.log(count);
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        console.log(" winne is", pos1);
        showWinner(pos2);
      }
    }
    count++;
    console.log(count);
    if (count === 72) {
      msg.innerText = "Draw";
      console.log("draw");
      msgContainer.classList.remove("hide");
    }
  }
};

resetBtn.addEventListener("click", resetGame);
newGamebtn.addEventListener("click", resetGame);
