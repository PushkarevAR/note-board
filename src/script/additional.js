export function isInputEmpty(input) {
  //function flash empty input with red color
  if (input.value == "") {
    input.style.backgroundColor = "var(--error)";
    input.style.transform = "rotate(0.5deg) scale(1.1) translateY(2px)";
    input.placeholder = "Type something here...";

    setTimeout(() => {
      input.style.backgroundColor = "var(--white)";
      input.style.transform = "none";
    }, 100);
    input.focus();
    return true;
  } else return false;
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
    document.querySelector(".intro").style.marginTop = "20%";
    document.querySelector(".notes-wrapper").style.visibility = "hidden";
  } else if (direction == "top") {
    document.querySelector(".intro").style.marginTop = "100px";
    document.querySelector(".notes-wrapper").style.visibility = "visible";
  } else console.log("wrong direction parametr in moveIntroSection fn");
}

export function validated(input) {
  const Counter = document.querySelector(".input-length");
  const btn = document.querySelector(".btn-add-note");
  const inputLimit = 100;
  const inputLength = input.value.length;

  if (inputLength != 0) {
    Counter.style.visibility = "visible";
    Counter.textContent = inputLimit - inputLength;

    if (inputLength <= inputLimit) {
      btn.disabled = false;
      Counter.style.color = "var(--color)";
    } else {
      btn.disabled = true;
      Counter.style.color = "var(--error)";
    }
  } else {
    btn.disabled = false;
    Counter.style.color = "var(--color)";
    Counter.style.visibility = "hidden";
  }
}
