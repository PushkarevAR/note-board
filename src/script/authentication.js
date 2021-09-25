import { isInputEmpty } from "../script/app.js";

const modal = document.querySelector(".modal"),
  authArea = modal.querySelector(".auth"),
  authTitle = authArea.querySelector("h3"),
  authTextTop = authArea.querySelectorAll("p")[0],
  authTextBottom = authArea.querySelectorAll("p")[2],
  btnLogin = authArea.querySelector("button"),
  btnLoginHeader = document.querySelector(".btn-login"),
  btnClose = authArea.querySelector("i");

btnLoginHeader.addEventListener("click", () => {
  showLoginModal();
  modal.classList.add("modal-active");
});

btnClose.addEventListener("click", () => {
  modal.classList.remove("modal-active");
});

authTextBottom.addEventListener("click", (e) => {
  e.preventDefault();
  authTitle.classList.toggle("reg");

  !authArea.querySelector(".reg") ? showRegModal() : showLoginModal();
});

function showLoginModal() {
  authTextTop.classList.remove("incorrect");
  authTitle.innerHTML = `It's nice to see <span>You</span> back`;
  authTextTop.textContent = "And you are?";
  authTextBottom.innerHTML = `Not registered yet? <a href="#">Join us now!</a>`;
  btnLogin.textContent = "Login";
  return false;
}

function showRegModal() {
  authTextTop.classList.remove("incorrect");
  authTitle.innerHTML = `The new <span>One</span>? The new <span>One</span>!`;
  authTextTop.textContent = "You are one stem away from your Noat Board";
  authTextBottom.innerHTML = `You looks familiar... <a href="#">login in</a>`;
  btnLogin.textContent = "Register";
  return false;
}

btnLogin.addEventListener("click", () => {
  let inputs = authArea.querySelectorAll("input");

  inputs.forEach(input => {
    if(input.value == "") isInputEmpty(input);
  });

  if(isLogined()) {
    modal.classList.remove("modal-active");
  } else {
    authTextTop.textContent = "Incorrect";
    authTextTop.classList.add("incorrect");
  };
});

function isLogined() {
  return false;
}