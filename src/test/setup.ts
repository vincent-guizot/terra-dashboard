import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement matchMedia — polyfill it so ThemeProvider
// (which reads prefers-color-scheme) can run in tests.
if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;
}
