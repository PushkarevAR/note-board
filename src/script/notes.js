const notesArea = document.querySelector(".notes-wrapper");

export class Note {
  static create(note) {
    return fetch(
      "https://note-board-6ed1f-default-rtdb.europe-west1.firebasedatabase.app/notes.json",
      {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        note.id = response.name;
        return note;
      })
      .then(addToLocalStorage)
      .then(Note.renderNotes);
  }

  static renderNotes() {
    const notes = getNotesFromLocalStorage();
    const html = notes.length
    ? notes.map(toNote).join(" ")
    : "[]";

    notesArea.innerHTML = html;
  }
}

function addToLocalStorage(note) {
  const all = getNotesFromLocalStorage();
  console.log(all);
  all.push(note);
  localStorage.setItem("note", JSON.stringify(all));
}

function getNotesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("note") || "[]");
}

function toNote(note) {
  return `<div class="note"><i class="fas fa-times-circle"></i>
  <h3>${note.title}</h3>
  <p>${note.text.replace(/\n\r?/g, "<br />")}</p></div>`;
}
