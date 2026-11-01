
import { products } from "./products.js";
import { getImageUrl } from "../cofig/supabase.js";
const toast = document.querySelector(".toast");
const proccess = document.querySelector(".proccess");

const basketModal = document.querySelector(".basket-modal");
const basketModalMobile = document.querySelector(".basket-modal-mobile");
const closeBasket = document.querySelector(".close-basket");
const closeBasketMobile = document.querySelector(".close-basket-mobile");
const basketBtn = document.querySelector(".basket-btn");
const basketMobileBtn = document.querySelector(".basket-mobile-btn");
const addBasketBtn = document.querySelector(".add-basket-btn");
const basketContainers = document.querySelectorAll(".basket-container");
const totalPriceElems = document.querySelectorAll(".total-price");
const countInput = document.querySelector(".count-input");
const footerBaskets = document.querySelectorAll(".footer-basket");
const overlay = document.querySelector("#overlay");

let basket = [];

const loadBasket = () => {
  try {
    const savedBasket = JSON.parse(localStorage.getItem("basket")) || [];

    basket = Array.isArray(savedBasket)
      ? savedBasket.map((item) => ({
          ...item,
          price: Number(item.price) || 0,
          count: Number(item.count) || 1,
        }))
      : [];
  } catch (error) {
    console.error("Error loading basket:", error);
    basket = [];
  }
};

const showBasket = () => {
  basketModal?.classList.remove("hidden");
  basketModal?.classList.add("flex");
  overlay?.classList.remove("hidden");
};

const closeBasketModal = () => {
  basketModal?.classList.add("hidden");
  basketModal?.classList.remove("flex");
  overlay?.classList.add("hidden");
};

const showBasketMobile = () => {
  basketModalMobile?.classList.remove("-translate-x-full");
  overlay?.classList.remove("hidden");
};

const closeBasketModalMobile = () => {
  basketModalMobile?.classList.add("-translate-x-full");
  overlay?.classList.add("hidden");
};

const addProductToBasket = () => {
  if (!products.length) return;

  const productId = Number(addBasketBtn?.dataset.id);
  if (!productId) return;

  const mainProduct = products.find((item) => item.id === productId);
  if (!mainProduct) return;

  const basketProduct = basket.find((item) => item.id === productId);
  const count = Math.max(1, Number(countInput?.value) || 1);

  if (basketProduct) {
    basketProduct.count += count;
  } else {
    basket.push({
      ...mainProduct,
      count,
    });
  }

  if (countInput) {
    countInput.value = 1;
  }

  toast?.classList.replace("hidden", "flex");

  updateBasketUI();
  showProccessToastBar();
};

const removeProductFromBasket = (id) => {
  basket = basket.filter((item) => item.id !== id);
  updateBasketUI();
};

const showBasketProducts = () => {
  basketContainers.forEach((basketContainer) => {
    basketContainer.innerHTML = "";

    footerBaskets.forEach((footerBasket) => {
      footerBasket.classList.toggle("hidden", basket.length === 0);
    });

    if (!basket.length) {
      basketContainer.insertAdjacentHTML(
        "beforeend",
        `
          <div class="py-20 px-4 text-center text-red-400 font-iranyekan font-semibold">
            محصولی در سبد خرید شما وجود ندارد :(
          </div>
        `,
      );

      return;
    }

    basket.forEach((item) => {
      basketContainer.insertAdjacentHTML(
        "beforeend",
        `
          <div class="flex items-center gap-x-6 pt-7 border-b border-dashed last:border-b-0 border-737373 pb-5">
            <div class="items-center">
              <img
                class="size-14"
                src="${getImageUrl(item.image)}"
                alt="${item.title}"
              >
            </div>

            <div class="flex flex-col gap-5">
              <span class="font-medium text-sm leading-4.75">
                ${item.title}
              </span>

              <p class="text-737373 text-xs flex-nowrap font-normal leading-4.5">
                <span>${item.count} ×</span>
                ${item.price.toLocaleString("fa-IR")} تومان
              </p>
            </div>

            <button
              data-id="${item.id}"
              class="remove-product-btn size-4 p-px border border-red rounded-100 flex text-center mt-12 mr-20"
              aria-label="حذف ${item.title} از سبد خرید"
            >
              <svg class="size-3.25 text-red">
                <use href="#x-btn"></use>
              </svg>
            </button>
          </div>
        `,
      );
    });
  });
};

const calculateTotalPrice = () => {
  const totalPrice = basket.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const count = Number(item.count) || 0;

    return total + price * count;
  }, 0);

  totalPriceElems.forEach((element) => {
    element.textContent = totalPrice.toLocaleString("fa-IR");
  });
};

const saveBasketToLocalStorage = () => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

export const updateBasketUI = () => {
  saveBasketToLocalStorage();
  showBasketProducts();
  calculateTotalPrice();
};

const showProccessToastBar = () => {
  if (!toast || !proccess) return;

  let proccessStep = 0;
  proccess.style.width = "0%";

  const proccessInterval = setInterval(() => {
    proccessStep += 5;

    if (proccessStep > 100) {
      toast.classList.add("hidden");
      clearInterval(proccessInterval);
      return;
    }

    proccess.style.width = `${proccessStep}%`;
  }, 100);
};

export const initCart = () => {
  loadBasket();
  updateBasketUI();

  basketBtn?.addEventListener("click", showBasket);
  basketMobileBtn?.addEventListener("click", showBasketMobile);

  closeBasket?.addEventListener("click", closeBasketModal);
  closeBasketMobile?.addEventListener("click", closeBasketModalMobile);

  addBasketBtn?.addEventListener("click", addProductToBasket);

  document.addEventListener("click", (event) => {
    const removeBtn = event.target.closest(".remove-product-btn");

    if (!removeBtn) return;

    removeProductFromBasket(Number(removeBtn.dataset.id));
  });
};
