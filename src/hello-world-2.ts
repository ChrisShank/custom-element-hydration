export {};

customElements.define(
  'hello-world-2',
  class extends HTMLElement {
    connectedCallback() {
      this.innerText = 'Hello World 2';
    }
  }
);
