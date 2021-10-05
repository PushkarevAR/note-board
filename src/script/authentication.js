import { smoothActivation } from "./additional.js";

// Show modal and Login screen by LOGIN btn in the header
const btnLoginHeader = document.querySelector(".btn-login");
btnLoginHeader.addEventListener("click", () =>
  smoothActivation(document.querySelector(".modal"), 10)
);

// Hide modal and Login screen by btn
const btnCloseModal = document.querySelectorAll("#btn-close-modal");
btnCloseModal.forEach((btn) =>
  btn.addEventListener("click", () => hideModal())
);

// Switch from login window to signup window
const loginWindow = document.querySelector(".login-window"),
  signupWindow = document.querySelector(".signup-window"),
  btnToSignup = loginWindow.querySelector(".login-footer"),
  btnToLogin = signupWindow.querySelector(".signup-footer");

btnToSignup.addEventListener("click", () => showSignupWindow(360));
btnToLogin.addEventListener("click", () => showLoginWindow(360));

function showSignupWindow(delay) {
  loginWindow.classList.remove("active");
  smoothActivation(signupWindow, delay);
}

function showLoginWindow(delay) {
  signupWindow.classList.remove("active");
  smoothActivation(loginWindow, delay);
}

export function hideModal() {
  document.querySelector(".modal").classList.remove("active");
}
