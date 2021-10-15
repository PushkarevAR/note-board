import "../style/authentication.css";
import "../style/base.css";
import "../style/header.css";
import "../style/hovers.css";
import "../style/main.css";
import "../style/note.css";

import "./appearance";

import Sortable from "sortablejs";

import {
  validated, // -
  resizeInput, // -
  showWindow, // -

  clearNoteInput, // +
  colorFocus, // +
  smoothActivation, // +
  hideModal, // +
} from "./additional";

import * as fb from "./firebase-iteraction";

// Search for local notes on reload
window.onload = () => {
  if (JSON.parse(localStorage.getItem("note") || "[]").slice().length > 0) {
    fb.showLocalNotes(fb.getAllLocalNotes());
  }
};

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

// Swith from login to Signup
const btnToSignup = document.querySelector(".login-footer");
btnToSignup.addEventListener("click", () => showWindow("signup"));

const btnToLogin = document.querySelector(".signup-footer");
btnToLogin.addEventListener("click", () => showWindow("login"));

// SignUp with FireBase
const signupForm = document.querySelector(".signup-form");
signupForm.addEventListener("submit", fb.signIn);

// LoginIn with FireBase
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", fb.loginIn);

// LogOut with FireBase
const logout = document.querySelector(".btn-login-out");
logout.addEventListener("click", fb.logout);

// Focus on note input section by intro btn
document
  .querySelector(".intro-text")
  .querySelector(".btn-create-note").onclick = () => {
  colorFocus(document.querySelector("#note-title"), "#6FC297");
};

// Add notes from imput section via btn
const btnAddNote = document.querySelector(".btn-add-note");
btnAddNote.addEventListener("click", fb.addNote);

// Listening FB on auth changes
fb.authListener();

// Clear Note imput by btn
const closeNoteInput = document.querySelector("#btn-close-input");
closeNoteInput.addEventListener("click", clearNoteInput);

// Delete Note by btn
const notesArea = document.querySelector(".notes-wrapper");
notesArea.addEventListener("click", fb.deleteNote);

// Note input length validation
const noteTextInput = document.querySelector("#note-text");
noteTextInput.addEventListener("keyup", (e) => {
  validated(e.target);
  resizeInput(e.target);
});

noteTextInput.addEventListener("keydown", (e) => validated(e.target));

const btnClearBoard = document.querySelector(".btn-clear-board");
btnClearBoard.addEventListener("click", fb.clearNoteBoard);

Sortable.create(notesArea, { animation: 150 });
