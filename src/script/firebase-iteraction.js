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

export let isLogined = false;
export let currentUserUid; // IMHO: looks like shit, but works

// Signup
const signupForm = document.querySelector(".signup-form");
const loginForm = document.querySelector(".login-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-pass"].value;

  // sign up the user
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      hideModal();
      // clearNoteBoard();

      signupForm.reset();
      loginForm.reset();
      document.querySelector(".btn-login").classList.remove("active");
      smoothActivation(document.querySelector(".btn-login-out"), 240);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(
        `Create User Error code: ${errorCode} with msg: ${errorMessage}`
      );
    });
});
// login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-pass"].value;

  // log the user in
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      hideModal();
      // clearNoteBoard();

      loginForm.reset();
      signupForm.reset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(
        `Login in Error code: ${errorCode} with msg: ${errorMessage}`
      );
    });
});

// logout
const logout = document.querySelector(".btn-login-out");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  // clearNoteBoard();

  signOut(auth).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`LogOut Error code: ${errorCode} with msg: ${errorMessage}`);
  });
});

const btnAddNote = document.querySelector(".btn-add-note");
btnAddNote.addEventListener("click", (e) => {
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
    // move inmput to local storage
    const LocalNoteId = Date.now();
    addNooteToLocalStorage(LocalNoteId, noteTitle.value, noteText.value);
  }
  clearNoteInput();
});

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
onAuthStateChanged(auth, (user) => {
  try {
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
  } catch (error) {
    // Here i've got an error every time and there are nothing i can do
    // Google says that i can safely ignore it, i guess OK 0_o
    // and this catch won't get it kekw
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(
      `Error in onAuthStateChanged code: ${errorCode} with msg: ${errorMessage}`
    );
  }
});

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

const notesArea = document.querySelector(".notes-wrapper");

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
    moveIntroSection("down");
  } else {
    // Show info notification
    let notification = document.createElement("p");
    notification.textContent = "There are no notes on the board!";
    notification.classList.add("notification");

    document.querySelector(".btn-clear-board").after(notification);

    setTimeout(() => notification.remove(), 1000);
  }
}

// Delete notes by btn
notesArea.addEventListener("click", function (event) {
  let target = event.target;
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

  target.parentNode.style.opacity = 0.5; // just to make it smoothe
  setTimeout(() => {
    note.remove();
    if (!notesArea.querySelector(".note")) {
      moveIntroSection("down");
    }
  }, 80);
});
