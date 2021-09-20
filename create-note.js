let notes = document.querySelector(".notes-wrapper");
let noteLableInput = document.querySelector("input");
let noteTextInput = document.querySelector("textarea");
let createBtn = document.querySelector(".btn-create");

console.log(noteTextInput.value);

createBtn.addEventListener("click", () => {
  let note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `<i class="fas fa-times-circle"></i>
    <h3>${noteLableInput.value}</h3>
    <p>${noteTextInput.value.replace(/\n\r?/g, "<br />")}</p>`;
  notes.append(note);
});

notes.onclick = function (event) {
  let target = event.target;

  if (target.tagName != "I") return;
  target.parentNode.style.opacity = 0.5;
  setTimeout(() => {
    target.parentNode.remove();
  }, 80);
};
