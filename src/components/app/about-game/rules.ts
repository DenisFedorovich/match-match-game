import { Component } from '../../app.api';

export class Rules implements Component {
  readonly rules: HTMLElement;

  constructor(private readonly root: HTMLElement | null) {
    this.rules = document.createElement('div');
    this.rules.classList.add('container');
  }

  render(): HTMLElement {
    this.rules.innerHTML = `
        <div class="how-to-play-block">
          <h2>How to play?</h2>
          <div><p>1) Register new player in game </p></div>
          <div><p>2) Configure your game settings   </p></div>
          <div><p>3) Start you new game! Remember card positions and match it before times up </p></div>
          </div>
        </div>
     `;
    return this.rules;
  }
}
