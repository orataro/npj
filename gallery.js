const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const images = document.querySelectorAll(".gallery-item img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".modal-prev");
const nextBtn = document.querySelector(".modal-next");
const counter = document.getElementById("counter");

let currentIndex = 0;
let autoSlide;

// 表示更新（フェード＋カウンター）
function updateImage() {
  modalImg.classList.remove("show");

  setTimeout(() => {
    modalImg.src = images[currentIndex].src;
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
    modalImg.classList.add("show");
  }, 150);
}

// 開く
function openModal(index) {
  modal.style.display = "flex";
  currentIndex = index;
  updateImage();
  startAutoSlide();
}

// 閉じる
function closeModal() {
  modal.style.display = "none";
  stopAutoSlide();
}

// 次へ
function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
}

// 前へ
function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
}

// 自動スライド
function startAutoSlide() {
  autoSlide = setInterval(showNext, 4000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

// 画像クリック
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    openModal(index);
  });
});

// ボタン
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);
closeBtn.addEventListener("click", closeModal);

// 背景クリックで閉じる
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// キーボード
document.addEventListener("keydown", (e) => {
  if (modal.style.display === "flex") {
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") closeModal();
  }
});

// スワイプ
let startX = 0;

modal.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

modal.addEventListener("touchend", (e) => {
  let diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? showNext() : showPrev();
  }
});

prevBtn.addEventListener("click", showPrev);

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
}