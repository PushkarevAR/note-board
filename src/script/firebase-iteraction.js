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

import { hideModal,  } from "./authentication.js";
import { isInputEmpty, clearNoteInput, smoothActivation } from "./additional.js"

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

// Create new user with Sign Up form
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

// listen for auth status changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    onSnapshot(
      collection(db, "notes"),
      (snapshot) => {
        //   setupGuides(snapshot.docs);
        setupUI(user);
      },
      (err) => console.log("on logout error masg pff" + err.message)
    );
  } else {
    setupUI();
    //   setupGuides([]);
    console.log("no user here");
  }
});

const accountInfo = document.querySelector(".account-info"),
  accountInfoEmail = accountInfo.querySelector(".account-info-email");

const setupUI = (user) => {
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
};

const btnAddNote = document.querySelector(".btn-add-note"),
  notesArea = document.querySelector(".notes-wrapper");

btnAddNote.addEventListener("click", (e) => {
  e.preventDefault();

  const noteTitle = document.querySelector("#note-title"),
    noteText = document.querySelector("#note-text"),
    introArea = document.querySelector(".intro");

  if (isInputEmpty(noteTitle) || isInputEmpty(noteText)) return;

  if (!notesArea.querySelector(".note")) {
    // move intro on top
    introArea.style.marginTop = "100px";
    notesArea.style.visibility = "visible";
  }

  addDoc(collection(db, "notes"), {
    title: noteTitle.value,
    content: noteText.value,
  })
    .then(() => clearNoteInput());
    // .catch((err) => console.log(err.message));
});

// // DOM elements
// const guideList = document.querySelector(".guides");

// // setup guides
// const setupGuides = (data) => {
//   if (data.length) {
//     let html = "";

//     data.forEach((doc) => {
//       const guide = doc.data();
//       const li = `
//         <li>
//           <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
//           <div class="collapsible-body white"> ${guide.content} </div>
//         </li>
//       `;
//       html += li;
//     });
//     guideList.innerHTML = html;
//   } else
//     guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
// };
