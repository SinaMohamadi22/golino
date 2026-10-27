
const animateFlowerRight = document.querySelector(".animate-flower-right");
const animateFlowerLeft = document.querySelector(".animate-flower-left");

const showAnimateFlowers = () => {
  if (!animateFlowerLeft || !animateFlowerRight) return;

  const rotation = Math.min(window.scrollY * 0.15, 60);

  animateFlowerLeft.style.transform = `rotate(${rotation}deg)`;
  animateFlowerRight.style.transform = `rotate(${-rotation}deg)`;
};

window.addEventListener("scroll", showAnimateFlowers);

export { showAnimateFlowers };
