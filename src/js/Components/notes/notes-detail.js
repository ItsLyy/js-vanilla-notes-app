import Swal from "sweetalert2";

class NotesDetail extends HTMLElement {
  constructor() {
    super();
    this._notes = {
      id: 0,
      title: "Empty Title",
      body: "Empty Description",
      createdAt: new Date().toISOString(),
      archived: false,
    };
  }

  connectedCallback() {
    this.render();
  }

  setNote(value) {
    this._notes["id"] = value.id;
    this._notes["title"] = value.title;
    this._notes["body"] = value.body;
    this._notes["archived"] = value.archived;

    this.render();
  }

  render() {
    this.setAttribute("notes-id", this._notes.id);
    this.innerHTML = `
      <div class="notes__detail">
        <header class="notes-detail__header">
          <h1 class="notes-detail__title">${this._notes.title}</h1>
          <span class="notes-detail__created-at">Created at: ${this._notes.createdAt}</span>
        </header>
        <div class="content__container">
          <p class="notes-detail__body">${this._notes.body}</p>
          <div class="notes-detail__action">
            <button class="button__delete">Delete</button>
            <button-secondary class="archieve"></button-secondary>
          </div>
        </div>
      </div>
    `;

    this._archieveButton = this.querySelector(".archieve");
    this._deleteButton = this.querySelector(".button__delete");
    this._isState = this._notes.archived;
    this._archieveButton.setFill(this._isState ? "filled" : "");

    this._archieveButton.addEventListener("click", () => {
      Swal.fire({
        title: "Are you sure?",
        text: `Are you want to ${this._isState ? "unarchive" : "archive"} ${
          this._notes.title
        }`,
        icon: "question",
        showDenyButton: true,
        showConfirmButton: true,
        denyButtonText: "No",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          this._isState = !this._isState;
          this._archieveButton.setFill(this._isState ? "filled" : "");
          const eventArchieve = new CustomEvent("archieve-notes", {
            detail: {
              id: this.getAttribute("notes-id"),
              value: this._isState,
            },
          });
          document.dispatchEvent(eventArchieve);
        }
      });
    });

    this._deleteButton.addEventListener("click", () => {
      Swal.fire({
        title: "Are you sure?",
        text: `Are you want to delete ${this._notes.title}`,
        icon: "warning",
        showDenyButton: true,
        showConfirmButton: true,
        denyButtonText: "No",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          const event = new CustomEvent("delete-notes", {
            detail: {
              id: this._notes.id,
            },
          });

          const eventCloseModal = new CustomEvent("modal", {
            detail: {
              state: false,
            },
          });

          document.dispatchEvent(event);
          document.dispatchEvent(eventCloseModal);
        }
      });
    });

    this._archieveIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>`;
    this._archieveButton.setText(this._archieveIcon);
  }
}

customElements.define("notes-detail", NotesDetail);
