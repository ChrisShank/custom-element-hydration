export {};

customElements.define(
  'hello-world',
  class extends HTMLElement {
    connectedCallback() {
      this.innerText = 'Hello World';
    }
  }
);
