class HelloWorld extends HTMLElement {
  connectedCallback() {
    this.innerText = 'Hello World';
  }
}

customElements.define('hello-world', HelloWorld);
