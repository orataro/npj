const images = [
  "./S__33349645.jpg",
  "./S__33349644.jpg",
  "./S__33349648.jpg",
  "./S__33349650.jpg"
];

let index = 0;
const slide = document.getElementById("slide");

function showSlide() {
  slide.style.opacity = 0;
  setTimeout(() => {
    slide.src = images[index];
    slide.style.opacity = 1;
  }, 300);
}

function nextSlide() {
  index = (index + 1) % images.length;
  showSlide();
}

function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  showSlide();
}

/* 自動スライド */
setInterval(nextSlide, 3000);