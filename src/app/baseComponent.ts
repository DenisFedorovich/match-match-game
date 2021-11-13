export class BaseComponent {
  readonly element: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap = 'div', slyles: string[] = []) {
    this.element = document.createElement(tag);
    this.element.classList.add(...slyles);
  }
}
