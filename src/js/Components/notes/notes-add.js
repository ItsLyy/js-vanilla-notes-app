import Swal from "sweetalert2";

class NotesAdd extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <form id="add-notes__form" class="add-notes__form">
        <h2>Add Notes</h2>
        <div class="input__field">
          <label for="title">Title</label>
          <input type="text" name="title" id="title" max="20" autocomplete="title" required>
        </div>
        <div class="input__field">
          <label for="body">Body</label>
          <textarea type="text" name="body" id="body" autocomplete="body" required></textarea>
        </div>
        <div class="input__field submit__field">
          <input type="submit" class="btn__primary" value="Add"></input>      
        </div>
      </form>
    `;

    const form = this.querySelector("#add-notes__form");
    const titleInput = form.elements.title;
    const bodyInput = form.elements.body;

    titleInput.addEventListener("change", this._validationHandler);
    titleInput.addEventListener("invalid", this._validationHandler);
    bodyInput.addEventListener("change", this._validationHandler);
    bodyInput.addEventListener("invalid", this._validationHandler);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      Swal.fire({
        icon: "question",
        title: "Are you sure?",
        text: "Are you sure want to create this notes?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          const eventSubmit = new CustomEvent("add-notes", {
            detail: {
              notes: {
                title: titleInput.value,
                body: bodyInput.value,
              },
            },
          });
          const eventCloseModal = new CustomEvent("modal", {
            detail: {
              state: false,
            },
          });

          document.dispatchEvent(eventSubmit);
          document.dispatchEvent(eventCloseModal);
        }
      });
    });
  }

  _validationHandler(event) {
    event.target.setCustomValidity("");

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity("Wajib diisi.");
      return;
    }

    if (event.target.validity.toLong) {
      event.target.setCustomValidity("Huruf kebanyakan.");
      return;
    }

    if (event.target.validity.patternMismatch) {
      event.target.setCustomValidity(
        "Tidak boleh diawali dengan simbol, mengandung white space atau spasi, dan mengandung karakter spesial seperti dolar ($).",
      );
      return;
    }
  }
}

customElements.define("notes-add", NotesAdd);
