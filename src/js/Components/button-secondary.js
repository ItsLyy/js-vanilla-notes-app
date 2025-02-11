class ButtonSecondary extends HTMLElement {
  constructor() {
    super();
    this._text = "";
    this._value = this.getAttribute("fill");
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  setText(value) {
    this._text = value;
    this.render();
  }

  setFill(value) {
    this._fill = value;
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
        :host {
          width: fit-content;
        }

        :host .btn__secondary {
          padding: 0.7rem 1rem;
          font-size: 0.9em;

          ${
            this._fill === "filled"
              ? `background: linear-gradient(
              to top right,
              var(--first-color),
              var(--second-color)
            );
            border: 1px solid var(--first-color);
  
            color: #fff;`
              : `
            background-color: transparent;
            border: 1px solid var(--first-color);
            color: var(--first-color);
            `
          }
          border-radius: 8px;
          cursor: pointer;
        }

        :host .btn__secondary:has(svg) {
          padding: .6rem .7rem
        }

        :host .icon {
          width: 1.3rem;
          display: flex;
          align-items: center;
        }
      </style>
      <button class="btn__secondary">${this._text}</button>
    `;
  }
}

customElements.define("button-secondary", ButtonSecondary);
