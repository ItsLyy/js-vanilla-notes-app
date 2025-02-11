class NotesGroup extends HTMLElement {
  constructor() {
    super();

    this._notes = [];
  }

  connectedCallback() {
    this.render();
  }

  setNotes(value) {
    this._notes = value;
    this.render();
  }

  render() {
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
  }
}

customElements.define("notes-group", NotesGroup);
