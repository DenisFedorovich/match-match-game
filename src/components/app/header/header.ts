import { Component } from '../../app.api';
import { Nav } from './nav/nav';

export class Header implements Component {
  readonly head: HTMLElement;

  constructor(private readonly root: HTMLElement) {
    this.head = document.createElement('div');
    this.head.classList.add('header');
  }

  render(): HTMLElement {
    this.root.appendChild(this.head);
    this.head.appendChild(new Nav(this.head).render());
    return this.head;
  }
}
