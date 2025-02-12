import "./Components/button-primary.js";
import "./Components/button-secondary.js";
import "./Components/modal-container.js";
import "./Components/notes/notes-group.js";
import "./Components/notes/notes-navigation.js";
import "./Components/navbar.js";
import Api from "./datas/Api.js";

import "../css/index.css";

document.addEventListener("DOMContentLoaded", async () => {
  let filterNotes = "all";

  renderAllNotes(filterNotes);

  document.addEventListener("add-notes", async (e) => {
    const newNotes = e.detail.notes;
    storeNotesHandler(newNotes);
    renderAllNotes(filterNotes);
  });

  document.addEventListener("archieve-notes", (e) => {
    const id = e.detail.id;
    const value = e.detail.value;

    archiveNotesHandler(id, value);

    renderAllNotes(filterNotes);
  });

  document.addEventListener("filter", (e) => {
    const filter = e.detail.filter;
    filterNotes = filter;
    renderAllNotes(filterNotes);
  });
});

const renderAllNotes = async (filter) => {
  const notesGroup = document.querySelector("notes-group");
  const api = new Api();

  if (filter === "all") {
    notesGroup.setNotes(await api.getAllUnarchivedNotes());
  } else if (filter === "archived") {
    notesGroup.setNotes(await api.getAllArchivedNotes());
  }
};

const storeNotesHandler = async (notes) => {
  const api = new Api();
  const res = await api.storeNotes(notes);

  console.log(res);
};

const archiveNotesHandler = async (id, value) => {
  const api = new Api();
  let res;
  if (value) {
    res = await api.archieveNotes(id);
  } else {
    res = await api.unArchieveNotes(id);
  }
};
