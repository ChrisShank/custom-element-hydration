import './hello-world';

type CustomElementImports = Record<string, () => Promise<any>>;

function hydrateOnIdle(customElementImports: CustomElementImports) {
  addEventListener('DOMContentLoaded', () => {
    const tagsToLoad = new Set<string>();
    document.querySelectorAll('[hydrate\\:idle]').forEach((el) => {
      const tagName = el.tagName.toLowerCase();
      if (tagName.includes('-') && customElements.get(tagName) === undefined) {
        tagsToLoad.add(tagName);
      }
    });

    requestIdleCallback(() => {
      tagsToLoad.forEach((tag) => {
        customElementImports[tag]?.();
      });
    });
  });
}

function hydrateOnVisible(customElementImports: CustomElementImports) {
  addEventListener('DOMContentLoaded', () => {
    const intersectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const tagName = entry.target.tagName.toLowerCase();

          customElementImports[tagName]?.();

          observer.unobserve(entry.target);
        }
      });
    });

    document.querySelectorAll('[hydrate\\:visible]').forEach((el) => {
      const tagName = el.tagName.toLowerCase();
      if (tagName.includes('-') && customElements.get(tagName) === undefined) {
        intersectionObserver.observe(el);
      }
    });
  });
}

hydrateOnIdle({
  'hello-world-1': () => import('./hello-world-1'),
});

hydrateOnVisible({
  'hello-world-2': () => import('./hello-world-2'),
});
