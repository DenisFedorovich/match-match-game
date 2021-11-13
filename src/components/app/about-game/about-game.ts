import { Component } from '../../app.api';
import { Rules } from './rules';

export class AboutGame implements Component {
  readonly aboutGame: HTMLElement;

  constructor(private readonly root: HTMLElement | null) {
    this.aboutGame = document.createElement('div');
    this.aboutGame.classList.add('rules');
  }

  render(): HTMLElement {
    this.root.appendChild(this.aboutGame);
    this.aboutGame.appendChild(new Rules(this.aboutGame).render());
    return this.aboutGame;
  }
}
