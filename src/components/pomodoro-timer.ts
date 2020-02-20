import { html, render } from 'lit-html';

class Timer {
  private timerValue: number
  private startTimestamp: number
  private isPaused: boolean
  private pauseTimestamp: number

  constructor() {
    this.timerValue = 25 * 60 * 1000
    this.startTimestamp = this.pauseTimestamp = Date.now()
    this.isPaused = true
  }

  format (): string {
    const timer: number = this.getTimeLeft()
    let minutes: string = `${Math.trunc(timer / 1000 / 60)}`
    let seconds: string = `${Math.trunc(timer / 1000 % 60)}`

    if (minutes.length === 1) minutes = `0${minutes}`
    if (seconds.length === 1) seconds = `0${seconds}`

    return `${minutes}m ${seconds}s`
  }

  getTimeLeft(): number {
    const now = this.isPaused ? this.pauseTimestamp : Date.now()
    const timePassed = now - this.startTimestamp
    const timeLeft = this.timerValue - timePassed

    return timeLeft
  }

  pause(): void {
    if (this.isPaused) return

    this.isPaused = true
    this.pauseTimestamp = Date.now()
    this.timerValue = this.getTimeLeft()
  }

  resume(): void {
    if (!this.isPaused) return

    this.isPaused = false
    this.startTimestamp = Date.now()
  }
}

export class PomodoroTimer extends HTMLElement {
  private timer: Timer
  private enabled!: boolean

  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    this.timer = new Timer()
  }

  static get observedAttributes(): string[] {
    return ['enabled']
  }

  connectedCallback (): void {
    if (!this.isConnected) return
    if (!this.hasAttribute('enabled')) this.setAttribute('enabled', 'true')

    this.update()
  }

  attributeChangedCallback (name: string, oldValue: string, newValue: string): void {
    // @ts-ignore
    const callback = this[`${name}Changed`]
    if (callback) callback.call(this, oldValue, newValue)
  }

  enabledChanged (oldValue: string, newValue: string): void {
    this.enabled = newValue.toLowerCase() === 'true'
    if (this.enabled) this.timer.resume()
    else this.timer.pause()
  }

  update () {
    render(this.template(), this.shadowRoot as DocumentFragment, { eventContext: this })
    setTimeout(() => {
      this.update()
    }, 1000)
  }

  template () {
    const timer = this.timer?.format() || '-- : --'
    return html`
    <style>
        p {
            color: #FF0000;
            font-weight: bold;
        }
    </style>

    <p>${timer}</p>
    `
  }
}

