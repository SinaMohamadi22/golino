
import { supabase } from "./cofig/supabase.js";
import "./modules/theme.js";

// DOM Elements
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

// Validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^09\d{9}$/;
const nameRegex = /^[\p{L}]+(?:\s+[\p{L}]+)+$/u;

// Custom Toast

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

// Add modal styles once

function addSuccessModalStyles() {
    if (document.querySelector("#custom-success-modal-styles")) return;

    const style = document.createElement("style");
    style.id = "custom-success-modal-styles";

    style.textContent = `
        .success-modal-overlay {
            position: fixed;
            inset: 0;
            width: 100%;
            z-index: 9999;

            display: flex;
            align-items: center;
            justify-content: center;

            background: rgba(0, 0, 123, 0.4);
            backdrop-filter: blur(3px);

            animation: successOverlayFade .25s ease;
        }

        .success-modal {
            position: relative;
            z-index: 2;

            width: min(600px, calc(100vw - 40px));
            padding: 3em;

            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;

            background: #fff;
            color: #222223;

            border-radius: 1rem;
            box-shadow: 0 15px 50px rgba(0, 0, 0, .2);

            text-align: center;
            font-family: inherit;

            animation: successModalShow .3s ease;
        }

        .success-modal-title {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 700;
        }

        .success-modal-message {
            margin: 0;
            font-size: .95rem;
            line-height: 2;
        }

        .success-modal-button {
            border: 0;
            border-radius: .5rem;

            padding: .8rem 2rem;

            background: #F21339;
            color: white;

            font-family: inherit;
            font-size: .95rem;
            font-weight: 600;

            cursor: pointer;
            transition: background .2s ease;
        }

        .success-modal-button:hover {
            background: #d90e30;
        }

        .success-modal-gif {
            position: absolute;

            width: 250px;
            height: 250px;

            left: 0;
            top: 50%;

            transform: translateY(-50%);

            object-fit: contain;
            pointer-events: none;
        }

        @keyframes successOverlayFade {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes successModalShow {
            from {
                opacity: 0;
                transform: scale(.94);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

/* Below LG */
    @media (max-width: 1023px) {
        .success-modal-overlay {
            flex-direction: column;
            gap: 20px;
            justify-content: center;
            align-items: stretch;
            overflow-y: auto;
            padding: 2rem 15px 2rem 0;
            box-sizing: border-box;
        }

        .success-modal-gif {
            position: fixed;
            left:0;
            top: 0;
            display: block;
            flex: 0 0 250px;

            width: 200px;
            height: 200px;

            align-self: flex-start;
            margin: 0;

            transform: none;
        }

        .success-modal {
            width: min(420px, calc(100vw - 30px));
            max-width: calc(100vw - 30px);

            padding: 2em;
            box-sizing: border-box;

            flex-shrink: 0;
            align-self: center;
        }
    }
        /* Mobile */
        @media (max-width: 600px) {
            .success-modal {
                padding: 1em;
            }
        }
        /* Tiny Mobile */
        @media (max-width: 400px) {
            .success-modal {
                margin-left: 1em;
            }
        }
    `;

    document.head.append(style);
}

// Show custom success modal

function showSuccessModal(title, message) {
    addSuccessModalStyles();

    // Remove previous modal if exists
    document.querySelector(".success-modal-overlay")?.remove();

    return new Promise((resolve) => {
        const overlay = document.createElement("div");
        overlay.className = "success-modal-overlay";

        const gif = document.createElement("img");
        gif.className = "success-modal-gif";
        gif.src = "../public/image/nyan_cat_transparent_stars.gif";
        gif.alt = "";
        gif.loading = "lazy"
        gif.draggable = false;

        const modal = document.createElement("div");
        modal.className = "success-modal font-iranyekan";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");

        const heading = document.createElement("h2");
        heading.className = "success-modal-title";
        heading.textContent = title;

        const description = document.createElement("p");
        description.className = "success-modal-message";
        description.textContent = message;

        const confirmButton = document.createElement("button");
        confirmButton.className = "success-modal-button";
        confirmButton.type = "button";
        confirmButton.textContent = "متوجه شدم";

        modal.append(heading, description, confirmButton);
        overlay.append(gif, modal);

        document.body.append(overlay);

        const closeModal = () => {
            overlay.remove();
            resolve();
        };

        confirmButton.addEventListener("click", closeModal);

        // Close with Escape
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                closeModal();
                document.removeEventListener("keydown", handleEscape);
            }
        };

        document.addEventListener("keydown", handleEscape);

        confirmButton.focus();
    });
}

// Auth Errors

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

// Loading

function setLoading(loading, text = "") {
    isSubmitting = loading;

    if (loginBtn) {
        loginBtn.disabled = loading;
        loginBtn.classList.toggle("opacity-60", loading);
        loginBtn.classList.toggle("cursor-not-allowed", loading);
    }

    if (loginBtnText) {
        loginBtnText.textContent = loading ? "لطفاً صبر کنید..." : text || "ادامه";
    }
}

// Redirect

function redirectAfterLogin() {
    window.location.href = "./index.html";
}

// Login Mode

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

// OTP Inputs

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

// Register

async function register() {
    const fullName = nameInput.value.trim();
    const phone = phoneNumberInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (!fullName || !phone || !email || !password) {
        showToast("لطفاً تمام فیلدها را تکمیل کنید.");
        return;
    }

    if (!nameRegex.test(fullName)) {
        showToast("نام و نام خانوادگی را به‌درستی وارد کنید.");
        return;
    }

    if (!phoneRegex.test(phone)) {
        showToast("شماره موبایل باید با 09 شروع شود و ۱۱ رقم باشد.");
        return;
    }

    if (!emailRegex.test(email)) {
        showToast("لطفاً یک آدرس ایمیل معتبر وارد کنید.");
        return;
    }

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

        if (error) throw error;

        if (data.session) {
            await showSuccessModal(
                "خوش آمدید!",
                "حساب شما با موفقیت ساخته شد و وارد حساب کاربری خود شدید."
            );

            redirectAfterLogin();
            return;
        }

        await showSuccessModal(
            "ثبت‌نام انجام شد!",
            "برای فعال‌سازی حساب، ایمیل خود را بررسی کنید."
        );

    } catch (error) {
        showToast(getAuthError(error));
        console.error("خطای ثبت‌نام:", error);
    } finally {
        setLoading(false, "ساخت حساب کاربری");
    }
}

// Login With Password

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

        await showSuccessModal(
            "خوش آمدید!",
            "با موفقیت وارد حساب کاربری خود شدید."
        );

        redirectAfterLogin();

    } catch (error) {
        showToast(getAuthError(error));
    } finally {
        setLoading(false, "ورود به حساب");
    }
}

// Request Email OTP

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

        showToast(
            "در صورت وجود حساب، ایمیل ورود ارسال می‌شود.",
            true
        );

    } catch (error) {
        showToast(getAuthError(error));
    } finally {
        setLoading(false, "ارسال کد ورود");
    }
}

// Verify Email OTP

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

        await showSuccessModal(
            "خوش آمدید!",
            "با موفقیت وارد حساب کاربری خود شدید."
        );

        redirectAfterLogin();

    } catch (error) {
        showToast(getAuthError(error));
    } finally {
        setLoading(false, "تأیید کد و ورود");
    }
}

// Handle Login

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

// Event Listeners

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

// Initial State

if (!isRegisterPage) {
    setLoginMode("password");
} else {
    setLoading(false, "ساخت حساب کاربری");
}
