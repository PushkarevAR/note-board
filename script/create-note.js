const introNoteArea = document.querySelector(".note-input"),
  noteTitleInput = introNoteArea.querySelector("input"),
  noteTextInput = document.querySelector("textarea"),
  btnAddNote = introNoteArea.querySelector("button"),
  mainArea = document.querySelector(".intro"),
  notesArea = document.querySelector(".notes-wrapper"),
  closeNoteInput = mainArea.querySelector("i"),
  inputLengthCounter = introNoteArea.querySelector("span");

// Focus on InputNote section by intro btn
document.querySelector(".intro-text").querySelector("button").onclick = () => {
  noteTitleInput.focus();
};

// Clear InputNote by cross icon
closeNoteInput.onclick = () => clearNoteInput();

function clearNoteInput() {
  noteTextInput.value = "";
  noteTitleInput.value = "";

  noteTextInput.placeholder = "Note";
  noteTitleInput.placeholder = "Title";

  noteTextInput.style.height = "120px";

  inputLengthCounter.style.color = "var(--main)";
  inputLengthCounter.style.visibility = "hidden";
}
//InputNote validation
noteTextInput.onkeyup = (e) => {
  let element = e.target;
  validated(element);

  // Resize noteTextArea
  noteTextInput.style.height = "120px";
  let scHeight = e.target.scrollHeight;
  if (scHeight > 120) noteTextInput.style.height = `${scHeight}px`;
};

noteTextInput.onkeydown = (e) => {
  let element = e.target;
  validated(element);
};

function validated(input) {
  const inputLimit = 100,
    inputLength = input.value.length;

  if (inputLength != 0) {
    inputLengthCounter.style.visibility = "visible";
    inputLengthCounter.textContent = inputLimit - inputLength;

    if (inputLength <= inputLimit) {
      btnAddNote.disabled = false;
      inputLengthCounter.style.color = "var(--main)";
    } else {
      btnAddNote.disabled = true;
      inputLengthCounter.style.color = "rgb(235, 121, 121)";
    }
  } else {
    btnAddNote.disabled = false;
    inputLengthCounter.style.color = "var(--main)";
    inputLengthCounter.style.visibility = "hidden";
  }
}

// Add note by btn "Add note"
btnAddNote.onclick = () => {
  if (isInputEmpty(noteTitleInput) || isInputEmpty(noteTextInput)) return;

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
  clearNoteInput();
};

function isInputEmpty(input) {
  if (input.value == "") {
    input.style.backgroundColor = "rgb(235, 121, 121)";
    input.style.transform = "rotate(0.5deg) scale(1.1) translateY(2px)";
    input.placeholder = "Type something here...";

    setTimeout(() => {
      input.style.backgroundColor = "var(--white";
      input.style.transform = "none";
    }, 100);
    input.focus();
    return true;
  } else return false;
}

// delete notes and hide notesArea if there r no notes at all
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

Sortable.create(notesArea, {
  animation: 150,
});

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
