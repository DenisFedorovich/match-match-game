import { Component } from './app/app.api';
import { AppBlock } from './components/appBlock';

export class App implements Component {
  app: HTMLElement;

  constructor(private readonly root: HTMLElement) {
    this.app = document.createElement('div');
    this.app.classList.add('main-block');
  }

  render(): HTMLElement {
    this.root.appendChild(this.app);
    this.app.appendChild(new AppBlock(this.app).render());
    return this.app;
  }
}
