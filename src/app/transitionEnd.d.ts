export {};

declare global {
  interface Window {
    transitionEnd?: () => void;
  }
}
