import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  getDocs,
  collection,
  doc,
  onSnapshot,
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
  clearNoteBoard,
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

// Signup
const signupForm = document.querySelector(".signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-pass"].value;

  // sign up the user
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      //   const user = userCredential.user;

      hideModal();
      signupForm.reset();
      document.querySelector(".btn-login").classList.remove("active");
      smoothActivation(document.querySelector(".btn-login-out"), 240);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error code: ${errorCode} with msg: ${errorMessage}`);
    });
});

// logout
const logout = document.querySelector(".btn-login-out");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  clearNoteBoard();
  signOut(auth).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`Error code: ${errorCode} with msg: ${errorMessage}`);
  });
});

// login
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-pass"].value;

  // log the user in
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      hideModal();
      loginForm.reset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error code: ${errorCode} with msg: ${errorMessage}`);
    });
});

const btnAddNote = document.querySelector(".btn-add-note");
btnAddNote.addEventListener("click", (e) => {
  e.preventDefault();
  const noteTitle = document.querySelector("#note-title"),
    noteText = document.querySelector("#note-text");

  if (isInputEmpty(noteTitle) || isInputEmpty(noteText)) return;

  addDoc(collection(db, "notes"), {
    title: noteTitle.value,
    content: noteText.value,
  })
    .then(() => clearNoteInput())
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error code: ${errorCode} with msg: ${errorMessage}`);
      // move inmput to local storage
      addNooteToLocalStorage(noteTitle.value, noteText.value);
    });
});

function addNooteToLocalStorage(title, content) {
  const allNotes = getAllLocalNotes();
  const note = {
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
onAuthStateChanged(auth, (user) => {
  if (user) {
    onSnapshot(
      collection(db, "notes"),
      (snapshot) => {
        setupNotesServer(snapshot.docs);
        setupUI(user);
      },
      (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error code: ${errorCode} with msg: ${errorMessage}`);
      }
    );
  } else {
    setupUI();
  }
});

const accountInfo = document.querySelector(".account-info"),
  accountInfoEmail = accountInfo.querySelector(".account-info-email");

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

const notesArea = document.querySelector(".notes-wrapper");

function setupNotesServer(data) {
  if (data.length) {
    let html = "";

    moveIntroSection("top");
    data.forEach((doc) => {
      const note = doc.data();
      const div = `
      <div class="note">
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
  let html = "";

  moveIntroSection("top");
  notes.map((note) => {
    console.log(note);
    const div = `
    <div class="note">
      <i class="fas fa-times-circle"></i>
      <h3>${note.title}</h3>
      <p>${note.content.replace(/\n\r?/g, "<br />")}</p>
    </div>`;
    html += div;
    console.log(html);
  });
  notesArea.innerHTML = html;
}
