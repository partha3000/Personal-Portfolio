let userScore = 0;
let computerScore = 0;

function play(userChoice) {
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  const resultDisplay = document.getElementById('result');

  if (userChoice === computerChoice) {
    resultDisplay.textContent = `It's a draw! You both picked ${userChoice}.`;
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    userScore++;
    resultDisplay.textContent = `You Win! ${userChoice} beats ${computerChoice}.`;
  } else {
    computerScore++;
    resultDisplay.textContent = `You Lose! ${computerChoice} beats ${userChoice}.`;
  }

  document.getElementById('userScore').textContent = userScore;
  document.getElementById('computerScore').textContent = computerScore;
}
