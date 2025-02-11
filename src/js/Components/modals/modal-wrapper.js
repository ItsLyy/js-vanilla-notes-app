class ModalWrapper extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  setContent(content) {
    this._content = content;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="modal modal__form">
        <div class="modal__wrapper">
          
        </div>
      </div>
    `;

    this._background = this.querySelector(".modal");
    this._wrapper = this.querySelector(".modal__wrapper");
    this._wrapper.append(this._content);
    this._background.addEventListener("click", (e) => {
      const event = new CustomEvent("modal", {
        detail: {
          modal: "none",
        },
      });
      document.dispatchEvent(event);
    });
    this._wrapper.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
}

customElements.define("modal-wrapper", ModalWrapper);
