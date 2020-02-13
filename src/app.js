import { HelloWorld } from './components/hello-world.js'

customElements.define('hello-world', HelloWorld)

document.body.innerHTML = `<hello-world></hello-world>`
