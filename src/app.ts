import { HelloWorld } from './components/hello-world'

customElements.define('hello-world', HelloWorld);

document.body.innerHTML = `<hello-world></hello-world>`;
