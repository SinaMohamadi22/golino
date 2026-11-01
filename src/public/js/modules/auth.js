
import { supabase } from "../cofig/supabase.js";

const userLoginBtns = document.querySelectorAll(".user-login-btn");
const userLoginBtnsText = document.querySelectorAll(".user-login-btn-text");
const firstTimeLoginBtns = document.querySelectorAll(".first-time-login-btn");

let isLoggedIn = false;

// نمایش دکمه مناسب براساس وضعیت ورود
const updateAuthUI = () => {
    userLoginBtns.forEach((button) => {
        button.classList.toggle("hidden", !isLoggedIn);
    });

    firstTimeLoginBtns.forEach((button) => {
        button.classList.toggle("hidden", isLoggedIn);
    });

    // بستن منوی خروج پس از تغییر وضعیت ورود
    userLoginBtnsText.forEach((menu) => {
        menu.classList.add("hidden");
    });
};

// باز و بسته کردن منوی خروج
const toggleLogoutMenu = () => {
    userLoginBtnsText.forEach((menu) => {
        menu.classList.toggle("hidden");
    });
};

// خروج از حساب کاربری
const handleLogout = async (event) => {
    event.stopPropagation();

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("خطا در خروج از حساب:", error);
        return;
    }

    isLoggedIn = false;
    updateAuthUI();
};

// مدیریت کلیک روی دکمه حساب کاربری و منوی خروج
userLoginBtns.forEach((button) => {
    button.addEventListener("click", async (event) => {
        const logoutMenu = event.target.closest(".user-login-btn-text");

        if (logoutMenu) {
            await handleLogout(event);
            return;
        }

        toggleLogoutMenu();
    });
});

// بستن منو با کلیک بیرون از بخش حساب کاربری
document.addEventListener("click", (event) => {
    const clickedInsideUserButton = [...userLoginBtns].some((button) =>
        button.contains(event.target)
    );

    if (!clickedInsideUserButton) {
        userLoginBtnsText.forEach((menu) => {
            menu.classList.add("hidden");
        });
    }
});

// دریافت وضعیت اولیه ورود
const initAuth = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error("خطا در دریافت وضعیت ورود:", error);
        return;
    }

    isLoggedIn = Boolean(data.session?.user);
    updateAuthUI();
};

// هماهنگ‌سازی رابط کاربری با وضعیت نشست Supabase
supabase.auth.onAuthStateChange((_event, session) => {
    isLoggedIn = Boolean(session?.user);
    updateAuthUI();
});

initAuth();
