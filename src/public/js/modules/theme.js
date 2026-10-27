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

  backgroundHeader.src = `./public/image/${prefix}-300x200.webp`;

  backgroundHeader.srcset = `
    ../public/image/${prefix}-300x200.webp 300w,
    ../public/image/${prefix}-480x320.webp 480w,
    ../public/image/${prefix}-640x427.webp 640w,
    ../public/image/${prefix}-768x512.webp 768w,
    ../public/image/${prefix}-800x533.webp 800w,
    ../public/image/${prefix}-1280x853.webp 1280w,
    ../public/image/${prefix}-1440x960.webp 1440w,
    ../public/image/${prefix}-1536x1024.webp 1536w,
    ../public/image/${prefix}-1920x1280.webp 1920w
  `;
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
