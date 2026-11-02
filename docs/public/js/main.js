import "./modules/theme.js";
import "./modules/navigation.js";
import "./modules/auth.js";
import "./modules/flower-animition.js"
import "./modules/accordion.js";
import "./modules/scroll-animations.js";
import "./modules/blog.js";
import "./modules/back-to-top.js";

import { initProducts } from "./modules/products.js";
import { initCart } from "./modules/cart.js";
import { showProductsDetail } from "./modules/product-details.js";
import { initSwiper, commentSwiper } from "./modules/sliders.js";

window.addEventListener("load", () => {
  init();
  initCart();
});

const init = async () => {
  const loadedProducts = await initProducts();

  if (loadedProducts === null) return;

  requestAnimationFrame(() => {
    initSwiper();
    commentSwiper();
  });

  if (location.pathname.includes("product.html")) {
    showProductsDetail();
  }
};

