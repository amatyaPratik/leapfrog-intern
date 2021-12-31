/** the container's class, defines the boundaries for ants */
class Box {
  constructor(boxWidth, boxHeight, boxMargin) {
    this.maxX = boxWidth;
    this.maxY = boxHeight;
    this.dead = [];

    this.initBoxDom(boxMargin);
  }

  /** inits the Box's DOM */
  initBoxDom = (boxMargin) => {
    this.handle = document.createElement("div");
    this.handle.setAttribute("id", "box");
    this.handle.style.width = this.maxX + "px";
    this.handle.style.height = this.maxY + "px";
    this.handle.style.margin = boxMargin;
    document.body.insertBefore(this.handle, document.body.childNodes[0]);
  };

  /** clears the content insode the box */
  clear = () => {
    document.getElementById("box").innerHTML = "";
  };
}
