function setInputError(inputElement, message) {
    // Find the parent group
    const inputGroup = inputElement.closest(".form__input-group");
    if (!inputGroup) {
        console.error("Could not find .form__input-group for", inputElement);
        return;
    }

    // Find the error message element
    const errorElement = inputGroup.querySelector(".form__input--error-message");
    if (!errorElement) {
        console.error("Could not find .form__input--error-message in", inputGroup);
        return;
    }

    inputElement.classList.add("form__input--error");
    errorElement.textContent = message;
}


function clearInputError(inputElement) {
    // Find the parent group
    const inputGroup = inputElement.closest(".form__input-group");
    if (!inputGroup) {
        console.error("Could not find .form__input-group for", inputElement);
        return;
    }

    // Find the error message element
    const errorElement = inputGroup.querySelector(".form__input--error-message");
    if (!errorElement) {
        console.error("Could not find .form__input--error-message in", inputGroup);
        return;
    }

    inputElement.classList.remove("form__input--error");
    errorElement.textContent = "";
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(String(email).toLowerCase());
}


document.addEventListener("DOMContentLoaded", () => {

    // Get ALL the elements we need
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const loginBtn = document.querySelector("#loginBtn");
    const signUpBtn = document.querySelector("#SignUpBtn");
    const formTitle = document.querySelector(".form__title");
    const formParagraph = document.querySelector(".form__paragraph");


    const loginMessageElement = document.querySelector(".form__message");


    createAccountForm.classList.add("form--hidden");
    loginForm.classList.remove("form--hidden");

    // Click LOGIN Button
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        loginBtn.classList.add("active");
        signUpBtn.classList.remove("active");
        formTitle.textContent = "Welcome Back!";
        formParagraph.textContent = "Enter your details to access your account";

        if (loginMessageElement) {
            loginMessageElement.textContent = "";
        }
        loginForm.querySelectorAll(".form__input").forEach(clearInputError);
    });

    // Click SIGN UP Button
    signUpBtn.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
        signUpBtn.classList.add("active");
        loginBtn.classList.remove("active");
        formTitle.textContent = "Join TaskMaster";
        formParagraph.textContent = "Create an account to boost your productivity";

        createAccountForm.querySelectorAll(".form__input").forEach(clearInputError);
    });

    // --- Login Form Validation ---
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let allValid = true;

        if (loginMessageElement) {
            loginMessageElement.textContent = "";
        }
        loginForm.querySelectorAll(".form__input").forEach(clearInputError);

        const emailInput = loginForm.querySelector('input[type="email"]');
        const passwordInput = loginForm.querySelector('input[type="password"]');

        if (!emailInput.value.trim()) {
            setInputError(emailInput, "Email is required");
            allValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            setInputError(emailInput, "Please enter a valid email address");
            allValid = false;
        }

        if (!passwordInput.value.trim()) {
            setInputError(passwordInput, "Password is required");
            allValid = false;
        }

        if (allValid && loginMessageElement) {
            loginMessageElement.textContent = "Incorrect username/password combination";
        }
    });

    // --- Sign Up Form Validation ---
    createAccountForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let allValid = true;

        createAccountForm.querySelectorAll(".form__input").forEach(clearInputError);

        const fullNameInput = createAccountForm.querySelector('input[type="text"]');
        const emailInput = createAccountForm.querySelector('input[type="email"]');
        const passwordInput = createAccountForm.querySelector('input[type="password"]');

        if (!fullNameInput.value.trim()) {
            setInputError(fullNameInput, "Full Name is required");
            allValid = false;
        }

        if (!emailInput.value.trim()) {
            setInputError(emailInput, "Email is required");
            allValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            setInputError(emailInput, "Please enter a valid email address");
            allValid = false;
        }

        if (!passwordInput.value.trim()) {
            setInputError(passwordInput, "Password is required");
            allValid = false;
        } else if (passwordInput.value.length < 6) {
            setInputError(passwordInput, "Password must be at least 6 characters long");
            allValid = false;
        }

        if (allValid) {
            console.log("Sign Up form is valid! Creating account...");
        }
    });


    document.getElementById('createAccount').addEventListener('submit', function (e) {
        e.preventDefault(); 
        const name = document.getElementById('input-name').value;
        const email = document.getElementById('input-email').value;
        localStorage.setItem('currentUser_Name', name);
        localStorage.setItem('currentUser_Email', email);
        window.location.href = 'dashboard/dashboard.html'; 
    });

    document.getElementById('login').addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        localStorage.setItem('currentUser_Email', email);
        window.location.href = '/dashboard/dashboard.html';
    });

});