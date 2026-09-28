import { getCookie, setCookie } from "../js/cookie.js";
const loginInput = document.querySelector(".login-input");
const loginBtn = document.querySelector(".login-btn");
const loginBtnText = document.querySelector(".login-btn-text");
const codeInput = document.querySelector(".code-input");
const codeInputs = document.querySelectorAll(".code-input input");
const dontRegester = document.querySelector(".dont-regester");
const numberOrEmail = document.querySelector(".number-or-email");
const nameInput = document.querySelector(".name-input");
const phoneNumberInput = document.querySelector(".phone-number-input");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");
const openEye = document.querySelector(".open-eye");
const closeEye = document.querySelector(".close-eye");
const inputContainer = document.querySelector(".input-container");

const loginEmailRegex = /^\w+([\.\_\-+%]?\w)*@\w+([\.\_\-+%]?\w)*(\.\w{2,3})+$/;
const loginPhoneNumberRegex =
  /^09(0[12345]|1[0-9]|2[012]|3[0-9]|4[1]|9[012389])\d{7}$/;
const loginNameAndLastNameRegex = /^[آ-ی]+(?:[ ‌][آ-ی]+)*$/u;
const loginPasswordRegex = /^(\w{8,64})+$/;

const loginIsSuccessfull = () => {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <article class="toast-box w-90 flex gap-x-3 dark:bg-zinc-700 bg-white absolute left-20 top-10 p-4 rounded-lg font-iranyekan">
        <div class="absolute left-4 top-4">
          <svg class="size-4 close-btn">
            <use class="text-737373 dark:text-white" href="#false"></use>
          </svg>
        </div>
        <div class="flex">
            <aside class="rounded-100 bg-green-200 p-3">
              <svg class="rounded-100 bg-green-600 p-1  size-7">
                <use class="text-white" href="#correct"></use>
              </svg>
            </aside>
        </div>
        <div class="flex flex-col gap-y-3">
            <span class="font-semibold text-sm dark:text-white">موفق</span>
            <p class="text-xs text-646464 dark:text-white font-semibold text-center">کد تایید به شماره موبایل شما ارسال شد</p>
        </div>
      </article>
      `,
  );
  dontRegester.classList.add("hidden");
  if (loginInput) {
    numberOrEmail.classList.add("text-center");
    numberOrEmail.innerHTML = `
    کد به ${loginInput.value} ارسال شد
    <br>
    دریافت نکردید؟
    <span class="text-primary send-again">ارسال مجدد</span>
  `;
  } else {
    inputContainer.insertAdjacentHTML(
      "afterbegin",
      `
        <h3 class="text-center text-222223 dark:text-white py-5 text-xs font-semibold leading-6 ">
         کد به ${phoneNumberInput.value} ارسال شد
        <br>
         دریافت نکردید؟
        <span class="text-primary send-again">ارسال مجدد</span>
        </h3>
        `,
    );
  }

  loginInput?.classList.add("hidden");
  nameInput?.parentElement.classList.add("hidden");
  phoneNumberInput?.parentElement.classList.add("hidden");
  emailInput?.parentElement.classList.add("hidden");
  passwordInput?.parentElement.classList.add("hidden");
  codeInput.classList.replace("hidden", "flex");
  codeInputs[0].focus();
  loginBtnText.innerHTML = "تایید و ورود";
  const sendAgain = document.querySelector(".send-again");
  const sendCodeAgainHandler = () => {
    let timer = 120;

    sendAgain.style.pointerEvents = "none";

    const interval = setInterval(() => {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;

      sendAgain.innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      timer--;

      if (timer < 0) {
        clearInterval(interval);
        sendAgain.innerHTML = "ارسال مجدد";
        sendAgain.style.pointerEvents = "auto";
      }
    }, 1000);
  };
  sendAgain?.addEventListener("click", sendCodeAgainHandler);
};

const loginError = (error) => {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <article class="toast-box w-90 flex gap-x-3 dark:bg-zinc-700 bg-white absolute left-20 top-10 p-4 rounded-lg font-iranyekan">
        <div class="absolute left-4 top-4">
          <svg class="size-4 close-btn">
            <use class="text-737373 dark:text-white" href="#false"></use>
          </svg>
        </div>
        <div class="flex">
            <aside class="rounded-100 bg-red-50 p-3">
              <svg class="rounded-100 bg-low-red p-1  size-7">
                <use class="text-white" href="#false"></use>
              </svg>
            </aside>
        </div>
        <div class="flex flex-col gap-y-3">
            <span class="font-semibold dark:text-white text-sm">خطا</span>
            <p class="text-xs text-646464 dark:text-white font-semibold text-center">${error}</p>
        </div>
      </article>
      `,
  );
};

const loginHandler = () => {
  if (!codeInput.classList.contains("hidden")) {
    verifyCode();
    return;
  }
  const oldToast = document.querySelector(".toast-box");
  if (oldToast) {
    oldToast.remove();
  }
  if (loginInput !== null) {
    if (
      loginEmailRegex.test(loginInput.value) ||
      loginPhoneNumberRegex.test(loginInput.value)
    ) {
      loginIsSuccessfull();
    } else {
      loginError("لطفا شماره موبایل یا ایمیل معتبر وارد نمایید");
    }
  } else {
    switch (true) {
      case !nameInput.value.trim() ||
        !phoneNumberInput.value.trim() ||
        !emailInput.value.trim() ||
        !passwordInput.value.trim():
        loginError("لطفاً تمام فیلدها را تکمیل کنید");
        break;
      case loginNameAndLastNameRegex.test(nameInput.value) === false:
        loginError("نام وارد شده صحیح نیست");
        break;

      case loginPhoneNumberRegex.test(phoneNumberInput.value) === false:
        loginError("شماره وارد شده صحیح نیست");
        break;

      case loginEmailRegex.test(emailInput.value) === false:
        loginError("ایمیل وارد شده صحیح نیست");
        break;

      case loginPasswordRegex.test(passwordInput.value) === false:
        loginError("رمز عبور وارد شده صحیح نیست");
        break;

      case loginNameAndLastNameRegex.test(nameInput.value) &&
        loginPhoneNumberRegex.test(phoneNumberInput.value) &&
        loginEmailRegex.test(emailInput.value) &&
        loginPasswordRegex.test(passwordInput.value):
        loginIsSuccessfull();
    }
  }
  const hideingToastBox = () => {
    const toast = document.querySelector(".toast-box");
    if (!toast) return;
    setTimeout(() => {
      toast.remove();
    }, 4000);
  };
  hideingToastBox();
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", hideModal);
};

const hideModal = () => {
  const toast = document.querySelector(".toast-box");
  if (toast) {
    toast.remove();
  }
};

const showPassword = () => {
  passwordInput.type = "text";
  openEye.classList.add("hidden");
  closeEye.classList.remove("hidden");
};

const hidePassword = () => {
  passwordInput.type = "password";
  closeEye.classList.add("hidden");
  openEye.classList.remove("hidden");
};

const verifyCode = () => {
  let code = "";

  codeInputs.forEach((input) => {
    code += input.value;
  });

  if (code.length !== codeInputs.length) {
    loginError("لطفا کد تایید را کامل وارد کنید");
    return;
  }
  const user = {
    phone: loginInput ? loginInput.value : phoneNumberInput.value,
    email: emailInput?.value || "",
    name: nameInput?.value || "",
    isLogin: true,
  };

  setCookie("user", JSON.stringify(user), 30);
  location.href = `../html/main.html`;
};

loginBtn.addEventListener("click", loginHandler);
window.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    loginHandler();
  }
});
phoneNumberInput?.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "");
});
openEye?.addEventListener("click", showPassword);
closeEye?.addEventListener("click", hidePassword);
codeInputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 1);

    if (e.target.value !== "") {
      e.target.nextElementSibling?.focus();
    }
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && input.value === "" && index > 0) {
      codeInputs[index - 1].focus();
    }
  });
});
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.remove("dark");
  localStorage.setItem("theme", "light");
} else {
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
}
