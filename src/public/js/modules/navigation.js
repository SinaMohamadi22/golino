
const menuElemBtn = document.querySelector(".menu");
const navMenuMobile = document.querySelector(".nav-mobile");
const closeMenuBtn = document.querySelector(".close-menu-btn");
const overlay = document.querySelector("#overlay");

const tabsWrapper = document.querySelector(".tabs-wrapper");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const multiTabBtn = document.querySelector(".multi-tab-btn");
const multiTabText = document.querySelector(".multi-tab-text");

// باز کردن منوی موبایل
const openMenu = () => {
  navMenuMobile?.classList.remove("hidden");
  overlay?.classList.remove("hidden");
};

// بستن منوی موبایل
const closeMenu = () => {
  navMenuMobile?.classList.add("hidden");
  overlay?.classList.add("hidden");
};

menuElemBtn?.addEventListener("click", openMenu);
closeMenuBtn?.addEventListener("click", closeMenu);

// نمایش یا مخفی کردن منوی تب‌ها
const toggleTabsMenu = () => {
  tabsWrapper?.classList.toggle("hidden");
};

multiTabBtn?.addEventListener("click", toggleTabsMenu);
multiTabText?.addEventListener("click", toggleTabsMenu);

// انتخاب تب
tabsWrapper?.addEventListener("click", (event) => {
  const btn = event.target.closest(".tab-btn");

  if (!btn || !tabsWrapper.contains(btn)) return;

  const selectedTab = btn.dataset.tab;

  tabButtons.forEach((button) => {
    button.classList.toggle("active", button === btn);
  });

  tabContents.forEach((content) => {
    content.classList.toggle(
      "show",
      content.dataset.tab === selectedTab
    );
  });
});

// بستن منوی تب‌ها با کلیک بیرون از آن
document.addEventListener("click", (event) => {
  if (!tabsWrapper) return;

  const clickedOutside =
    !tabsWrapper.contains(event.target) &&
    !multiTabBtn?.contains(event.target) &&
    !multiTabText?.contains(event.target);

  if (clickedOutside) {
    tabsWrapper.classList.add("hidden");
  }
});
