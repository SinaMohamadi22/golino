import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";
import { getCookie , setCookie , logout } from "../js/cookie.js"
export const supabase = createClient(
  "https://nldmtwggyobypqntjawy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZG10d2dneW9ieXBxbnRqYXd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MjM2NDcsImV4cCI6MjA5NzA5OTY0N30.zZnoXjSf2IitvmSkN8BrLA9pqQMogZBR3tMShikN_vQ"
);
const userLoginBtns = document.querySelectorAll(".user-login-btn")
const firstTimeLoginBtns = document.querySelectorAll(".first-time-login-btn")
const menuElemBtn = document.querySelector(".menu")
const navMenuMobile = document.querySelector(".nav-mobile")
const closeMenuBtn = document.querySelector(".close-menu-btn")
const switchThemBtn = document.querySelector(".switch-them-btn")
const toggleThemeBtns = document.querySelectorAll(".toggle-theme")
const darkThemeIcon = document.querySelectorAll(".dark-theme")
const lightThemeIcon = document.querySelectorAll(".light-theme")
const backgroundHeader = document.querySelector(".bg-header")
const productContainers = document.querySelectorAll(".product-container")
const famousProdcutContainer = document.querySelector(".famous-prodcut-container")
const productDetailImage = document.querySelector(".product-detail-img")
const productDetailTitles = document.querySelectorAll(".product-detail-title")
const productDetailTags = document.querySelector(".product-detail-tags")
const productDetailColor = document.querySelector(".product-detail-color")
const productDetailStock = document.querySelector(".product-detail-stock")
const productDetailCategory = document.querySelector(".product-detail-category")
const productDetailPrice =  document.querySelector(".product-detail-price")
const basketModal = document.querySelector(".basket-modal")
const basketModalMobile = document.querySelector(".basket-modal-mobile")
const closeBasket = document.querySelector(".close-basket")
const closeBasketMobile = document.querySelector(".close-basket-mobile")
const basketBtn = document.querySelector(".basket-btn")
const basketMobileBtn = document.querySelector(".basket-mobile-btn")
const overlay = document.querySelector("#overlay")
const addBasketBtn = document.querySelector(".add-basket-btn")
const basketContainers = document.querySelectorAll(".basket-container")
const totalPriceElem = document.querySelector(".total-price")
const countInput = document.querySelector(".count-input")
const footerBaskets = document.querySelectorAll(".footer-basket")
const tabMenu = document.querySelectorAll(".tabs-menu")
const tabButtons = document.querySelectorAll(".tab-btn")
const tabContents = document.querySelectorAll(".tab-content")
const tabsWrapper = document.querySelector(".tabs-wrapper")
const MultiTabBtn = document.querySelector(".multi-tab-btn")
const MultiTabText = document.querySelector(".multi-tab-text")
const detailElems = document.querySelectorAll("details")

const user = getCookie("user");
if(user) {
  const userData = JSON.parse(user);

  if(userData.isLogin){
    userLoginBtns?.forEach((userLoginBtn) => {
        userLoginBtn.classList.remove("hidden")
    })
    firstTimeLoginBtns?.forEach((firstTimeLoginBtn) => {
        firstTimeLoginBtn.classList.add("hidden")
    })
  } else {
    userLoginBtns?.forEach((userLoginBtn) => {
        userLoginBtn.classList.add("hidden")
    })
    firstTimeLoginBtns?.forEach((firstTimeLoginBtn) => {
        firstTimeLoginBtn.classList.remove("hidden")
    })
  }
}
let products = [];
let basket = JSON.parse(localStorage.getItem("basket")) || [];

basket = basket.map(item => ({
  ...item,
  price: Number(item.price) || 0,
  count: Number(item.count) || 1
}));

const showMultiTab = () => {
  if (!tabsWrapper) return;

  tabsWrapper.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab-btn");
    if (!btn) return;

    const tab = btn.dataset.tab;

    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    tabContents.forEach(content => {
      content.classList.toggle("show", content.dataset.tab === tab);
    });
  });
}
const hideOrShowMultiTab = () => {
    tabsWrapper.classList.toggle("hidden")
}

const setThemeIcons = () => {
    if (localStorage.getItem("theme") === "dark") {

        darkThemeIcon.forEach(icon => {
            icon.classList.add("hidden")
        })

        lightThemeIcon.forEach(icon => {
            icon.classList.remove("hidden")
        })
        if (backgroundHeader) {
            backgroundHeader.src = "./public/image/bg-header-dark-300x200.webp"
            backgroundHeader.srcset =
            `../public/image/bg-header-dark-300x200.webp 300w,
            ../public/image/bg-header-dark-480x320.webp 480w,
            ../public/image/bg-header-dark-640x427.webp 640w,
            ../public/image/bg-header-dark-768x512.webp 768w,
            ../public/image/bg-header-dark-800x533.webp 800w,
            ../public/image/bg-header-dark-1280x853.webp 1280w,
            ../public/image/bg-header-dark-1440x960.webp 1440w,
            ../public/image/bg-header-dark-1536x1024.webp 1536w,
            ../public/image/bg-header-dark-1920x1280.webp 1920w`

        }
        } else {

        lightThemeIcon.forEach(icon => {
            icon.classList.add("hidden")
        })

        darkThemeIcon.forEach(icon => {
            icon.classList.remove("hidden")
        })
        if(backgroundHeader) {
            backgroundHeader.src = "./public/image/bg-header-300x200.webp"
            backgroundHeader.srcset=
            `../public/image/bg-header-300x200.webp 300w,
            ../public/image/bg-header-480x320.webp 480w,
            ../public/image/bg-header-640x427.webp 640w,
            ../public/image/bg-header-768x512.webp 768w,
            ../public/image/bg-header-800x533.webp 800w,
            ../public/image/bg-header-1280x853.webp 1280w,
            ../public/image/bg-header-1440x960.webp 1440w,
            ../public/image/bg-header-1536x1024.webp 1536w,
            ../public/image/bg-header-1920x1280.webp 1920w
        `
        }
    }
}

if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark")
}

setThemeIcons()

    toggleThemeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (localStorage.getItem("theme") === "dark") {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        } else {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        }

        setThemeIcons()
    })
})

const openModal = () => {
    navMenuMobile.classList.remove("hidden")
    overlay.classList.remove("hidden");
}
const closeModal = () => {
    navMenuMobile.classList.add("hidden")
    overlay.classList.add("hidden");
}
const showProducts = () => {
    if (productContainers.length > 0) {
            productContainers.forEach((productContainer) => {
            productContainer.innerHTML = ""
            products.forEach((product) => {
                productContainer.insertAdjacentHTML("beforeend",
                `
                <article class="swiper-slide product-card bg-white dark:bg-zinc-700 rounded-3xl group" data-id="${product.id}">
                    ${product.discount > 0 ? `
                    <span class="absolute top-3 right-3 bg-red text-white px-2 py-1 rounded-lg text-xs">
                    ${product.discount}% تخفیف
                    </span>
                    ` : ""}
                    <div class="p-4 flex justify-center items-center">
                        <img class="w-38" src="../public/image/${product.image}" loading="lazy" alt="${product.title}">
                    </div>
                    <div class="p-3 text-red flex flex-col justify-between items-center font-iranyekan rounded-4xl">
                        <h3 class="font-iranyekan font-medium text-sm text-4B4B4B dark:text-white">${product.title}</h3>
                        <div class="flex items-center gap-1 mt-2">
                        <svg class="size-4 text-yellow-400">
                            <use href="#star"></use>
                        </svg>
                        <span class="font-iranyekan text-sm font-normal">${product.rating}</span>
                        </div>
                        <h4 class="font-iranyekan text-sm font-normal pt-4">${product.price.toLocaleString("fa-IR")} تومان</h4>
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
            )
            }) 
           productContainer.addEventListener("click", (event) => {
            const card = event.target.closest(".product-card")
            if (!card) return
            const id = card.dataset.id
            location.href = `./product.html?id=${id}`
        })
        })
    }
}
const showFamousProducts = () => {
    if (famousProdcutContainer) {
        famousProdcutContainer.innerHTML = ""
        products.forEach((product) => {
            famousProdcutContainer.insertAdjacentHTML("beforeend",
                `
                <article class="group product-card rounded-2xl bg-white dark:bg-zinc-700 text-center relative h-65.5" data-id="${product.id}">
                    <div class="flex pt-1 justify-center items-center">
                        <img class="w-38" loading="lazy"  src="../public/image/${product.image}" alt="${product.title}">
                    </div>
                        <h3 class="font-iranyekan text-565D47 dark:text-white font-medium text-sm py-3.75">${product.title}</h3>
                            <div class="bg-primary py-3.75 px-7 flex flex-col text-white items-center absolute z-5 left-1/2 -translate-x-1/2 rounded-2xl group-hover:bg-red">
                                <h4>${product.price.toLocaleString("fa-IR")}</h4>
                                    <div class="flex group/card gap-x-1 bg-white dark:bg-zinc-700 pt-2.5 pb-1.5 px-5 mt-3.75 rounded-2xl text-red font-iranyekan font-normal">
                                        <div class="flex gap-x-1 items-center" href="">خرید
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
            )
        })
            famousProdcutContainer.addEventListener("click", (event) => {
                const card = event.target.closest(".product-card")
                if (!card) return
                const id = card.dataset.id
                location.href = `./product.html?id=${id}`
            })
            
}}
const showProductsDetail = () => {
    const searchParam = new URLSearchParams(location.search)
    const prodcutId = searchParam.get("id")
    const mainProductDetail = products.find((product) => product.id === +prodcutId)
         if (!mainProductDetail) return 
        productDetailImage?.setAttribute("src", `../public/image/${mainProductDetail.image}`)
        productDetailTitles.forEach((productDetailTitle) => {
            productDetailTitle.innerHTML = mainProductDetail.title
        })
        productDetailTags.innerHTML = mainProductDetail.tags.join("، ")
        productDetailColor.innerHTML = mainProductDetail.color
        productDetailCategory.innerHTML =  mainProductDetail.category
        productDetailPrice.innerHTML = mainProductDetail.price.toLocaleString("fa-IR") + " تومان"
        productDetailStock.innerHTML =
        mainProductDetail.stock ? "موجود" : "ناموجود" 
        addBasketBtn.dataset.id = mainProductDetail.id
}
const showBasket = () => {
    basketModal.classList.remove("hidden")
    basketModal.classList.add("flex")
    overlay.classList.remove("hidden")
}
const closeBasketModal = () => {
    basketModal.classList.add("hidden")
    basketModal.classList.remove("flex")
    overlay.classList.add("hidden")

}
const showBasketMobile = () => {
    basketModalMobile.classList.remove("-translate-x-full")
    overlay.classList.remove("hidden")
}
const closeBasketModalMobile = () => {
    basketModalMobile.classList.add("-translate-x-full")
    overlay.classList.add("hidden")
}
const addProductToBasket = () => {
    if (!products.length) return

    const productId = +addBasketBtn?.dataset?.id;
    if (!productId) return

    const mainProduct = products.find(
        item => item.id === productId
    )

    if (!mainProduct) return

    const basketProduct = basket.find(
        item => item.id === productId
    )
    const count = Number(countInput?.value || 1);
    if (basketProduct) {
        basketProduct.count += count
    } else {
        basket.push({
            ...mainProduct,
            count
        })
    }
    if (countInput) {
    countInput.value = 1
}
    updateBasketUI()
}
const removeProductFromBasket = (id) => {
    basket = basket.filter(item => item.id !== id)
    updateBasketUI()
}
const showBasketProducts = () => {
    basketContainers.forEach((basketContainer) => {
        basketContainer.innerHTML = ""
        if (basket.length) {
            footerBaskets.forEach(b => b.classList.remove("hidden"));
        } else {
            footerBaskets.forEach(b => b.classList.add("hidden"));
        }
        if (basket.length) {
            basket.forEach((item) => {
             basketContainer.insertAdjacentHTML("beforeend",
            `
            <div class="flex items-center gap-x-6 pt-7 border-b border-dashed last:border-b-0 border-737373 pb-5">
                <div class="items-center">
                    <img class="size-14" src="../public/image/${item.image}" alt="${item.title}">
                </div>
                <div class="flex flex-col gap-5">
                    <span class="font-medium text-sm leading-4.75">${item.title}</span>
                    <p class="text-737373 text-xs flex-nowrap font-normal leading-4.5"><span>${ item.count} ×</span>${item.price.toLocaleString("fa-IR")} تومان</p>
                </div>
                <button data-id="${item.id}" class="remove-product-btn size-4 p-px border border-red rounded-100 flex text-center mt-12 mr-20">
                    <svg class="size-3.25 text-red">
                        <use href="#x-btn"></use>
                    </svg>
                </button>
            </div>
            `
            
        )
        })
    } else {
        footerBaskets.forEach((footerBasket) => footerBasket.classList.add("hidden"))
        basketContainer.insertAdjacentHTML("beforeend",
         `
            <div class="py-20 px-4 text-center text-red-400 font-iranyekan font-semibold">محصولی در سبد خرید شما وجود ندارد :(</div>
         `
            )    
    }
    })
}
const calculateTotalPrice = () => {
  if (!Array.isArray(basket)) return;

  const totalPrice = basket.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const count = Number(item.count) || 0;

    return total + price * count;
  }, 0);

  if (totalPriceElem) {
    totalPriceElem.innerHTML = totalPrice.toLocaleString("fa-IR");
  }
};
const saveBasketToLocalStorage = () => {
    localStorage.setItem("basket",JSON.stringify(basket))
}
const updateBasketUI = () => {
  saveBasketToLocalStorage();
  showBasketProducts();
  calculateTotalPrice();
};
MultiTabBtn?.addEventListener("click",hideOrShowMultiTab)
MultiTabText?.addEventListener("click",hideOrShowMultiTab)
if (tabsWrapper) {
  document.addEventListener("click", (event) => {
    const isOutside =
      !tabsWrapper.contains(event.target) &&
      !MultiTabBtn?.contains(event.target) &&
      !MultiTabText?.contains(event.target);

    if (isOutside) {
      tabsWrapper.classList.add("hidden");
    }
  });
}
tabsWrapper?.addEventListener("click", showMultiTab);
menuElemBtn?.addEventListener("click",openModal)
closeMenuBtn?.addEventListener("click",closeModal)
basketBtn?.addEventListener("click",showBasket)
basketMobileBtn?.addEventListener("click",showBasketMobile)
closeBasket?.addEventListener("click",closeBasketModal)
closeBasketMobile?.addEventListener("click",closeBasketModalMobile)
window.addEventListener("load", () => {
    init()
    updateBasketUI()
})
addBasketBtn?.addEventListener("click", () => {
    addProductToBasket()
})
document.addEventListener("click", (event) => {
    const removeBtn = event.target.closest(".remove-product-btn")

    if (!removeBtn) return

    removeProductFromBasket(+removeBtn.dataset.id)
})

let swiperInstance = null;

const initSwiper = () => {
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
  }

  swiperInstance = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    grabCursor: true,

    breakpoints: {
      0: { slidesPerView: 1.1, spaceBetween: 20 },
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 4, spaceBetween: 20 },
    },
  });
};

const commentSwiper = new Swiper(".commentSwiper", {
    loop: true,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    grabCursor: true,

    breakpoints: {
        0: {
            slidesPerView: 1.1,
            spaceBetween: 20,
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
    },
});

const init = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*");
    

  if (error) {
    console.log(error);
    return;
  }

  products = data;

  showProducts()
  showFamousProducts();
  requestAnimationFrame(() => {
    initSwiper();
  });
  if (location.pathname.includes("product.html")) {
    showProductsDetail();
  }
}
detailElems.forEach((detail) => {
  const content = detail.querySelector(".grid");

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
const hiddenObservser = () => {
    const hiddenElements = document.querySelectorAll(".hidden-section")
    const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-section")
             observer.unobserve(entry.target);
        }
    });
}, {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
    });
hiddenElements.forEach((hiddenElement) => observer.observe(hiddenElement))
}
hiddenObservser() 
