import "./modals/modal-add-notes.js";
import "./modals/modal-detail-notes.js";

class Modal extends HTMLElement {
  constructor() {
    super();
    this._state = false;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="modal__container">

      </div>
    `;

    const modalContainer = this.querySelector(".modal__container");

    document.addEventListener("modal", (e) => {
      modalContainer.innerHTML = "";
      if (e.detail.state) {
        this._state = e.detail.state;
      } else {
        this._state = !this._state;
      }

      const modal = e.detail.modal;
      if (modal === "add-notes" && this._state) {
        const content = document.createElement("modal-add-notes");
        modalContainer.append(content);
      } else if (modal === "notes-detail" && this._state) {
        const content = document.createElement("modal-detail-notes");
        content.setNotes(e.detail.notes);
        modalContainer.append(content);
      }
    });
  }
}

customElements.define("modal-container", Modal);
