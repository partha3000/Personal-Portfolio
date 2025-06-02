const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");

let score = 0;
let timeLeft = 30;
let timer;
let circleTimeout;

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  startBtn.disabled = true;

  spawnCircle();
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft === 0) endGame();
  }, 1000);
}

function spawnCircle() {
  // Clear existing circle
  gameArea.innerHTML = "";

  const circle = document.createElement("div");
  circle.classList.add("circle");

  const size = Math.random() * 40 + 30; // 30 to 70 px
  const x = Math.random() * (gameArea.clientWidth - size);
  const y = Math.random() * (gameArea.clientHeight - size);

  circle.style.width = size + "px";
  circle.style.height = size + "px";
  circle.style.left = x + "px";
  circle.style.top = y + "px";

  circle.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    spawnCircle();
  });

  gameArea.appendChild(circle);

  circleTimeout = setTimeout(spawnCircle, 1500); // New circle if not clicked
}

function endGame() {
  clearInterval(timer);
  clearTimeout(circleTimeout);
  gameArea.innerHTML = "";
  alert("Time's up! Your score: " + score);
  startBtn.disabled = false;
}

startBtn.addEventListener("click", startGame);
