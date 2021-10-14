import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  doc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { hideModal } from "./authentication.js";
import {
  isInputEmpty,
  clearNoteInput,
  smoothActivation,
  moveIntroSection,
  actionNotification,
  colorFocus,
  modalNotification,
} from "./additional.js";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAdn6Xe409XU2PXWREqWY-WZ1Q53rGWH3U",
  authDomain: "note-board-6ed1f.firebaseapp.com",
  databaseURL:
    "https://note-board-6ed1f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "note-board-6ed1f",
  storageBucket: "note-board-6ed1f.appspot.com",
  messagingSenderId: "226607047638",
  appId: "1:226607047638:web:ff6ad7ee011b505fe6ba77",
});

const db = getFirestore(firebaseApp);
const auth = getAuth();

export let isLogined = false; // IMHO: looks like shit, but works
export let currentUserUid;

const notesArea = document.querySelector(".notes-wrapper");
const signupForm = document.querySelector(".signup-form");
const loginForm = document.querySelector(".login-form");

window.onload = () => {
  if (JSON.parse(localStorage.getItem("note") || "[]").slice().length > 0) {
    showLocalNotes(getAllLocalNotes());
  }
};
// Signup
signupForm.addEventListener("submit", signIn);
export function signIn(e) {
  e.preventDefault();
  if (
    isInputEmpty(signupForm["signup-email"]) ||
    isInputEmpty(signupForm["signup-pass"])
  )
    return;
  // get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-pass"].value;

  // sign up the user
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      hideModal();
      signupForm.reset();
      loginForm.reset();
      document.querySelector(".btn-login").classList.remove("active");
      smoothActivation(document.querySelector(".btn-login-out"), 240);
    })
    .catch((error) => {
      signupForm.reset();
      colorFocus(loginForm["login-email"], "var(--error)");
      colorFocus(loginForm["login-pass"], "var(--error)");

      const errorCode = error.code;
      const errorMessage = error.message;
      modalNotification(errorMessage, 6000);
      console.log(
        `Create User Error code: ${errorCode} with msg: ${errorMessage}`
      );
    });
}

// login
loginForm.addEventListener("submit", loginIn);
export function loginIn(e) {
  e.preventDefault();
  if (
    isInputEmpty(loginForm["login-email"]) ||
    isInputEmpty(loginForm["login-pass"])
  )
    return;
  // get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-pass"].value;

  // log the user in
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      hideModal();
      loginForm.reset();
      signupForm.reset();
    })
    .catch((error) => {
      loginForm.reset();
      colorFocus(loginForm["login-email"], "var(--error)");
      colorFocus(loginForm["login-pass"], "var(--error)");
      modalNotification(
        "Incorrect login or password. You better do not forget your password)",
        6000
      );

      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(
        `Login in Error code: ${errorCode} with msg: ${errorMessage}`
      );
    });
}

// logout
const logout = document.querySelector(".btn-login-out");
logout.addEventListener("click", logoutXXX);

export function logoutXXX(e) {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      notesArea.innerHTML = "";
      moveIntroSection("down");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`LogOut Error code: ${errorCode} with msg: ${errorMessage}`);
    });
}

const btnAddNote = document.querySelector(".btn-add-note");
btnAddNote.addEventListener("click", addNote);

export function addNote(e) {
  e.preventDefault();

  const noteTitle = document.querySelector("#note-title");
  const noteText = document.querySelector("#note-text");

  if (isInputEmpty(noteTitle) || isInputEmpty(noteText)) return;

  if (isLogined) {
    addDoc(collection(db, "users", `${currentUserUid}`, "notes"), {
      title: noteTitle.value,
      content: noteText.value,
    })
      .then(() => clearNoteInput())
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error code: ${errorCode} with msg: ${errorMessage}`);
      });
  } else {
    if (JSON.parse(localStorage.getItem("note") || "[]").slice().length < 5) {
      const LocalNoteId = Date.now();
      addNooteToLocalStorage(LocalNoteId, noteTitle.value, noteText.value);
    } else {
      actionNotification("Register to add more notes!", 3000);
    }
  }
  clearNoteInput();
}

function addNooteToLocalStorage(id, title, content) {
  const allNotes = getAllLocalNotes();
  const note = {
    id,
    title,
    content,
  };
  allNotes.push(note);
  localStorage.setItem("note", JSON.stringify(allNotes));

  showLocalNotes(allNotes);
}

function getAllLocalNotes() {
  return JSON.parse(localStorage.getItem("note") || "[]");
}

// listen for auth status changes
onAuthStateChanged(auth, fbListener);

export function fbListener(user) {
  if (user) {
    isLogined = true;
    onSnapshot(
      collection(db, "users", `${user.uid}`, "notes"),
      (snapshot) => {
        setupNotesServer(snapshot.docs);
        setupUI(user);
        currentUserUid = user.uid;
        console.log("User logined in: " + isLogined);
      },
      (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error code: ${errorCode} with msg: ${errorMessage}`);
      }
    );
  } else {
    isLogined = false;
    setupUI();
    console.log("User logined in: " + isLogined);
  }
}

const accountInfo = document.querySelector(".account-info");
const accountInfoEmail = accountInfo.querySelector(".account-info-email");

function setupUI(user) {
  if (user) {
    //show user info
    accountInfoEmail.innerHTML = `${user.email}`;
    smoothActivation(accountInfo, 120);

    // toggle user UI elements
    document.querySelector(".btn-login").classList.remove("active");
    smoothActivation(document.querySelector(".btn-login-out"), 240);
  } else {
    // hide user info
    accountInfo.classList.remove("active");

    // toggle user elements
    document.querySelector(".btn-login-out").classList.remove("active");
    smoothActivation(document.querySelector(".btn-login"), 240);
  }
}

function setupNotesServer(data) {
  if (data.length) {
    let html = "";

    moveIntroSection("top");
    data.forEach((doc) => {
      const note = doc.data();
      const div = `
      <div class="note" id="${doc.id}">
        <i class="fas fa-times-circle"></i>
        <h3>${note.title}</h3>
        <p>${note.content.replace(/\n\r?/g, "<br />")}</p>
      </div>`;
      html += div;
    });
    notesArea.innerHTML = html;
  }
}

function showLocalNotes(notes) {
  // clearNoteBoard();
  let html = "";

  moveIntroSection("top");
  notes.map((note) => {
    const div = `
    <div class="note" id="${note.id}">
      <i class="fas fa-times-circle"></i>
      <h3>${note.title}</h3>
      <p>${note.content.replace(/\n\r?/g, "<br />")}</p>
    </div>`;
    html += div;
  });
  notesArea.innerHTML = html;
}

export function clearNoteBoard() {
  if (notesArea.querySelector(".note")) {
    if (isLogined) {
      notesArea.querySelectorAll(".note").forEach((note) => {
        deleteDoc(doc(db, "users", currentUserUid, "notes", note.id))
          .then(() => {
            notesArea.innerHTML = "";
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Error code: ${errorCode} with msg: ${errorMessage}`);
          });
      });
    } else {
      localStorage.removeItem("note");
      notesArea.innerHTML = "";
    }
    actionNotification("You successfully delete all notes!");
    moveIntroSection("down");
  } else {
    actionNotification("There are no notes on the board!");
  }
}

// Delete notes by btn
notesArea.addEventListener("click", deleteNote);

export function deleteNote(e) {
  let target = e.target;
  if (target.tagName != "I") return; // kick out if click not on close btn

  const note = target.parentNode;

  if (isLogined) {
    deleteDoc(doc(db, "users", currentUserUid, "notes", note.id)).catch(
      (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error code: ${errorCode} with msg: ${errorMessage}`);
      }
    );
  } else {
    let localNotes = JSON.parse(localStorage.getItem("note") || "[]").slice();
    const index = localNotes.findIndex((x) => x.id == note.id);

    localNotes.splice(index, 1);
    localStorage.setItem("note", JSON.stringify(localNotes));
  }
  actionNotification("You successfully delete a note!");
  target.parentNode.style.opacity = 0.5; // just to make it smoothe
  setTimeout(() => {
    note.remove();
    if (!notesArea.querySelector(".note")) {
      moveIntroSection("down");
    }
  }, 80);
}
