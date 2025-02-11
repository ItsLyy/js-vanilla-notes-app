class NotesAdd extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <form class=" add-notes__form">
        <h2>Add Notes</h2>
        <div class="input__field">
          <label for="title">Title</label>
          <input type="text" name="title" id="title" autocomplete="title" required>
        </div>
        <div class="input__field">
          <label for="body">Body</label>
          <textarea type="text" name="body" id="body" autocomplete="body" required></textarea>
        </div>
        <div class="input__field submit__field">
          <button-primary fill="filled"></button-primary>      
        </div>
      </form>
    `;

    this.querySelector("button-primary").setText("Add");
  }
}

customElements.define("notes-add", NotesAdd);
