import { html, render } from 'lit-html';

export class PomodoroTimer extends HTMLElement {
  private timer: number

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.update()

    this.timer = 25 * 60 * 1000
  }

  update () {
    render(this.template(), this.shadowRoot as DocumentFragment, { eventContext: this })
    setTimeout(() => {
      this.shadowRoot!.querySelector('p')!.textContent = '24m 59s'
    }, 1000)
  }

  formatTimer (): string {
    let minutes: string = `${Math.trunc(this.timer / 1000 / 60)}`
    let seconds: string = `${this.timer / 1000 % 60}`

    if (minutes.length === 1) minutes = `0${minutes}`
    if (seconds.length === 1) seconds = `0${seconds}`

    return `${minutes}m ${seconds}s`
  }

  template () {
    return html`
    <style>
        p {
            color: #FF0000;
            font-weight: bold;
        }
    </style>

    <p>25m 00s</p>
    `
  }
}

