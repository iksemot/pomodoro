import { html, render } from 'lit-html';

function formatTimeLeft (timer: number): string {
  if (timer === undefined) return '-- : --'

  let minutes: string = `${Math.trunc(timer / 1000 / 60)}`
  let seconds: string = `${Math.trunc(timer / 1000 % 60)}`

  if (minutes.length === 1) minutes = `0${minutes}`
  if (seconds.length === 1) seconds = `0${seconds}`

  return `${minutes}m ${seconds}s`
}

class Timer {
  private timerValue: number
  private startTimestamp: number
  private isPaused: boolean

  constructor() {
    this.timerValue = 25 * 60 * 1000
    this.startTimestamp = Date.now()
    this.isPaused = true
  }

  getTimeLeft(): number {
    if (this.isPaused) return this.timerValue

    const now = Date.now()
    const timePassed = now - this.startTimestamp
    const timeLeft = this.timerValue - timePassed

    return timeLeft > 0 ? timeLeft : 0
  }

  pause(): void {
    if (this.isPaused) return

    this.timerValue = this.getTimeLeft()
    this.isPaused = true
  }

  resume(): void {
    if (!this.isPaused) return

    this.startTimestamp = Date.now()
    this.isPaused = false
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
    setTimeout(() => this.update(), 1000)
  }

  template () {
    const timeLeft = this.timer?.getTimeLeft()
    const timer = formatTimeLeft(timeLeft)

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

