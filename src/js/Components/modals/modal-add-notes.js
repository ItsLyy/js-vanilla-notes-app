class ModalAddNote extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = ``;
    const notesForm = document.createElement("notes-add");
    const wrapper = document.createElement("modal-wrapper");
    wrapper.setContent(notesForm);
    this.append(wrapper);
  }
}

customElements.define("modal-add-notes", ModalAddNote);
