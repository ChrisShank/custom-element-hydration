import './hello-world';

type CustomElementImports = Record<string, () => Promise<any>>;

// Assume that JS module is deferred so that the DOM is loaded.
// Using DOMContentLoaded is blocked by executing all of the scripts

function hydrateOnIdle(customElementImports: CustomElementImports) {
  const tagsToLoad = new Set<string>();
  document.querySelectorAll('[hydrate\\:idle]').forEach((el) => {
    const { localName } = el;
    if (localName.includes('-') && customElements.get(localName) === undefined) {
      tagsToLoad.add(localName);
    }
  });

  requestIdleCallback(() => {
    tagsToLoad.forEach((tag) => {
      customElementImports[tag]?.();
    });
  });
}

function hydrateOnVisible(customElementImports: CustomElementImports) {
  const intersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        customElementImports[entry.target.localName]?.();

        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('[hydrate\\:visible]').forEach((el) => {
    const { localName } = el;
    if (localName.includes('-') && customElements.get(localName) === undefined) {
      intersectionObserver.observe(el);
    }
  });
}

hydrateOnIdle({
  'hello-world-1': () => import('./hello-world-1'),
});

hydrateOnVisible({
  'hello-world-2': () => import('./hello-world-2'),
});
