// import { isInputEmpty } from "../script/app.js";

// const modal = document.querySelector(".modal"),
//   authArea = modal.querySelector(".auth"),
//   authTitle = authArea.querySelector("h3"),
//   authTextTop = authArea.querySelectorAll("p")[0],
//   authTextBottom = authArea.querySelectorAll("p")[2],
//   btnLogin = authArea.querySelector("button"),
//   btnLoginHeader = document.querySelector(".btn-login"),
//   btnClose = authArea.querySelector("i");

// btnLoginHeader.addEventListener("click", () => {
//   showLoginModal();
//   modal.classList.add("modal-active");
// });

// btnClose.addEventListener("click", () => {
//   modal.classList.remove("modal-active");
// });

// authTextBottom.addEventListener("click", (e) => {
//   e.preventDefault();
//   authTitle.classList.toggle("reg");

//   !authArea.querySelector(".reg") ? showRegModal() : showLoginModal();
// });

// function showLoginModal() {
//   authTextTop.classList.remove("incorrect");
//   authTitle.innerHTML = `It's nice to see <span>You</span> back`;
//   authTextTop.textContent = "And you are?";
//   authTextBottom.innerHTML = `Not registered yet? <a href="#">Join us now!</a>`;
//   btnLogin.textContent = "Login";
//   return false;
// }

// function showRegModal() {
//   authTextTop.classList.remove("incorrect");
//   authTitle.innerHTML = `The new <span>One</span>? The new <span>One</span>!`;
//   authTextTop.textContent = "You are one stem away from your Noat Board";
//   authTextBottom.innerHTML = `You looks familiar... <a href="#">login in</a>`;
//   btnLogin.textContent = "Register";
//   return false;
// }

// btnLogin.addEventListener("click", () => {
//   let inputs = authArea.querySelectorAll("input");

//   inputs.forEach(input => {
//     if(input.value == "") isInputEmpty(input);
//   });

//   if(isLogined()) {
//     modal.classList.remove("modal-active");
//   } else {
//     authTextTop.textContent = "Incorrect";
//     authTextTop.classList.add("incorrect");
//   };
// });

// function isLogined() {
//   return false;
// }

const btnLoginHeader = document.querySelector(".btn-login");

btnLoginHeader.addEventListener("click", () => {
  // document.querySelector(".modal").classList.add("active");
  smoothActivation(document.querySelector(".modal"), 10);
});

const modalArea = document.querySelector(".modal-container"),
  btnCloseModal = modalArea.querySelectorAll("i");

btnCloseModal.forEach((btn) => {
  btn.addEventListener("click", () => {
    // document.querySelector(".modal").classList.remove("active");
    smoothRemove(document.querySelector(".modal"), 10);
  });
});

const loginWindow = modalArea.querySelector(".login-window"),
  signupWindow = modalArea.querySelector(".signup-window");

const btnToSignup = loginWindow.querySelector(".login-footer"),
  btnToLogin = signupWindow.querySelector(".signup-footer");

btnToSignup.addEventListener("click", () => {
  smoothRemove(loginWindow, 240);
  smoothActivation(signupWindow, 240);
});

btnToLogin.addEventListener("click", () => {
  smoothRemove(signupWindow, 240);
  smoothActivation(loginWindow, 240);
});

export function smoothRemove(e, pause) {
  e.style.opacity = 0;
  setTimeout(() => {
    e.classList.remove("active");
  }, pause);
}

export function smoothActivation(e, pause) {
  e.style.opacity = 1;
  setTimeout(() => {
    e.classList.add("active");
  }, pause);
}
