class ModalDetailNote extends HTMLElement {
  constructor() {
    super();
    this._notes = {};
  }

  connectedCallback() {
    this.render();
  }

  setNotes(notes) {
    this._notes = notes;
    this.render();
  }

  render() {
    this.innerHTML = ``;
    const notesDetail = document.createElement("notes-detail");
    notesDetail.setNote(this._notes);
    const wrapper = document.createElement("modal-wrapper");
    wrapper.setContent(notesDetail);
    this.append(wrapper);
  }
}

customElements.define("modal-detail-notes", ModalDetailNote);
