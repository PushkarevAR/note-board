import "../style/authentication.css";
import "../style/base.css";
import "../style/header.css";
import "../style/hovers.css";
import "../style/main.css";
import "../style/note.css";

import "./appearance";
import "./authentication";
import "./firebase-iteraction";

import Sortable from "sortablejs";

import { clearNoteBoard, clearNoteInput } from "./additional";

// Focus on note input section by intro btn
document
  .querySelector(".intro-text")
  .querySelector(".btn-create-note").onclick = () => {
  document.querySelector("#note-title").focus();
};

// Clear Note input by btn
const closeNoteInput = document.querySelector("#btn-close-input");
closeNoteInput.addEventListener("click", clearNoteInput);

// Nine input length validation
const noteTextInput = document.querySelector("#note-text");
noteTextInput.addEventListener("keyup", (e) => {
  validated(e.target);

  noteTextInput.style.height = "120px"; // Resize noteTextArea
  let scHeight = e.target.scrollHeight;
  if (scHeight > 120) noteTextInput.style.height = `${scHeight}px`;
});
noteTextInput.addEventListener("keydown", (e) => validated(e.target));

// Delete notes by btn
const notesArea = document.querySelector(".notes-wrapper");
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

// Delete all notes by btn
const btnClearBoard = document.querySelector(".btn-clear-board");
btnClearBoard.addEventListener("click", clearNoteBoard);

function moveIntroSection() {
  document.querySelector(".intro").style.marginTop = "20%";
  document.querySelector(".notes-wrapper").style.visibility = "hidden";
}

function validated(input) {
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

Sortable.create(notesArea, { animation: 150 });