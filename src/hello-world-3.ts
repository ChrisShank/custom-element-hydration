export {};

customElements.define(
  'hello-world-3',
  class extends HTMLElement {
    constructor() {
      super();
      this.addEventListener('click', this);
    }

    handleEvent(e: Event) {
      if (e.type === 'click') {
        const count = parseInt(this.innerText);
        this.innerText = (count + 1).toString();
      }
    }
  }
);
