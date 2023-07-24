const SPEED = 0.02;

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem
    this.reset()
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--position")
    )
  }

  set position(value) {
    this.paddleElem.style.setProperty("--position", value)
  }

  rect() {
    return this.paddleElem.getBoundingClientRect()
  }

  reset() {
    this.position = 50
  }

  update(delta, ballHeight) {
    this.position += SPEED * delta * (ballHeight - this.position);
  }

 
  animate(delta, ballHeight) {
    let newPosition = this.position + SPEED * delta * (ballHeight - this.position);
    if (newPosition < 0) {
      newPosition = 0;
    } else if (newPosition > window.innerHeight - this.paddleElem.clientHeight) {
      newPosition = window.innerHeight - this.paddleElem.clientHeight;
    }
    this.position = newPosition;
  }

}
