const INITIAL_VELOCITY = 0.05;
const VELOCITY_INCREASE = 0.000005;
export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem;
    this.paused = true;
    this.reset();
    this.sound1 = new Audio("sound/pingpongbat.ogg");
    this.sound2 = new Audio("sound/pingpongboard.ogg");
  }

  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
  }

  set x(value) {
    this.ballElem.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
  }

  set y(value) {
    this.ballElem.style.setProperty("--y", value);
  }

  rect() {
    return this.ballElem.getBoundingClientRect();
  }

  reset() {
    // window.alert("New Game");
    // this.sound3.play();
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 };
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this.velocity = INITIAL_VELOCITY;
  }

  update(delta, paddleRects) {
    if (!this.paused) {
      this.x += this.direction.x * this.velocity * delta;
      this.y += this.direction.y * this.velocity * delta;
      this.velocity += VELOCITY_INCREASE * delta;
      const rect = this.rect();

      if (rect.bottom >= window.innerHeight || rect.top <= 0) {
        this.direction.y *= -1;
        this.sound2.play();
      }

      if (paddleRects.some((r) => isCollision(r, rect))) {
        this.direction.x *= -1;
        // this.hit();
        this.sound1.play();
      }
    }
  }
  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }
  handleKeyPress(event) {
    if (event.keyCode === 32) {
      this.paused = !this.paused;
      if (this.paused) {
        document.getElementById("pauseButton").textContent = "Resume";
      } else {
        document.getElementById("pauseButton").textContent = "Pause";
      }
    }
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}
