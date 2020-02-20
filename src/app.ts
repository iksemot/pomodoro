import { PomodoroTimer } from './components/pomodoro-timer'

customElements.define('pomodoro-timer', PomodoroTimer);

document.body.innerHTML = `<pomodoro-timer></pomodoro-timer>`;
