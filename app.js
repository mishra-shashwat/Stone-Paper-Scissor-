let userScore = 0;
let compScore = 0;
let gameOver = false;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const res = document.querySelector("#res");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }

  if (userScore === 10 || compScore === 10) {
    gameOver = true; // Set the game over flag to true
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = 1000;
    
    if (userScore === 10) {
      res.innerText = 'Game Over... You Win!!!';
      res.style.backgroundColor = "green";
    } else if (compScore === 10) {
      res.innerText = 'Sorry... Game Over! Comp Wins.';
      res.style.backgroundColor = "red";
    }
  }
};

const playGame = (userChoice) => {
  if (gameOver) return; // Prevent further input if the game is over

  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (!gameOver) {
      const userChoice = choice.getAttribute("id");
      playGame(userChoice);
    }
  });
});

