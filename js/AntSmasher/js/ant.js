class Ant {
  constructor(radius = 20, x = 0, y = 0, boundary, antIndex) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.mass = this.radius ** 3;
    this.dx = Math.random() > 0.5 ? 1 * Math.random() * 5 : -Math.random() * 5;
    this.dy = Math.random() > 0.5 ? 1 * Math.random() * 5 : -Math.random() * 5;
    this.parent = document.getElementById("box");
    this.handle = document.createElement("div");
    this.handle.classList.add("ant");
    this.handle.setAttribute("antIndex", antIndex);
    this.antIndex = antIndex;
    this.walls = boundary;
    this.initAntDom();
  }

  /** returns the speed of ant */
  speed = () => {
    return Math.sqrt(this.dx ** 2 + this.dy ** 2);
  };

  /** returns the angle where the ant is moving towards */
  angle = () => {
    return Math.atan(this.dy, this.dx);
  };

  /** rotates the ant's head towards the direction it's heading to */
  rotate = (angle) => {
    if (this.dx < 0 && this.dy < 0) {
      this.handle.style.transform = `rotate(-${radianToDegree(angle) + 90}deg)`;
    } else if (this.dx < 0 && this.dy > 0) {
      this.handle.style.transform = `rotate(-${radianToDegree(angle) + 90}deg)`;
    } else if (this.dx > 0 && this.dy > 0) {
      this.handle.style.transform = `rotate(${radianToDegree(angle) + 90}deg)`;
    } else if (this.dx > 0 && this.dy < 0) {
      this.handle.style.transform = `rotate(${radianToDegree(angle) + 90}deg)`;
    } else if (this.dx === 0 && this.dy < 0) {
      this.handle.style.transform = `rotate(0deg)`;
    } else if (this.dx === 0 && this.dy > 0) {
      this.handle.style.transform = `rotate(180deg)`;
    } else if (this.dy === 0 && this.dx < 0) {
      this.handle.style.transform = `rotate(-90deg)`;
    } else if (this.dy === 0 && this.dx > 0) {
      this.handle.style.transform = `rotate(90deg)`;
    }
  };

  /** inits ant DOM */
  initAntDom = () => {
    this.handle.style.position = "absolute";
    this.handle.style.borderRadius = "50%";
    this.handle.style.width = 2 * this.radius + "px";
    this.handle.style.height = 2 * this.radius + "px";
    this.handle.style.backgroundColor = this.color;
    this.handle.style.left = this.x + "px";
    this.handle.style.top = this.y + "px";

    this.parent.appendChild(this.handle);
    //   ants.push(this);
  };

  /** updates the ant's position */
  update = () => {
    this.handle.style.left = this.x + "px";
    this.handle.style.top = this.y + "px";
    this.parent.appendChild(this.handle);
  };

  /** sets the ant's new position */
  newPos = () => {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    this.rotate(this.angle());
  };
}
