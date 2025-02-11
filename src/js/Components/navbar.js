class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <header class="nav__header">
        <nav class="nav__bar">
          <h5 class="logo__brand">NoteApp</h5>
          <button-primary fill="filled" id="btn-add-notes"></button-primary>
        </nav>
      </header>
    `;
    this._button = this.querySelector("button-primary");
    this._button.setText("Add Note");
    this._button.addEventListener("click", () => {
      const event = new CustomEvent("modal", {
        detail: {
          modal: "add-notes",
        },
      });
      document.dispatchEvent(event);
    });
  }
}

customElements.define("nav-bar", Navbar);
