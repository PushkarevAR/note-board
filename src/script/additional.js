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

export function clearNoteBoard() {
  const notesArea = document.querySelector(".notes-wrapper");
  const btnClearBoard = document.querySelector(".btn-clear-board");

  if (notesArea.querySelector(".note")) {
    notesArea.innerHTML = "";
    moveIntroSection();
  } else {
    let notification = document.createElement("p");
    notification.textContent = "There are no notes on the board!";
    notification.classList.add("notification");
    btnClearBoard.after(notification);

    setTimeout(() => notification.remove(), 1000);
  }
}

export function smoothActivation(e, delay) {
  e.style.opacity = 1;
  setTimeout(() => {
    e.classList.add("active");
  }, delay);
}
