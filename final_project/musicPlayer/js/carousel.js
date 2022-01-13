let currentImage = 0;
const images = [
  "../user/user1.jpg",
  "../user/user2.jpg",
  "../user/user3.jpg",
  "../user/user4.jpg",
  "../user/user5.jpg",
  "../user/user6.jpeg",
  "../user/user1.jpg",
];

let dx = 0;
const step = 1.5;
const carouselWidth = 90;
const carouselHeight = 90;
let animationFrame;

function slideLeft() {
  if (!carouselMode) {
    return;
  }
  if (currentImage === images.length - 1) {
    currentImage = 0;
    dx = 0;
    return;
  }
  if (-(currentImage + 1) * carouselWidth >= dx) {
    currentImage = (currentImage + 1) % images.length;
    document.getElementsByClassName("images")[0].style.left = dx + "vw";
    dx = -currentImage * carouselWidth;
    setTimeout(() => {}, 1000);
    return;
  }

  dx = dx - step;
  document.getElementsByClassName("images")[0].style.left = dx + "vw";
  animationFrame = window.requestAnimationFrame(slideLeft);
}

function initCarousel() {
  const carousel = document.createElement("div");
  carousel.classList.add("carousel");

  carousel.style.position = "fixed";
  carousel.style.width = `${carouselWidth}vw`;
  carousel.style.height = `${carouselHeight}vh`;
  carousel.style.overflow = "hidden";
  carousel.style.zIndex = "-1";

  //style the images container
  const imagesContainer = document.createElement("div");
  imagesContainer.classList.add("images");
  imagesContainer.style.backgroundColor = "transparent";
  imagesContainer.style.width = images.length * carouselWidth + "vw";
  imagesContainer.style.position = "relative";
  imagesContainer.style.height = carouselHeight + "vh";

  //creating img tags
  for (let i = 0; i < images.length; i++) {
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("img-wrapper");
    imgWrapper.style.position = "relative";
    imgWrapper.style.height = carouselHeight + "vh";
    imgWrapper.style.width = carouselWidth + "vw";
    imgWrapper.style.float = "left";

    const img = document.createElement("img");
    img.src = images[i];
    img.setAttribute("slideIndex", i);
    img.classList.add("carousel-image");
    img.style.width = "auto";
    img.style.height = "100%";
    img.style.marginLeft = "50%";
    img.style.transform = `translateX(-50%)`;

    imgWrapper.appendChild(img);
    imagesContainer.appendChild(imgWrapper);
  }

  carousel.appendChild(imagesContainer);
  document.body.appendChild(carousel);
}

function startCarousel() {
  if (!carouselMode) {
    return;
  }
  initCarousel();
  setInterval(slideLeft, 4000);
}

function stopCarousel() {
  const bodyChildren = document.body.childNodes;

  for (let i = 0; i < bodyChildren.length; i++) {
    if (bodyChildren[i].className === "carousel") {
      document.body.removeChild(document.body.childNodes[i]);
      window.cancelAnimationFrame(animationFrame);
    }
  }
}
