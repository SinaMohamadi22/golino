const toggleThemeBtns = document.querySelectorAll(".toggle-theme");
const darkThemeIcon = document.querySelectorAll(".dark-theme");
const lightThemeIcon = document.querySelectorAll(".light-theme");
const backgroundHeader = document.querySelector(".bg-header");

const setThemeIcons = () => {
  const isDark = localStorage.getItem("theme") === "dark";

  darkThemeIcon.forEach((icon) => {
    icon.classList.toggle("hidden", isDark);
  });

  lightThemeIcon.forEach((icon) => {
    icon.classList.toggle("hidden", !isDark);
  });

  if (!backgroundHeader) return;

  const prefix = isDark ? "bg-header-dark" : "bg-header";

  const imageBasePath = window.location.pathname.includes("/src/html/")
  ? "../public/image/"
  : "./public/image/"

  backgroundHeader.src = `${imageBasePath}${prefix}-300x200.webp`

  backgroundHeader.srcset = `
    ${imageBasePath}${prefix}-300x200.webp 300w,
    ${imageBasePath}${prefix}-480x320.webp 480w,
    ${imageBasePath}${prefix}-640x427.webp 640w,
    ${imageBasePath}${prefix}-768x512.webp 768w,
    ${imageBasePath}${prefix}-800x533.webp 800w,
    ${imageBasePath}${prefix}-1280x853.webp 1280w,
    ${imageBasePath}${prefix}-1440x960.webp 1440w,
    ${imageBasePath}${prefix}-1536x1024.webp 1536w,
    ${imageBasePath}${prefix}-1920x1280.webp 1920w
  `
};

const applyTheme = (theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
  setThemeIcons();
};

// اعمال تم ذخیره‌شده
applyTheme(localStorage.getItem("theme") || "light");

// تغییر تم با کلیک
toggleThemeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme");
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });
});
