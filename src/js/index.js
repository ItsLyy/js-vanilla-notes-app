import "./Components/button-primary.js";
import "./Components/button-secondary.js";
import "./Components/modal-container.js";
import "./Components/modals/modal-wrapper.js";
import "./Components/modals/modal-add-notes.js";
import "./Components/modals/modal-detail-notes.js";
import "./Components/notes/notes-item.js";
import "./Components/notes/notes-add.js";
import "./Components/notes/notes-group.js";
import "./Components/notes/notes-detail.js";
import "./Components/notes/notes-navigation.js";
import "./Components/navbar.js";
import notes from "./datas/notes.js";

document.addEventListener("DOMContentLoaded", () => {
  const notesGroup = document.querySelector("notes-group");
  notesGroup.setNotes(notes);
});
