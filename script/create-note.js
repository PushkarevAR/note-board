const introTextArea = document.querySelector(".intro-text"),
  introNoteArea = document.querySelector(".note-input"),
  noteTitleInput = introNoteArea.querySelector("input");

introTextArea.querySelector("button").onclick = () => {
  noteTitleInput.focus();
};

const notesArea = document.querySelector(".notes-wrapper"),
  noteTextInput = document.querySelector("textarea"),
  btnAddNote = introNoteArea.querySelector("button"),
  mainArea = document.querySelector(".intro");

btnAddNote.addEventListener("click", () => {
  if (!notesArea.querySelector(".note")) {
    mainArea.style.marginTop = "60px";
    notesArea.style.visibility = "visible";
  }

  let note = document.createElement("div");

  note.classList.add("note");
  note.innerHTML = `<i class="fas fa-times-circle"></i>
    <h3>${noteTitleInput.value}</h3>
    <p>${noteTextInput.value.replace(/\n\r?/g, "<br />")}</p>`;

  notesArea.append(note);
});

notesArea.onclick = function (event) {
  let target = event.target;

  if (target.tagName != "I") return;

  target.parentNode.style.opacity = 0.5;
  setTimeout(() => {
    target.parentNode.remove();

    if (!notesArea.querySelector(".note")) {
      mainArea.style.marginTop = "20%";
      notesArea.style.visibility = "hidden";
    }
  }, 80);
};

function clearNoteInput() {
  noteTextInput.value = "";
  noteTitleInput.value = "";
}

const closeNoteInput = mainArea.querySelector("i");

closeNoteInput.addEventListener("click", () => clearNoteInput());
// Drag 'n drop

// const dropArea = document.querySelector(".drag-n-drop"),
//   dragText = dropArea.querySelector("h3"),
//   btnBrowse = dropArea.querySelector("button"),
//   input = dropArea.querySelector("input");

// let file;

// btnBrowse.onclick = () => input.click();

// input.addEventListener("change", function () {
//   file = this.files[0];
//   dropArea.classList.add("active");
//   showFile();
// });

// dropArea.addEventListener("dragover", (event) => {
//   event.preventDefault();
//   dropArea.classList.add("active");
//   dragText.textContent = "Release to Upload File";
// });

// dropArea.addEventListener("dragleave", () => {
//   dropArea.classList.remove("active");
//   dragText.textContent = "Drag & Drop to Upload File";
// });

// dropArea.addEventListener("drop", (event) => {
//   event.preventDefault();
//   file = event.dataTransfer.files[0];
//   showFile();
// });

// function showFile() {
//   let fileType = file.type; //getting selected file type
//   let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
//   if (validExtensions.includes(fileType)) {
//     //if user selected file is an image file
//     let fileReader = new FileReader(); //creating new FileReader object
//     fileReader.onload = () => {
//       let fileURL = fileReader.result; //passing user file source in fileURL variable
//       // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
//       let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
//       dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
//     };
//     fileReader.readAsDataURL(file);
//   } else {
//     alert("This is not an Image File!");
//     dropArea.classList.remove("active");
//     dragText.textContent = "Drag & Drop to Upload File";
//   }
// }