import { html, render } from '../../node_modules/lit-html/lit-html.js';

export class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.update()
  }

  update () {
    render(this.template(), this.shadowRoot, { eventContext: this })
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

