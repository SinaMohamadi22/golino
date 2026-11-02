
const detailElems = document.querySelectorAll("details");

detailElems.forEach((detail) => {
  const content = detail.querySelector(".grid");

  if (!content) return;

  detail.addEventListener("toggle", () => {
    if (detail.open) {
      content.style.gridTemplateRows = "1fr";
    } else {
      content.style.gridTemplateRows = "1fr";

      requestAnimationFrame(() => {
        content.style.gridTemplateRows = "0fr";
      });

      setTimeout(() => {
        content.style.gridTemplateRows = "";
      }, 500);
    }
  });
});
