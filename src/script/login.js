const modal = document.querySelector(".modal"),
  authArea = modal.querySelector(".auth"),
  authTitle = authArea.querySelector("h3"),
  authTextTop = authArea.querySelectorAll("p")[0],
  authTextBottom = authArea.querySelectorAll("p")[1],
  btnLogin = authArea.querySelector("button"),
  btnLoginHeader = document.querySelector(".btn-login"),
  btnClose = authArea.querySelector("i"),
  btnReg = authArea.querySelector("a");

btnLoginHeader.addEventListener("click", () => {
  clearModal();
  modal.classList.add("modal-active");
});

btnClose.addEventListener("click", () => {
  clearModal();
  modal.classList.remove("modal-active");
});

btnReg.addEventListener("click", () => {
    console.log("shi");
  authTitle.innerHTML = `Wellcome the new<span>One</span>`;
  authTextTop.textContent = "You are one stem away from your new Noat Board";
  authTextBottom.innerHTML = `Can't wait to see your first note`;
  btnLogin.textContent = "Register";
});

function clearModal() {
  authTitle.innerHTML = `It's nice to see <span>You</span> back`;
  authTextTop.textContent = "And you are?";
  authTextBottom.innerHTML = `Not registered yet? <a href="#">Join us now!</a>`;
  btnLogin.textContent = "Login";
}
