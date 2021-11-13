import { Component } from '../../../app.api';

export class Nav implements Component {
  private nav: HTMLElement;

  constructor(private readonly root: HTMLElement | null) {
    this.nav = document.createElement('div');
    this.nav.classList.add('container');
  }

  render(): HTMLElement {
    const link = window.location.pathname;
    this.nav.innerHTML = `
        <div class="logo-block">
          <div class="blue-logo">
              <a href="${link}#/" class="logo-route">match</a>
          </div>
          <div class="white-logo">
              <a href="${link}#/" class="logo-route">match</a>
          </div>
        </div>

        <nav class="menu-desktop" id="menu-desktop">
            <ul class="navigation">
                <li><a href='${link}#/' id="about-active" class="menu-item">About Game</a></li>
                <li><a href="${link}#/score/" id="game-score" class="menu-item">Best Score</a>
                </li>
                <li><a href="${link}#/settings/" id="settings-active" class="menu-item">Game Settings</a>
                </li>
                <li><a href='${link}#/game/' id="game-active" class="menu-item">Start Game</a>
                </li>
            </ul>
        </nav>
    `;

    return this.nav;
  }
}
