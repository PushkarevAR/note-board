export function isInputEmpty(input) {
  //function flash empty input with red color
  if (input.value == "") {
    colorFocus(input, "var(--error)");
    return true;
  } else return false;
}

export function colorFocus(input, color) {
  input.style.backgroundColor = color;
  input.style.transform = "rotate(0.5deg) scale(1.1) translateY(2px)";

  setTimeout(() => {
    input.style.backgroundColor = "var(--white)";
    input.style.transform = "none";
  }, 100);
  input.focus();
}

export function clearNoteInput() {
  const Title = document.querySelector("#note-title");
  const Content = document.querySelector("#note-text");
  const Counter = document.querySelector(".input-length");

  Content.value = "";
  Title.value = "";
  Content.placeholder = "Note";
  Title.placeholder = "Title";
  Content.style.height = "120px";
  Counter.style.color = "var(--color)";
  Counter.style.visibility = "hidden";
}

export function smoothActivation(e, delay) {
  e.style.opacity = 1;
  setTimeout(() => {
    e.classList.add("active");
  }, delay);
}

export function moveIntroSection(direction) {
  if (direction == "down") {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (vw > 600) document.querySelector(".intro").style.marginTop = "20%";
    document.querySelector(".notes-wrapper").style.visibility = "hidden";
  } else if (direction == "top") {
    document.querySelector(".intro").style.marginTop = "100px";
    document.querySelector(".notes-wrapper").style.visibility = "visible";
  } else console.log("wrong direction parametr in moveIntroSection fn");
}

export function validated(input) {
  const counter = document.querySelector(".input-length");
  const btn = document.querySelector(".btn-add-note");
  const inputLimit = 300;
  const inputLength = input.value.length;

  if (inputLength != 0) {
    counter.style.visibility = "visible";
    counter.textContent = inputLimit - inputLength;

    if (inputLength <= inputLimit) {
      btn.disabled = false;
      btn.style.opacity = 1;
      counter.style.color = "var(--color)";
    } else {
      btn.disabled = true;
      btn.style.opacity = 0.75;
      counter.style.color = "var(--error)";
    }
  } else {
    btn.disabled = false;
    btn.style.opacity = 1;
    counter.style.color = "var(--color)";
    counter.style.visibility = "hidden";
  }
}

export function actionNotification(msg, showTime = 1000) {
  let notification = document.createElement("p");
  notification.textContent = msg;
  notification.classList.add("notification");
  document.querySelector(".btn-clear-board").after(notification);
  setTimeout(() => notification.remove(), showTime);
}

export function modalNotification(msg, showTime = 1000) {
  const modalFooter = document.querySelector(".modal-footer");
  modalFooter.textContent = msg;
  setTimeout(() => {
    modalFooter.textContent =
      "You better do not forget your password, because there are no reset function for it. x0x0";
  }, showTime);
}

export function resizeInput(input) {
  input.style.height = "120px";
  let scHeight = input.scrollHeight;
  if (scHeight > 120) input.style.height = `${scHeight}px`;
}

export function hideModal() {
  document.querySelector(".modal").classList.remove("active");
}

export function showWindow(window) {
  const loginWindow = document.querySelector(".login-window");
  const signupWindow = document.querySelector(".signup-window");

  if (window == "login") {
    signupWindow.classList.remove("active");
    smoothActivation(loginWindow, 360);
  } else {
    loginWindow.classList.remove("active");
    smoothActivation(signupWindow, 360);
  }
}