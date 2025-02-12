import "./notes-item.js";

import { animate, stagger } from "motion";

class NotesGroup extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  setNotes(value) {
    this._notes = value;
    this.render();
  }

  render() {
    if (this._notes) {
      if (this._notes.length > 0) {
        this.innerHTML = `
          <div class="notes__group">
            
          </div>
        `;

        this._container = this.querySelector(".notes__group");

        this._noteItems = this._notes.map((note) => {
          this._notesElement = document.createElement("notes-item");
          this._notesElement.setNote(note);
          return this._notesElement;
        });

        this._container.append(...this._noteItems);

        animate(
          "notes-item",
          { opacity: 1, y: [50, 0] },
          { delay: stagger(0.05) },
        );
      } else {
        this.innerHTML = `
          <div class="error__container">
            <span>
              There are no notes
            </span>
          </div>
        `;
      }
    } else {
      this.innerHTML = `
        <div class="error__container">
          <span>
            Loading
          </span>
        </div>
      `;
    }
  }
}

customElements.define("notes-group", NotesGroup);
