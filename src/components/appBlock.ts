import { Component } from './app.api';
import { Header } from './app/header/header';
import { Body } from './app/body';

export class AppBlock implements Component {
  private readonly page: HTMLElement;

  constructor(private readonly root: HTMLElement | null) {
    this.page = document.createElement('div');
    this.page.classList.add('app-block');
  }

  render(): HTMLElement {
    this.root.appendChild(this.page);
    this.page.appendChild(new Header(this.page).render());
    this.page.appendChild(new Body(this.page).render());
    return this.page;
  }
}
