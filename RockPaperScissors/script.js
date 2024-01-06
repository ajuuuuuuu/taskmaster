let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector(".msg");

const userScorePara = document.querySelector(".user-score");
const compScorePara = document.querySelector(".comp-score");

const USERScore=document.querySelector(".adr")
const COMPScore=document.querySelector(".adr")

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#fe7f2d";
  DRAW();
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    USERSCORECOLOR();
    
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
    COMPSCORECOLOR();
    
  }
};

const playGame = (userChoice) => {
  //Generate computer choice
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    //Draw Game
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      //scissors, paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      //rock, scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
      //rock, paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

const USERSCORECOLOR=()=>{
   
    userScorePara.style.color="white";
    compScorePara.style.color="white";
    userScorePara.style.border="1px solid #38a3a5";
    userScorePara.style.backgroundColor="green";
    compScorePara.style.border="1px solid white";
    userScorePara.style.zoom="100%";
    compScorePara.style.backgroundColor="red";
    compScorePara.style.zoom="90%";
    compScorePara.style.transition="0.3s"
    userScorePara.style.transition="0.3s"


}
const COMPSCORECOLOR=()=>{
    
    compScorePara.style.color="white";
    compScorePara.style.border="1px solid #38a3a5";
    userScorePara.style.color="white";
    compScorePara.style.backgroundColor="green";
    userScorePara.style.border="1px solid white";
    compScorePara.style.zoom="100%";
    userScorePara.style.backgroundColor="red";
    userScorePara.style.zoom="90%";
    compScorePara.style.transition="0.3s"
userScorePara.style.backgroundColor="0.3s"
    
}
const DRAW=()=>{
    compScorePara.style.backgroundColor="#ffbe0b";
    userScorePara.style.backgroundColor="#ffbe0b";
    compScorePara.style.color="white";
    userScorePara.style.zoom="80%";
    compScorePara.style.zoom="80%"
    userScorePara.style.color="white";
    compScorePara.style.border="1px solid white";
    userScorePara.style.border="1px solid white";
}
