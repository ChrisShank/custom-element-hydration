type CustomElementImports = Record<string, () => Promise<any>>;

function onClientIdle(customElementImports: CustomElementImports) {
  addEventListener('DOMContentLoaded', () => {
    const tagsToLoad = new Set<string>();
    document.querySelectorAll('[client-load="idle"]').forEach((el) => {
      const tagName = el.tagName;
      if (tagName.includes('-') && customElements.get(tagName) === undefined) {
        tagsToLoad.add(tagName);
      }
    });

    requestIdleCallback(() => {
      tagsToLoad.forEach((tag) => {
        customElementImports[tag]?.() ??
          console.warn(`Custom element '${tag} has no dynamic import defined.'`);
      });
    });
  });
}
