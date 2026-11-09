const toggleThemeBtns = document.querySelectorAll(".toggle-theme")
const darkThemeIcon = document.querySelectorAll(".dark-theme")
const lightThemeIcon = document.querySelectorAll(".light-theme")

const setThemeIcons = () => {
    const isDark = localStorage.getItem("theme") === "dark"

    darkThemeIcon.forEach((icon) => {
        icon.classList.toggle("hidden", isDark)
    })

    lightThemeIcon.forEach((icon) => {
        icon.classList.toggle("hidden", !isDark)
    })
}

const applyTheme = (theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark")
  localStorage.setItem("theme", theme)
  setThemeIcons()
}

applyTheme(localStorage.getItem("theme") || "light")

toggleThemeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme")
    applyTheme(currentTheme === "dark" ? "light" : "dark")
  })
})
