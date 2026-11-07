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
