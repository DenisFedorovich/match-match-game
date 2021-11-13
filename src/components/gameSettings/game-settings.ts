/* eslint-disable */
import { BaseComponent } from '../base-component';
import { HARDMODE_HARD } from '../constants/constants';

export let hardmode = '4';
export let cardType = 'animals';

export class Settings extends BaseComponent {
  private readonly selectCardType: HTMLElement;

  private readonly selecthardmode: HTMLElement;

  private readonly gameCardType: HTMLElement;

  private readonly hardmode: HTMLElement;

  constructor(private readonly root: HTMLElement) {
    super('div', ['game-settings']);
    this.gameCardType = document.createElement('div');
    this.hardmode = document.createElement('div');
    this.selectCardType = document.createElement('form');
    this.selecthardmode = document.createElement('form');
  }

  render(): HTMLElement {
    this.root.appendChild(this.element);
    this.chooseCards();
    return this.element;
  }

  chooseCards(): void {
    this.element.appendChild(this.gameCardType);
    this.gameCardType.classList.add('game-mode-text');
    this.element.appendChild(this.selectCardType);
    this.selectCardType.classList.add('form-choose-cards');
    this.gameCardType.innerHTML = 'Choose game cards';
    this.selectCardType.innerHTML = `
        <select size="1">
          <option disabled class="cards-new" name="cardType">Choose cards</option>
          <option selected class="cards-new" value="animals" name="cardType">animals</option>
          <option class="cards-new" value="cars" name="cardType">cars</option>
        </select>
        `;

    this.selectCardType.addEventListener('click', this.getCardType);
    this.element.appendChild(this.hardmode);
    this.hardmode.classList.add('game-card-text');

    this.element.appendChild(this.selecthardmode);
    this.selecthardmode.classList.add('form-choose-difficulty');
    this.hardmode.innerHTML = 'Difficulty Level';
    this.selecthardmode.innerHTML = `
        <select size="1">
          <option disabled id="cards" name="cardNumber">Choose cards</option>
          <option selected id="4" value="4" name="cardNumber">4x4</option>
          <option id="6" value="6" name="cardNumber">6x6</option>
        </select>
        `;
    this.selecthardmode.addEventListener('click', this.getHardMode);
  }

  getCardType(): void {
    cardType = (
      document.querySelector(
        'option[name="cardType"]:checked'
      ) as HTMLInputElement
    ).value;
  }

  getHardMode(): void {
    hardmode = (
      document.querySelector(
        'option[name="cardNumber"]:checked'
      ) as HTMLInputElement
    ).value;
  }
}
