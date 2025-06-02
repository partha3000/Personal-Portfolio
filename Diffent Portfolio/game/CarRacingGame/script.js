const score = document.getElementById('score');
const gameArea = document.getElementById('gameArea');
let player = { speed: 5, score: 0, inPlay: false };
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

document.addEventListener('keydown', e => {
  keys[e.key] = true;
  if (!player.inPlay) startGame();
});

document.addEventListener('keyup', e => {
  keys[e.key] = false;
});

function startGame() {
  gameArea.innerHTML = '';
  player.inPlay = true;
  player.score = 0;

  // Draw road lines
  for (let i = 0; i < 5; i++) {
    let roadLine = document.createElement('div');
    roadLine.classList.add('roadLine');
    roadLine.y = i * 120;
    roadLine.style.top = roadLine.y + 'px';
    gameArea.appendChild(roadLine);
  }

  // Draw player car
  let car = document.createElement('div');
  car.classList.add('car');
  car.style.left = '175px';
  car.style.top = '500px';
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  player.car = car;

  // Enemy cars
  for (let i = 0; i < 3; i++) {
    let enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -(i + 1) * 300;
    enemy.style.top = enemy.y + 'px';
    enemy.style.left = Math.floor(Math.random() * 350) + 'px';
    gameArea.appendChild(enemy);
  }

  window.requestAnimationFrame(playGame);
}

function moveLines() {
  let lines = document.querySelectorAll('.roadLine');
  lines.forEach(line => {
    line.y += player.speed;
    line.style.top = line.y + 'px';
    if (line.y >= 600) {
      line.y = -100;
    }
  });
}

function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function moveEnemy(car) {
  let enemies = document.querySelectorAll('.enemy');
  enemies.forEach(enemy => {
    if (isCollide(car, enemy)) {
      endGame();
    }
    enemy.y += player.speed;
    enemy.style.top = enemy.y + 'px';
    if (enemy.y >= 600) {
      enemy.y = -300;
      enemy.style.left = Math.floor(Math.random() * 350) + 'px';
    }
  });
}

function playGame() {
  if (player.inPlay) {
    moveLines();
    moveEnemy(player.car);

    if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
    if (keys.ArrowRight && player.x < 350) player.x += player.speed;
    if (keys.ArrowUp && player.y > 0) player.y -= player.speed;
    if (keys.ArrowDown && player.y < 500) player.y += player.speed;

    player.car.style.left = player.x + 'px';
    player.car.style.top = player.y + 'px';

    player.score++;
    score.innerText = `Score: ${player.score}`;
    window.requestAnimationFrame(playGame);
  }
}

function endGame() {
  player.inPlay = false;
  score.innerHTML = `Game Over<br>Your final score: ${player.score}<br><small>Press any arrow key to restart</small>`;
}
// Touch Buttons for mobile
document.getElementById('leftBtn').addEventListener('touchstart', () => {
  keys.ArrowLeft = true;
});
document.getElementById('leftBtn').addEventListener('touchend', () => {
  keys.ArrowLeft = false;
});

document.getElementById('rightBtn').addEventListener('touchstart', () => {
  keys.ArrowRight = true;
});
document.getElementById('rightBtn').addEventListener('touchend', () => {
  keys.ArrowRight = false;
});
