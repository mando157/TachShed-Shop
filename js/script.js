//* Landing Background Images Slider
const landingSection = document.querySelector(".landing");
const images = [
  "./images/landing1.jpg",
  "./images/landing2.jpg",
  "./images/landing3.jpg",
];

let currentImageIndex = 0;

//* Function to change background image
function changeBackgroundImage() {
  landingSection.style.backgroundImage = `url('${images[currentImageIndex]}')`;
  currentImageIndex = (currentImageIndex + 1) % images.length;
}

// Set initial image
changeBackgroundImage();

// Change image every 5 seconds
setInterval(changeBackgroundImage, 5000);

//* Product carousel: show up to 3 items and move with arrows
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".product-carousel .products");
  if (!track) return;

  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  let items = Array.from(track.children);

  const visibleCount = 4;
  let currentIndex = visibleCount;

  function getGap() {
    const g = getComputedStyle(track).gap;
    return g ? parseFloat(g) : 20;
  }

  // 🔹 Clone last & first items
  const firstClones = items
    .slice(0, visibleCount)
    .map((el) => el.cloneNode(true));
  const lastClones = items.slice(-visibleCount).map((el) => el.cloneNode(true));

  lastClones.forEach((el) => track.prepend(el));
  firstClones.forEach((el) => track.append(el));

  items = Array.from(track.children);

  function update(animate = true) {
    const gap = getGap();
    const itemWidth = items[0].getBoundingClientRect().width + gap;

    track.style.transition = animate ? "transform 0.4s ease" : "none";
    track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    currentIndex++;
    update(true);

    if (currentIndex === items.length - visibleCount) {
      setTimeout(() => {
        currentIndex = visibleCount;
        update(false);
      }, 400);
    }
  });

  prevBtn.addEventListener("click", () => {
    currentIndex--;
    update(true);

    if (currentIndex === 0) {
      setTimeout(() => {
        currentIndex = items.length - visibleCount * 2;
        update(false);
      }, 400);
    }
  });

  window.addEventListener("resize", () => update(false));
  setTimeout(() => update(false), 100);
});
