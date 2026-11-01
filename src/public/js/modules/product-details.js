import { products } from "./products.js";
import { getImageUrl } from "../cofig/supabase.js";
const productDetailImage = document.querySelector(".product-detail-img");
const productDetailTitles = document.querySelectorAll(".product-detail-title");
const productDetailTags = document.querySelector(".product-detail-tags");
const productDetailColor = document.querySelector(".product-detail-color");
const productDetailStock = document.querySelector(".product-detail-stock");
const productDetailCategory = document.querySelector(".product-detail-category");
const productDetailPrice = document.querySelector(".product-detail-price");
const addBasketBtn = document.querySelector(".add-basket-btn");

export const showProductsDetail = () => {
  const searchParams = new URLSearchParams(location.search);
  const productId = Number(searchParams.get("id"));

  const mainProduct = products.find((product) => product.id === productId);

  if (!mainProduct) return;

  productDetailImage?.setAttribute(
    "src",
    `${getImageUrl(mainProduct.image)}`,
  );

  productDetailTitles.forEach((title) => {
    title.textContent = mainProduct.title;
  });

if (productDetailTags) {
    productDetailTags.textContent = Array.isArray(mainProduct.tags)
    ? mainProduct.tags.join("، ")
    : "";
}

  if (productDetailColor) {
    productDetailColor.textContent = mainProduct.color;
  }

  if (productDetailCategory) {
    productDetailCategory.textContent = mainProduct.category;
  }

  if (productDetailPrice) {
    productDetailPrice.textContent =
      `${mainProduct.price.toLocaleString("fa-IR")} تومان`;
  }

  if (productDetailStock) {
    productDetailStock.textContent = mainProduct.stock ? "موجود" : "ناموجود";
  }

  if (addBasketBtn) {
    addBasketBtn.dataset.id = mainProduct.id;
  }
};
