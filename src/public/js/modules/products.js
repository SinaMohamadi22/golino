
import { supabase } from "../cofig/supabase.js";

// عناصر مربوط به محصولات
const productContainers = document.querySelectorAll(".product-container");
const famousProductContainer = document.querySelector(
  ".famous-prodcut-container"
);

// آرایه محصولات؛ سایر ماژول‌ها هم می‌توانند آن را import کنند
export let products = [];

// نمایش کارت محصولات
const showProducts = () => {
  productContainers.forEach((container) => {
    container.innerHTML = "";

    const isSwiper = container.classList.contains("swiper-wrapper");

    products.forEach((product) => {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <article
            class="${isSwiper ? "swiper-slide " : ""}product-card relative bg-white dark:bg-zinc-700 rounded-3xl group"
            data-id="${product.id}"
          >
            ${
              product.discount > 0
                ? `
                  <span class="absolute top-3 right-3 bg-red text-white px-2 py-1 rounded-lg text-xs">
                    ${product.discount}% تخفیف
                  </span>
                `
                : ""
            }

            <div class="p-4 flex justify-center items-center">
              <img
                class="w-38"
                src="../public/image/${product.image}"
                loading="lazy"
                alt="${product.title}"
              >
            </div>

            <div class="p-3 text-red flex flex-col justify-between items-center font-iranyekan rounded-4xl">
              <h3 class="font-iranyekan font-medium text-sm text-4B4B4B dark:text-white">
                ${product.title}
              </h3>

              <div class="flex items-center gap-1 mt-2">
                <svg class="size-4 text-yellow-400">
                  <use href="#star"></use>
                </svg>
                <span class="font-iranyekan text-sm font-normal">
                  ${product.rating}
                </span>
              </div>

              <h4 class="font-iranyekan text-sm font-normal pt-4">
                ${product.price.toLocaleString("fa-IR")} تومان
              </h4>
            </div>

            <div class="pr-4 mt-2 rounded-3xl mx-2 my-3 flex justify-between items-center bg-linear-to-l from-pink-300 to-white">
              <p class="font-iranyekan font-medium text-sm">
                خرید محصول
              </p>

              <div class="bg-FEE3E8 group-hover:bg-red p-2.5 rounded-100">
                <svg class="size-6 text-primary group-hover:text-white">
                  <use href="#shopping-basket"></use>
                </svg>
              </div>
            </div>
          </article>
        `
      );
    });
  });
};

// نمایش محصولات محبوب
const showFamousProducts = () => {
  if (!famousProductContainer) return;

  famousProductContainer.innerHTML = "";

  products.forEach((product) => {
    famousProductContainer.insertAdjacentHTML(
      "beforeend",
      `
        <article
          class="group product-card rounded-2xl bg-white dark:bg-zinc-700 text-center relative h-65.5"
          data-id="${product.id}"
        >
          <div class="flex pt-1 justify-center items-center">
            <img
              class="w-38"
              loading="lazy"
              src="../public/image/${product.image}"
              alt="${product.title}"
            >
          </div>

          <h3 class="font-iranyekan text-565D47 dark:text-white font-medium text-sm py-3.75">
            ${product.title}
          </h3>

          <div class="bg-primary py-3.75 px-7 flex flex-col text-white items-center absolute z-5 left-1/2 -translate-x-1/2 rounded-2xl group-hover:bg-red">
            <h4>${product.price.toLocaleString("fa-IR")}</h4>

            <div class="flex group/card gap-x-1 bg-white dark:bg-zinc-700 pt-2.5 pb-1.5 px-5 mt-3.75 rounded-2xl text-red font-iranyekan font-normal">
              <div class="flex gap-x-1 items-center">
                خرید

                <svg class="size-4.5 group-hover/card:hidden">
                  <use href="#arrow"></use>
                </svg>

                <svg class="size-4.5 hidden group-hover/card:inline">
                  <use href="#fill-arrow"></use>
                </svg>
              </div>
            </div>
          </div>
        </article>
      `
    );
  });
};

// رفتن به صفحه جزئیات محصول با کلیک روی کارت
const handleProductClick = (event) => {
  const card = event.target.closest(".product-card");

  if (!card) return;

  const id = card.dataset.id;

  location.href = `./product.html?id=${id}`;
};

// ثبت رویدادها فقط یک بار
productContainers.forEach((container) => {
  container.addEventListener("click", handleProductClick);
});

famousProductContainer?.addEventListener(
  "click",
  handleProductClick
);

// دریافت محصولات از Supabase
export const initProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("Error fetching products:", error);
    return null;
  }

  products = data ?? [];

  // حفظ سازگاری با کدهای قدیمی پروژه
  window.products = products;

  showProducts();
  showFamousProducts();

  document.dispatchEvent(
    new CustomEvent("productsLoaded", {
      detail: products,
    })
  );

  return products;
};
