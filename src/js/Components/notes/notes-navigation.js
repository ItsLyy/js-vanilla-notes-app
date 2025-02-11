class NotesNavigation extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav>
        <ul>
          <li><button>All</button></li>
          <li><button>Achieved</button></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define("notes-navigation", NotesNavigation);
