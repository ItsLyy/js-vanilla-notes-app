import "./Components/button-primary.js";
import "./Components/button-secondary.js";
import "./Components/modal-container.js";
import "./Components/notes/notes-group.js";
import "./Components/notes/notes-navigation.js";
import "./Components/navbar.js";
import Api from "./datas/Api.js";

import "../css/index.css";
import Swal from "sweetalert2";

document.addEventListener("DOMContentLoaded", async () => {
  let filterNotes = "all";

  renderAllNotes(filterNotes);

  document.addEventListener("add-notes", async (e) => {
    const newNotes = e.detail.notes;

    await storeNotesHandler(newNotes);
    renderAllNotes(filterNotes);
  });

  document.addEventListener("archieve-notes", async (e) => {
    const id = e.detail.id;
    const value = e.detail.value;

    await archiveNotesHandler(id, value);
    renderAllNotes(filterNotes);
  });

  document.addEventListener("filter", (e) => {
    const filter = e.detail.filter;
    filterNotes = filter;
    renderAllNotes(filterNotes);
  });

  document.addEventListener("delete-notes", async (e) => {
    const id = e.detail.id;
    await deleteNotesHandler(id);
    renderAllNotes(filterNotes);
  });
});

const renderAllNotes = async (filter) => {
  const notesGroup = document.querySelector("notes-group");
  notesGroup.setNotes(null);
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

  if (res.status === "success") {
    alertSuccess("Notes Created", res.message);
  } else if (res.status === "fail") {
    alertError("Notes Issue", res.message);
  }
};

const archiveNotesHandler = async (id, value) => {
  const api = new Api();
  let res;
  if (value) {
    res = await api.archieveNotes(id);
  } else {
    res = await api.unArchieveNotes(id);
  }

  if (res.status === "fail") {
    alertError("Notes Issue", res.message);
  }
};

const deleteNotesHandler = async (id) => {
  const api = new Api();
  const res = await api.deleteNoteById(id);

  if (res.status === "success") {
    alertSuccess("Notes Deleted", res.message);
  } else if (res.status === "fail") {
    alertError("Notes Issue", res.message);
  }
};

const alertSuccess = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: "success",
  });
};

const alertError = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: "error",
  });
};
