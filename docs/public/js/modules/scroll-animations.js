
const hiddenElements = document.querySelectorAll(".hidden-section");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-section");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  hiddenElements.forEach((element) => observer.observe(element));
} else {
  hiddenElements.forEach((element) => {
    element.classList.add("show-section");
  });
}
