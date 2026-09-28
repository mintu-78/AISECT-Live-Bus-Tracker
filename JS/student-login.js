const html = document.documentElement;

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

const loginForm = document.getElementById("studentLoginForm");
const studentIdInput = document.getElementById("studentId");
const passwordInput = document.getElementById("password");

const passwordToggle = document.getElementById("passwordToggle");
const guestBtn = document.getElementById("guestBtn");
const forgotPassword = document.getElementById("forgotPassword");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


// THEME

const savedTheme = localStorage.getItem("aisectTheme");

if (savedTheme) {
    html.dataset.theme = savedTheme;
}

updateThemeIcon();


themeToggle.addEventListener("click", () => {

    const currentTheme = html.dataset.theme;

    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";

    html.dataset.theme = newTheme;

    localStorage.setItem("aisectTheme", newTheme);

    updateThemeIcon();

});


function updateThemeIcon() {

    if (html.dataset.theme === "dark") {

        themeIcon.className = "fa-solid fa-sun";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    } else {

        themeIcon.className = "fa-solid fa-moon";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );
    }
}


// PASSWORD

passwordToggle.addEventListener("click", () => {

    const isHidden =
        passwordInput.type === "password";

    passwordInput.type =
        isHidden ? "text" : "password";

    passwordToggle.innerHTML = isHidden
        ? '<i class="fa-regular fa-eye-slash"></i>'
        : '<i class="fa-regular fa-eye"></i>';

});


// LOGIN

loginForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const studentId =
        studentIdInput.value.trim();

    const password =
        passwordInput.value.trim();

    if (!studentId || !password) {

        showToast(
            "Please enter your Student ID and password."
        );

        return;
    }


    const loginBtn =
        document.getElementById("loginBtn");

    const originalHTML =
        loginBtn.innerHTML;

    loginBtn.disabled = true;

    loginBtn.innerHTML = `
        <i class="fa-solid fa-circle-notch fa-spin"></i>
        <span>Signing in...</span>
    `;


    setTimeout(() => {

        loginBtn.disabled = false;

        loginBtn.innerHTML = originalHTML;

        showToast(
            "Firebase authentication will be connected here."
        );

    }, 1000);

});


// GUEST

guestBtn.addEventListener("click", () => {

    guestBtn.innerHTML = `
        <span class="guest-icon">
            <i class="fa-solid fa-circle-notch fa-spin"></i>
        </span>

        <span>
            <strong>Opening Tracker...</strong>
            <small>Please wait</small>
        </span>

        <i class="fa-solid fa-arrow-right arrow"></i>
    `;

    setTimeout(() => {

        window.location.href = "index.html";

    }, 500);

});


// FORGOT PASSWORD

forgotPassword.addEventListener("click", (event) => {

    event.preventDefault();

    showToast(
        "Please contact AISECT support to reset your password."
    );

});


// TOAST

let toastTimer;

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

}