const lanes = ["lane-left", "lane-center", "lane-right"];
const skins = ["./res/sprites/car-red.png", "./res/sprites/car-green.png"];

class Obstacle {
  constructor(lane, y) {
    this.foe = document.getElementsByClassName("car")[0];
    this.parent = document.getElementsByClassName("game")[0];
    this.freedomY = 600; //px
    this.lane = lane;
    this.width = 54; //px
    this.height = 105; //px
    this.y = y;
    this.dy = 2;
    this.accY = 0;
    this.handle = document.createElement("div");
    this.handle.setAttribute("class", "obstacle");
    this.handle.style.top = this.y + "px";
    this.handle.style.width = this.width + "px";
    this.handle.style.height = this.height + "px";

    document
      .getElementsByClassName(lanes[this.lane])[0]
      .appendChild(this.handle);
  }

  chooseRandomLane() {
    return lanes[Math.floor(Math.random() * 3)];
  }

  moveDown() {
    this.y = this.y + this.dy;
    this.handle.style.top = this.y + "px";
    if (checkOutOfBoundary(this.handle, this.parent)) {
      this.y = -100;

      this.handle.style.top = this.y + "px";
      if (Math.random() > 0.5) {
        this.handle.style.backgroundImage = `url("${skins[0]}")`;
      } else {
        this.handle.style.backgroundImage = `url("${skins[1]}")`;
      }
    }
  }
}
