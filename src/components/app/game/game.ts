import { BaseComponent } from '../../base-component';
import { CardsField } from '../card-field/cards-field';
import { Card } from '../cards/card';
import { delay } from '../../../shared/delay';
import { Timer } from '../timer/timer';
import { Form } from '../form/form';
import {
  DIVIDE_BY_TWO, FLIP_CLASS, FORMULA_ELEMENT, MATH_RANDOM, MULTIPLY_BY_ONE_HUNDREED,
  ONE_THOUSAND, MILLISECONDS_IN_SECOND, SHOW_TIME, TIMEOUT_CARD, WrongAndWrite, ZERO,
} from '../../constants/constants';

let countWrong = ZERO;
let count = ZERO;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private timer: Timer;

  private form: Form;

  private activeCard?: Card;

  private isAnimation = false;

  constructor() {
    super('div', ['game']);
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
    this.timer = new Timer(this.element);
    this.form = new Form(this.element);
  }

  newGame(images: string[]): void {
    this.cardsField.clear();
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - MATH_RANDOM);

    this.getStartWindow();
    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });
    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.getWinWindow(cards));
    });
    this.cardsField.addCards(cards);

    this.timer.render();
  }

  private async cardHandler(card: Card): Promise<void> {
    if (this.isAnimation) return;
    this.isAnimation = true;
    if (this.isAnimation) {
      count++;
    }

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      this.activeCard.element.classList.add(WrongAndWrite.Wrong);
      card.element.classList.add(WrongAndWrite.Wrong);
      const active = this.activeCard.element;

      setTimeout(() => {
        active.classList.remove(WrongAndWrite.Wrong);
        card.element.classList.remove(WrongAndWrite.Wrong);
      }, ONE_THOUSAND);

      if (this.activeCard.element.classList.contains(WrongAndWrite.Wrong)) {
        countWrong++;
      }
      await delay(ONE_THOUSAND);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } else {
      this.activeCard.element.classList.add(WrongAndWrite.Rigth);
      card.element.classList.add(WrongAndWrite.Rigth);
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }

  getScore(): number {
    let countScore = (count / DIVIDE_BY_TWO - countWrong) * MULTIPLY_BY_ONE_HUNDREED
      - (this.timer.minutes * MILLISECONDS_IN_SECOND + this.timer.seconds) * FORMULA_ELEMENT;
    if (countScore < ZERO) {
      countScore = ZERO;
    }
    return countScore;
  }

  getStartWindow(): void {
    const blockWindow: HTMLElement = document.createElement('div');
    blockWindow.classList.add('block-window');
    this.element.appendChild(blockWindow);
    setTimeout(() => {
      blockWindow.classList.remove('block-window');
    }, SHOW_TIME);
  }

  getWinWindow(cards: Card[]): void {
    setTimeout(() => {
      const wins: HTMLElement = document.createElement('div');
      wins.classList.add('victory-block');
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].element.classList.contains(FLIP_CLASS)) {
          return;
        }
      }

      this.timer.clearTimer();
      this.form.render(this.getScore());

      this.element.appendChild(wins);
      wins.innerHTML = `
      <div class="win-container">
        <h2 class="win-text">Win!!!</h2>
        <p class="your-score">Score - ${this.getScore()} </p>
      </div>
      `;
    }, TIMEOUT_CARD);
  }
}
