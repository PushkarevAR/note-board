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

import {
  clearNoteInput,
  validated,
} from "./additional";

import { clearNoteBoard } from "./firebase-iteraction";

// Focus on note input section by intro btn
document
  .querySelector(".intro-text")
  .querySelector(".btn-create-note").onclick = () => {
  document.querySelector("#note-title").focus();
};

const notesArea = document.querySelector(".notes-wrapper");
// Clear Note input by btn
const closeNoteInput = document.querySelector("#btn-close-input");
closeNoteInput.addEventListener("click", clearNoteInput);

// Note input length validation
const noteTextInput = document.querySelector("#note-text");
noteTextInput.addEventListener("keyup", (e) => {
  validated(e.target);

  noteTextInput.style.height = "120px"; // Resize noteTextArea
  let scHeight = e.target.scrollHeight;
  if (scHeight > 120) noteTextInput.style.height = `${scHeight}px`;
});
noteTextInput.addEventListener("keydown", (e) => validated(e.target));

// Delete all notes by btn
const btnClearBoard = document.querySelector(".btn-clear-board");
btnClearBoard.addEventListener("click", clearNoteBoard);

Sortable.create(notesArea, { animation: 150 });