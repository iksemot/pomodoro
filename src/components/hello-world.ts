import { html, render } from 'lit-html';

export class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.update()
  }

  update () {
    render(this.template(), this.shadowRoot as DocumentFragment, { eventContext: this })
  }

  template () {
    return html`
    <style>
        p {
            color: #FF0000;
            font-weight: bold;
        }
    </style>
    <p>Hello, World!</p>
    `
  }
}

