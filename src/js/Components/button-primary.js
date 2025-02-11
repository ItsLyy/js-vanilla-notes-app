class ButtonPrimary extends HTMLElement {
  constructor() {
    super();
    this._text = "";
    this._shadowRoot = this.attachShadow({ mode: "open" });

    this._fill = this.getAttribute("fill");
  }

  connectedCallback() {
    this.render();
  }

  setText(value) {
    this._text = value;
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
        :host {
          width: fit-content;
        }

        :host .btn__primary {
          padding: 0.7rem 1rem;
          font-size: 0.9em;
          ${
            this._fill === "filled"
              ? `background: linear-gradient(
              to top right,
              var(--first-color),
              var(--second-color)
            );
  
            color: #fff;`
              : `
            background-color: transparent;
            border: 1px solid var(--first-color);
            color: var(--first-color);
            `
          }
          
          border-radius: 8px;
          border: none;
          cursor: pointer;
        }

        :host .btn__primary:has(svg) {
          padding: .6rem .7rem
        }

        :host .icon {
          width: 1.3rem;
          display: flex;
          align-items: center;
        }
      </style>
      <button class="btn__primary">${this._text}</button>
    `;
  }
}

customElements.define("button-primary", ButtonPrimary);
