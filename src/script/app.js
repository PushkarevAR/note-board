const introArea = document.querySelector(".intro"),
  introNoteArea = introArea.querySelector(".note-input"),
  noteTitleInput = introNoteArea.querySelector("input"),
  noteTextInput = introNoteArea.querySelector("textarea"),
  btnAddNote = introNoteArea.querySelector("button"),
  closeNoteInput = introNoteArea.querySelector("i"),
  inputLengthCounter = introNoteArea.querySelector("span"),
  notesArea = document.querySelector(".notes-wrapper");

// Focus on Mote input section by intro btn
document.querySelector(".intro-text").querySelector("button").onclick = () => {
  noteTitleInput.focus();
};

// Clear Note input by cross icon
closeNoteInput.addEventListener("click", clearNoteInput);

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
// Note input validation
noteTextInput.addEventListener("keyup", (e) => {
  validated(e.target);

  noteTextInput.style.height = "120px"; // Resize noteTextArea
  let scHeight = e.target.scrollHeight;
  if (scHeight > 120) noteTextInput.style.height = `${scHeight}px`;
});

noteTextInput.addEventListener("keydown", (e) => validated(e.target));

function validated(input) {
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

// Add note by btn "Add note"
btnAddNote.addEventListener("click", () => {
  if (isInputEmpty(noteTitleInput) || isInputEmpty(noteTextInput)) return;

  if (!notesArea.querySelector(".note")) {
    // move intro on top
    introArea.style.marginTop = "100px";
    notesArea.style.visibility = "visible";
  }

  renderNotes();
  clearNoteInput();
});

function renderNotes() {
  let note = document.createElement("div");

  note.classList.add("note");
  note.innerHTML = `<i class="fas fa-times-circle"></i>
    <h3>${noteTitleInput.value}</h3>
    <p>${noteTextInput.value.replace(/\n\r?/g, "<br />")}</p>`;

  notesArea.append(note);
}

function isInputEmpty(input) {
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

// delete notes and hide notesArea if there r no notes at all
notesArea.addEventListener("click", function (event) {
  let target = event.target;

  if (target.tagName != "I") return; // out if click not on close btn

  target.parentNode.style.opacity = 0.5; // just to make it smoothe
  
  setTimeout(() => {
    target.parentNode.remove();

    if (!notesArea.querySelector(".note")) { // if there r no notes at all -> move intro
      introArea.style.marginTop = "20%";
      notesArea.style.visibility = "hidden";
    }
  }, 80);
});

Sortable.create(notesArea, { //making notes draggble xD
  animation: 150,
});

export { isInputEmpty };