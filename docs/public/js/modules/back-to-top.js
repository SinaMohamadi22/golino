
const backToTop = document.querySelector("#backToTop");

if (backToTop) {
  const handleScroll = () => {
    if (window.scrollY > 300) {
      backToTop.classList.remove(
        "opacity-0",
        "invisible",
        "translate-y-3"
      );

      backToTop.classList.add(
        "opacity-100",
        "visible",
        "translate-y-0"
      );
    } else {
      backToTop.classList.add(
        "opacity-0",
        "invisible",
        "translate-y-3"
      );

      backToTop.classList.remove(
        "opacity-100",
        "visible",
        "translate-y-0"
      );
    }
  };

  window.addEventListener("scroll", handleScroll);

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  handleScroll();
}
