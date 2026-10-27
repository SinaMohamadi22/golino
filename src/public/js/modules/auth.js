import { getCookie, setCookie, logout } from "./cookie.js";

const userLoginBtns = document.querySelectorAll(".user-login-btn");
const userLoginBtnsText = document.querySelectorAll(".user-login-btn-text");
const firstTimeLoginBtns = document.querySelectorAll(".first-time-login-btn");

const user = getCookie("user");
if (user) {
  const userData = JSON.parse(user);

  if (userData.isLogin) {
    userLoginBtns?.forEach((userLoginBtn) => {
      userLoginBtn.classList.remove("hidden");
    });
    firstTimeLoginBtns?.forEach((firstTimeLoginBtn) => {
      firstTimeLoginBtn.classList.add("hidden");
    });
  } else {
    userLoginBtns?.forEach((userLoginBtn) => {
      userLoginBtn.classList.add("hidden");
    });
    firstTimeLoginBtns?.forEach((firstTimeLoginBtn) => {
      firstTimeLoginBtn.classList.remove("hidden");
    });
  }
}
const showLogOutBtn = () => {
  userLoginBtnsText.forEach((userLoginBtnText) => {
    userLoginBtnText.classList.toggle("hidden");
  });
};

userLoginBtns.forEach((userLoginBtn) => {
  userLoginBtn.addEventListener("click", (event) => {
    if (event.target.closest(".user-login-btn-text")) {
      event.stopPropagation();
      logout();
      location.reload();
      return;
    }

    showLogOutBtn();
  });
});