import "../style/authentication.css";
import "../style/base.css";
import "../style/header.css";
import "../style/hovers.css";
import "../style/main.css";
import "../style/note.css";

import "./appearance";
import "./authentication";

import { Note } from "./notes";
import Sortable from "sortablejs";

const introArea = document.querySelector(".intro"),
  introNoteArea = introArea.querySelector(".note-input"),
  noteTitleInput = introNoteArea.querySelector("input"),
  noteTextInput = introNoteArea.querySelector("textarea"),
  btnAddNote = introNoteArea.querySelector("button"),
  closeNoteInput = introNoteArea.querySelector("i"),
  inputLengthCounter = introNoteArea.querySelector("span"),
  notesArea = document.querySelector(".notes-wrapper");

// Focus on Mote input section by intro btn
document
  .querySelector(".intro-text")
  .querySelector(".btn-create-note").onclick = () => {
  noteTitleInput.focus();
};

// Load notes from Local Storage
// window.addEventListener("load", Note.renderNotes);

// Clear Note input by cross icon
closeNoteInput.addEventListener("click", clearNoteInput);

// Note input validation
noteTextInput.addEventListener("keyup", (e) => {
  validated(e.target);

  noteTextInput.style.height = "120px"; // Resize noteTextArea
  let scHeight = e.target.scrollHeight;
  if (scHeight > 120) noteTextInput.style.height = `${scHeight}px`;
});

noteTextInput.addEventListener("keydown", (e) => validated(e.target));

// Add note by btn "Add note"
btnAddNote.addEventListener("click", () => {
  if (isInputEmpty(noteTitleInput) || isInputEmpty(noteTextInput)) return;

  if (!notesArea.querySelector(".note")) {
    // move intro on top
    introArea.style.marginTop = "100px";
    notesArea.style.visibility = "visible";
  }

  renderNotesServer();
});

// delete notes and hide notesArea if there r no notes at all
notesArea.addEventListener("click", function (event) {
  let target = event.target;

  if (target.tagName != "I") return; // out if click not on close btn

  target.parentNode.style.opacity = 0.5; // just to make it smoothe

  setTimeout(() => {
    target.parentNode.remove();
    // if there r no notes at all -> move intro
    if (!notesArea.querySelector(".note")) moveIntroSection();
  }, 80);
});

Sortable.create(notesArea, {
  //making notes draggble xD
  animation: 150,
});

const btnClearBoard = introArea.querySelector(".btn-clear-board");

btnClearBoard.addEventListener("click", clearNoteBoard);

function moveIntroSection() {
  //function moves intro section
  introArea.style.marginTop = "20%";
  notesArea.style.visibility = "hidden";
}

function validated(input) {
  //function validate input length
  const inputLimit = 100,
    inputLength = input.value.length;

  if (inputLength != 0) {
    inputLengthCounter.style.visibility = "visible";
    inputLengthCounter.textContent = inputLimit - inputLength;

    if (inputLength <= inputLimit) {
      btnAddNote.disabled = false;
      inputLengthCounter.style.color = "var(--color)";
    } else {
      btnAddNote.disabled = true;
      inputLengthCounter.style.color = "var(--error)";
    }
  } else {
    btnAddNote.disabled = false;
    inputLengthCounter.style.color = "var(--color)";
    inputLengthCounter.style.visibility = "hidden";
  }
}

function renderNotesServer() {
  const note = {
    title: noteTitleInput.value,
    text: noteTextInput.value,
  };

  Note.create(note).then(() => {
    clearNoteInput();
  });
  //Asinc request to server to save note
}

function isInputEmpty(input) {
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

function clearNoteInput() {
  // function clears .note-input
  noteTextInput.value = "";
  noteTitleInput.value = "";
  noteTextInput.placeholder = "Note";
  noteTitleInput.placeholder = "Title";
  noteTextInput.style.height = "120px";
  inputLengthCounter.style.color = "var(--color)";
  inputLengthCounter.style.visibility = "hidden";
}

function clearNoteBoard() {
  //fuction clear section notes-wrapper
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

export { isInputEmpty };
