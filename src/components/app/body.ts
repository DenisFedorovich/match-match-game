import { Component } from '../app.api';

export class Body implements Component {
  private readonly body: HTMLElement;

  constructor(private readonly root: HTMLElement | null) {
    this.body = document.createElement('div');
    this.body.id = 'body';
  }

  render(): HTMLElement {
    this.root.appendChild(this.body);
    return this.body;
  }
}
