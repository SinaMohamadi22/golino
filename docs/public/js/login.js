// import { setCookie } from "./modules/cookie.js";
// import "./modules/theme.js";
// const loginInput = document.querySelector(".login-input");
// const loginBtn = document.querySelector(".login-btn");
// const loginBtnText = document.querySelector(".login-btn-text");
// const codeInput = document.querySelector(".code-input");
// const codeInputs = document.querySelectorAll(".code-input input");
// const dontRegester = document.querySelector(".dont-regester");
// const numberOrEmail = document.querySelector(".number-or-email");
// const nameInput = document.querySelector(".name-input");
// const phoneNumberInput = document.querySelector(".phone-number-input");
// const emailInput = document.querySelector(".email-input");
// const passwordInput = document.querySelector(".password-input");
// const openEye = document.querySelector(".open-eye");
// const closeEye = document.querySelector(".close-eye");
// const inputContainer = document.querySelector(".input-container");

// const loginEmailRegex =
//   /^[\w.+%-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

// const loginPhoneNumberRegex =
//   /^09(0[12345]|1[0-9]|2[012]|3[0-9]|4[1]|9[012389])\d{7}$/;

// const loginNameAndLastNameRegex =
//   /^[آ-ی]+(?:\s+[آ-ی]+)+$/u;

// const loginPasswordRegex =
//   /^\w{8,64}$/;

// const loginIsSuccessfull = () => {
//   document.body.insertAdjacentHTML(
//     "beforeend",
//     `
//       <article class="toast-box w-90 flex gap-x-3 dark:bg-zinc-700 bg-white absolute left-20 top-10 p-4 rounded-lg font-iranyekan">
//         <div class="absolute left-4 top-4">
//           <svg class="size-4 close-btn">
//             <use class="text-737373 dark:text-white" href="#false"></use>
//           </svg>
//         </div>
//         <div class="flex">
//             <aside class="rounded-100 bg-green-200 p-3">
//               <svg class="rounded-100 bg-green-600 p-1  size-7">
//                 <use class="text-white" href="#correct"></use>
//               </svg>
//             </aside>
//         </div>
//         <div class="flex flex-col gap-y-3">
//             <span class="font-semibold text-sm dark:text-white">موفق</span>
//             <p class="text-xs text-646464 dark:text-white font-semibold text-center">کد تایید به شماره موبایل شما ارسال شد</p>
//         </div>
//       </article>
//       `,
//   );
//   dontRegester.classList.add("hidden");
//   if (loginInput) {
//     numberOrEmail.classList.add("text-center");
//     numberOrEmail.innerHTML = `
//     کد به ${loginInput.value} ارسال شد
//     <br>
//     دریافت نکردید؟
//     <span class="text-primary send-again">ارسال مجدد</span>
//   `;
//   } else {
//     inputContainer.insertAdjacentHTML(
//       "afterbegin",
//       `
//         <h3 class="text-center text-222223 dark:text-white py-5 text-xs font-semibold leading-6 ">
//          کد به ${phoneNumberInput.value} ارسال شد
//         <br>
//          دریافت نکردید؟
//         <span class="text-primary send-again">ارسال مجدد</span>
//         </h3>
//         `,
//     );
//   }

//   loginInput?.classList.add("hidden");
//   nameInput?.parentElement.classList.add("hidden");
//   phoneNumberInput?.parentElement.classList.add("hidden");
//   emailInput?.parentElement.classList.add("hidden");
//   passwordInput?.parentElement.classList.add("hidden");
//   codeInput.classList.replace("hidden", "flex");
//   codeInputs[0].focus();
//   loginBtnText.innerHTML = "تایید و ورود";
//   const sendAgain = document.querySelector(".send-again");
//   const sendCodeAgainHandler = () => {
//     let timer = 120;

//     sendAgain.style.pointerEvents = "none";

//     const interval = setInterval(() => {
//       const minutes = Math.floor(timer / 60);
//       const seconds = timer % 60;

//       sendAgain.innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

//       timer--;

//       if (timer < 0) {
//         clearInterval(interval);
//         sendAgain.innerHTML = "ارسال مجدد";
//         sendAgain.style.pointerEvents = "auto";
//       }
//     }, 1000);
//   };
//   sendAgain?.addEventListener("click", sendCodeAgainHandler);
// };

// const loginError = (error) => {
//   document.body.insertAdjacentHTML(
//     "beforeend",
//     `
//       <article class="toast-box w-90 flex gap-x-3 dark:bg-zinc-700 bg-white absolute left-20 top-10 p-4 rounded-lg font-iranyekan">
//         <div class="absolute left-4 top-4">
//           <svg class="size-4 close-btn">
//             <use class="text-737373 dark:text-white" href="#false"></use>
//           </svg>
//         </div>
//         <div class="flex">
//             <aside class="rounded-100 bg-red-50 p-3">
//               <svg class="rounded-100 bg-low-red p-1  size-7">
//                 <use class="text-white" href="#false"></use>
//               </svg>
//             </aside>
//         </div>
//         <div class="flex flex-col gap-y-3">
//             <span class="font-semibold dark:text-white text-sm">خطا</span>
//             <p class="text-xs text-646464 dark:text-white font-semibold text-center">${error}</p>
//         </div>
//       </article>
//       `,
//   );
// };

// const loginHandler = () => {
//   if (codeInput && !codeInput.classList.contains("hidden")) {
//     verifyCode();
//     return;
//   }
//   const oldToast = document.querySelector(".toast-box");
//   if (oldToast) {
//     oldToast.remove();
//   }
//   if (loginInput !== null) {
//     if (
//       loginEmailRegex.test(loginInput.value) ||
//       loginPhoneNumberRegex.test(loginInput.value)
//     ) {
//       loginIsSuccessfull();
//     } else {
//       loginError("لطفا شماره موبایل یا ایمیل معتبر وارد نمایید");
//     }
//   } else {
//     switch (true) {
//       case !nameInput.value.trim() ||
//         !phoneNumberInput.value.trim() ||
//         !emailInput.value.trim() ||
//         !passwordInput.value.trim():
//         loginError("لطفاً تمام فیلدها را تکمیل کنید");
//         break;
//       case loginNameAndLastNameRegex.test(nameInput.value) === false:
//         loginError("نام وارد شده صحیح نیست");
//         break;

//       case loginPhoneNumberRegex.test(phoneNumberInput.value) === false:
//         loginError("شماره وارد شده صحیح نیست");
//         break;

//       case loginEmailRegex.test(emailInput.value) === false:
//         loginError("ایمیل وارد شده صحیح نیست");
//         break;

//       case loginPasswordRegex.test(passwordInput.value) === false:
//         loginError("رمز عبور وارد شده صحیح نیست");
//         break;

//       case loginNameAndLastNameRegex.test(nameInput.value) &&
//         loginPhoneNumberRegex.test(phoneNumberInput.value) &&
//         loginEmailRegex.test(emailInput.value) &&
//         loginPasswordRegex.test(passwordInput.value):
//         loginIsSuccessfull();
//     }
//   }
//   const hideingToastBox = () => {
//     const toast = document.querySelector(".toast-box");
//     if (!toast) return;
//     setTimeout(() => {
//       toast.remove();
//     }, 4000);
//   };
//   hideingToastBox();
//   const closeBtn = document.querySelector(".close-btn");
//   closeBtn.addEventListener("click", hideModal);
// };

// const hideModal = () => {
//   const toast = document.querySelector(".toast-box");
//   if (toast) {
//     toast.remove();
//   }
// };

// const showPassword = () => {
//   passwordInput.type = "text";
//   openEye.classList.add("hidden");
//   closeEye.classList.remove("hidden");
// };

// const hidePassword = () => {
//   passwordInput.type = "password";
//   closeEye.classList.add("hidden");
//   openEye.classList.remove("hidden");
// };

// const verifyCode = () => {
//   let code = "";

//   codeInputs.forEach((input) => {
//     code += input.value;
//   });

//   if (code.length !== codeInputs.length) {
//     loginError("لطفا کد تایید را کامل وارد کنید");
//     return;
//   }
//   const user = {
//     phone: loginInput ? loginInput.value : phoneNumberInput.value,
//     email: emailInput?.value || "",
//     name: nameInput?.value || "",
//     isLogin: true,
//   };

//   setCookie("user", JSON.stringify(user), 30);
//   location.href = `../html/main.html`;
// };

// loginBtn.addEventListener("click", loginHandler);
// window.addEventListener("keydown", (event) => {
//   if (event.code === "Enter") {
//     loginHandler();
//   }
// });
// phoneNumberInput?.addEventListener("input", (e) => {
//   e.target.value = e.target.value.replace(/\D/g, "");
// });
// openEye?.addEventListener("click", showPassword);
// closeEye?.addEventListener("click", hidePassword);
// codeInputs.forEach((input, index) => {
//   input.addEventListener("input", (e) => {
//     e.target.value = e.target.value.replace(/\D/g, "").slice(0, 1);

//     if (e.target.value !== "") {
//       e.target.nextElementSibling?.focus();
//     }
//   });
//   input.addEventListener("keydown", (e) => {
//     if (e.key === "Backspace" && input.value === "" && index > 0) {
//       codeInputs[index - 1].focus();
//     }
//   });
// });

import { supabase } from "./cofig/supabase.js";
import "./modules/theme.js";

const loginInput = document.querySelector(".login-input");
const loginBtn = document.querySelector(".login-btn");
const loginBtnText = document.querySelector(".login-btn-text");
const codeInput = document.querySelector(".code-input");
const codeInputs = [...document.querySelectorAll(".code-input input")];

const dontRegester = document.querySelector(".dont-regester");
const numberOrEmail = document.querySelector(".number-or-email");

const nameInput = document.querySelector(".name-input");
const phoneNumberInput = document.querySelector(".phone-number-input");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");
const loginPasswordInput = document.querySelector(".login-password-input");

const openEye = document.querySelector(".open-eye");
const closeEye = document.querySelector(".close-eye");
const inputContainer = document.querySelector(".input-container");

const passwordModeBtn = document.querySelector(".login-mode-password");
const otpModeBtn = document.querySelector(".login-mode-otp");

const isRegisterPage = Boolean(nameInput);

let loginMode = "password";
let otpRequested = false;
let isSubmitting = false;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^09\d{9}$/;
const nameRegex = /^[\p{L}]+(?:\s+[\p{L}]+)+$/u;

function showToast(message, success = false) {
  document.querySelectorAll(".toast-box").forEach((toast) => toast.remove());

  const toast = document.createElement("article");
  toast.className =
    "toast-box w-90 flex gap-x-3 dark:bg-zinc-700 bg-white fixed left-5 top-5 z-[100] p-4 rounded-lg font-iranyekan shadow-lg";

  const title = document.createElement("span");
  title.className = "font-semibold text-sm dark:text-white";
  title.textContent = success ? "موفق" : "خطا";

  const text = document.createElement("p");
  text.className = "text-xs text-646464 dark:text-white font-semibold";
  text.textContent = message;

  const content = document.createElement("div");
  content.className = "flex flex-col gap-y-3";
  content.append(title, text);

  const close = document.createElement("button");
  close.type = "button";
  close.className = "absolute left-3 top-2 text-sm dark:text-white";
  close.textContent = "×";
  close.setAttribute("aria-label", "بستن پیام");
  close.addEventListener("click", () => toast.remove());

  toast.append(close, content);
  document.body.append(toast);

  setTimeout(() => toast.remove(), 6000);
}

function getAuthError(error) {
  const message = error?.message?.toLowerCase() || "";

  if (message.includes("invalid login credentials")) {
    return "ایمیل یا رمز عبور صحیح نیست.";
  }

  if (message.includes("email not confirmed")) {
    return "ابتدا ایمیل خود را از طریق لینک ارسال‌شده تأیید کنید.";
  }

  if (message.includes("user already registered")) {
    return "این ایمیل قبلاً ثبت‌نام کرده است؛ وارد حساب خود شوید.";
  }

  if (message.includes("password should be")) {
    return "رمز عبور باید حداقل ۸ کاراکتر داشته باشد.";
  }

  if (message.includes("rate limit") || message.includes("too many requests")) {
    return "درخواست‌های زیادی ارسال شده؛ کمی صبر کنید و دوباره تلاش کنید.";
  }

  if (message.includes("email address") && message.includes("invalid")) {
    return "آدرس ایمیل معتبر نیست.";
  }

  return error?.message || "خطایی رخ داد. لطفاً دوباره تلاش کنید.";
}

function setLoading(loading, text = "") {
  isSubmitting = loading;
  loginBtn.disabled = loading;
  loginBtn.classList.toggle("opacity-60", loading);
  loginBtn.classList.toggle("cursor-not-allowed", loading);

  if (loginBtnText) {
    loginBtnText.textContent = loading ? "لطفاً صبر کنید..." : text || "ادامه";
  }
}

function redirectAfterLogin() {
  window.location.href = "../html/main.html";
}

function setLoginMode(mode) {
  loginMode = mode;
  otpRequested = false;

  loginInput?.classList.remove("hidden");
  loginPasswordInput?.classList.toggle("hidden", mode !== "password");
  codeInput?.classList.add("hidden");

  if (numberOrEmail) {
    numberOrEmail.textContent =
      mode === "password"
        ? "ایمیل و رمز عبور خود را وارد کنید"
        : "ایمیل خود را وارد کنید تا کد ورود برایتان ارسال شود";
  }

  if (loginBtnText) {
    loginBtnText.textContent =
      mode === "password" ? "ورود به حساب" : "ارسال کد ورود";
  }

  passwordModeBtn?.classList.toggle("text-primary", mode === "password");
  otpModeBtn?.classList.toggle("text-primary", mode === "otp");

  codeInputs.forEach((input) => {
    input.value = "";
  });
}

function showCodeInputs() {
  otpRequested = true;
  loginInput?.classList.add("hidden");
  loginPasswordInput?.classList.add("hidden");
  codeInput?.classList.remove("hidden");
  codeInput?.classList.add("flex");

  if (numberOrEmail) {
    numberOrEmail.textContent =
      `کد ارسال‌شده به ایمیل ${loginInput.value.trim()} را وارد کنید.`;
  }

  if (loginBtnText) {
    loginBtnText.textContent = "تأیید کد و ورود";
  }

  codeInputs.forEach((input) => {
    input.value = "";
  });

  codeInputs[0]?.focus();
}


async function register() {
  const fullName = nameInput.value.trim();
  const phone = phoneNumberInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  // بررسی خالی نبودن فیلدها
  if (!fullName || !phone || !email || !password) {
    showToast("لطفاً تمام فیلدها را تکمیل کنید.");
    return;
  }

  // اعتبارسنجی نام و نام خانوادگی
  if (!nameRegex.test(fullName)) {
    showToast("نام و نام خانوادگی را به‌درستی وارد کنید.");
    return;
  }

  // اعتبارسنجی شماره موبایل ایران
  if (!phoneRegex.test(phone)) {
    showToast("شماره موبایل باید با 09 شروع شود و ۱۱ رقم باشد.");
    return;
  }

  // اعتبارسنجی ایمیل
  if (!emailRegex.test(email)) {
    showToast("لطفاً یک آدرس ایمیل معتبر وارد کنید.");
    return;
  }

  // اعتبارسنجی رمز عبور
  if (password.length < 8 || password.length > 64) {
    showToast("رمز عبور باید بین ۸ تا ۶۴ کاراکتر باشد.");
    return;
  }

  setLoading(true);

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://127.0.0.1:5500/src/html/login.html",
        data: {
          full_name: fullName,
          phone: phone,
        },
      },
    });

    if (error) {
      throw error;
    }

    if (data.session) {
      showToast("حساب شما ساخته شد و وارد شدید.", true);

      redirectAfterLogin();
      return;
    }

    showToast(
      "ثبت‌نام انجام شد. ایمیل خود را برای تأیید حساب بررسی کنید.",
      true
    );
  } catch (error) {
    showToast(getAuthError(error));
    console.error("خطای ثبت‌نام:", error);
  } finally {
    setLoading(false, "ساخت حساب کاربری");
  }
}


async function loginWithPassword() {
  const email = loginInput.value.trim().toLowerCase();
  const password = loginPasswordInput.value;

  if (!emailRegex.test(email)) {
    showToast("لطفاً ایمیل معتبر وارد کنید.");
    return;
  }

  if (!password) {
    showToast("رمز عبور خود را وارد کنید.");
    return;
  }

  setLoading(true);

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    showToast("با موفقیت وارد شدید.", true);
    redirectAfterLogin();
  } catch (error) {
    showToast(getAuthError(error));
  } finally {
    setLoading(false, "ورود به حساب");
  }
}

async function requestEmailOtp() {
  const email = loginInput.value.trim().toLowerCase();

  if (!emailRegex.test(email)) {
    showToast("لطفاً آدرس ایمیل معتبر وارد کنید.");
    return;
  }

  setLoading(true);

  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
      },
    });

    if (error) throw error;

    showCodeInputs();
    showToast("در صورت وجود حساب، ایمیل ورود ارسال می‌شود.", true);
  } catch (error) {
    showToast(getAuthError(error));
  } finally {
    setLoading(false, "ارسال کد ورود");
  }
}

async function verifyEmailOtp() {
  const email = loginInput.value.trim().toLowerCase();
  const token = codeInputs.map((input) => input.value.trim()).join("");

  if (token.length !== 6 || !/^\d{6}$/.test(token)) {
    showToast("کد ۶ رقمی را کامل وارد کنید.");
    return;
  }

  setLoading(true);

  try {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (error) throw error;

    showToast("با موفقیت وارد شدید.", true);
    redirectAfterLogin();
  } catch (error) {
    showToast(getAuthError(error));
  } finally {
    setLoading(false, "تأیید کد و ورود");
  }
}

async function handleLogin() {
  if (isSubmitting) return;

  if (isRegisterPage) {
    await register();
    return;
  }

  if (otpRequested) {
    await verifyEmailOtp();
    return;
  }

  if (loginMode === "password") {
    await loginWithPassword();
  } else {
    await requestEmailOtp();
  }
}

loginBtn?.addEventListener("click", handleLogin);

passwordModeBtn?.addEventListener("click", () => {
  setLoginMode("password");
});

otpModeBtn?.addEventListener("click", () => {
  setLoginMode("otp");
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleLogin();
  }
});

phoneNumberInput?.addEventListener("input", (event) => {
  event.target.value = event.target.value.replace(/\D/g, "").slice(0, 11);
});

openEye?.addEventListener("click", () => {
  if (!passwordInput) return;
  passwordInput.type = "text";
  openEye.classList.add("hidden");
  closeEye?.classList.remove("hidden");
});

closeEye?.addEventListener("click", () => {
  if (!passwordInput) return;
  passwordInput.type = "password";
  closeEye.classList.add("hidden");
  openEye?.classList.remove("hidden");
});

codeInputs.forEach((input, index) => {
  input.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/\D/g, "").slice(0, 1);

    if (event.target.value && index < codeInputs.length - 1) {
      codeInputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && !input.value && index > 0) {
      codeInputs[index - 1].focus();
    }
  });
});

if (!isRegisterPage) {
  setLoginMode("password");
} else {
  setLoading(false, "ساخت حساب کاربری");
}
