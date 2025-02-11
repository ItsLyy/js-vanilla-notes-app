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

  let filterNotes = "all";

  document.addEventListener("add-notes", (e) => {
    const newNotes = e.detail.notes;
    notes.push(newNotes);
    renderNotes(filterNotes);
  });

  document.addEventListener("archieve-notes", (e) => {
    const id = e.detail.id;
    const value = e.detail.value;

    notes.find((note) => note.id === id).archived = value;
    renderNotes(filterNotes);
  });

  document.addEventListener("filter", (e) => {
    const filter = e.detail.filter;
    filterNotes = filter;
    renderNotes(filterNotes);
  });

  const renderNotes = (filter) => {
    if (filter === "all") {
      notesGroup.setNotes(notes.filter((note) => !note.archived));
    } else if (filter === "archived") {
      notesGroup.setNotes(notes.filter((note) => note.archived));
    }
  };
});
