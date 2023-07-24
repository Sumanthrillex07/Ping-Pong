import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScore1 = document.getElementById("player-score");
const computerScore1 = document.getElementById("computer-score");
const sound3 = new Audio("sound/censorbeep.mp3");
let lastTime;
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    if (isLose()) handleLose();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  sound3.play();
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScore1.textContent = parseInt(playerScore1.textContent) + 1;
  } else {
    computerScore1.textContent = parseInt(computerScore1.textContent) + 1;
  }
  ball.reset();
  computerPaddle.reset();
}
function handlePause() {
  const rect = ball.rect();
  ball.paused = !ball.paused;
  if (ball.paused) {
    document.getElementById("pauseButton").textContent = "Resume";
  } else {
    document.getElementById("pauseButton").textContent = "Pause";
  }
}

document.getElementById("pauseButton").onclick = function () {
  handlePause();
};

document.addEventListener("mousemove", (e) => {
  if (ball.paused) {
    return;
  }
  playerPaddle.position = (e.y / window.innerHeight) * 100;
  // playerPaddle.hit();
});
document.addEventListener("keydown", (event,e) => {
  if (event.keyCode ===32) {
    ball.handleKeyPress(event);
  } else if (event.keyCode === 38) {
    if (ball.paused) {
      return;
    }
    playerPaddle.position -= 5;
  } else if (event.keyCode === 40) {
    if (ball.paused) {
      return;
    }
    playerPaddle.position += 5;
  }
});

window.requestAnimationFrame(update);

// const sound = new Audio("win.wav");

// playerPaddle.hit = function () {
//   sound.play();
// };

// computerPaddle.hit = function () {
//   sound.play();
// };
