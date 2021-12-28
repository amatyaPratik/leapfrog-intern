class Car {
  constructor() {
    this.freedomX = 500; //px
    this.parent = document.getElementsByClassName("game")[0];
    this.width = 54; //px
    this.height = 130; //px
    this.x = this.freedomX / 2 - this.width / 2;
    this.hasAmmo = false;
    this.dx = 5;
    this.accX = 0;
    this.handle = document.createElement("div");
    this.handle.setAttribute("class", "car");
    this.handle.style.top = "50%";
    this.handle.style.width = this.width + "px";
    this.handle.style.height = this.height + "px";
    this.handle.style.left = this.x + "px";

    this.ammo = document.createElement("img");
    this.ammo.setAttribute("id", "fire");
    this.ammo.setAttribute("src", "../res/sprites/fire.gif");
    this.ammo.style.display = "none";
    this.handle.appendChild(this.ammo);

    document.getElementsByClassName("game")[0].appendChild(this.handle);
  }

  move(lr) {
    if (lr === "left") {
      this.x = this.x - this.dx;
      this.handle.style.left = this.dx + "px";
    } else if (lr === "right") {
      this.x = this.x + this.dx;
      this.handle.style.left = this.dx + "px";
    }

    this.handle.style.left = this.x + "px";
  }

  fire() {
    if (this.hasAmmo) {
      console.log("fire now");
      this.ammo.style.display = "block";
      let hidegif = setTimeout(() => {
        this.ammo.style.display = "none";
        this.hasAmmo = false;
        document.getElementsByClassName("ammo")[0].style.display = "none";
      }, 1000);
    }
  }
}
