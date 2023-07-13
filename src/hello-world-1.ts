export {};

customElements.define(
  'hello-world-1',
  class extends HTMLElement {
    connectedCallback() {
      this.innerText = 'Hello World 1';
    }
  }
);
