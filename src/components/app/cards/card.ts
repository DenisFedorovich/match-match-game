import { BaseComponent } from '../../base-component';
import { FLIP_CLASS } from '../../constants/constants';

export class Card extends BaseComponent {
  isFlipped = false;

  constructor(readonly image: string) {
    super('div', ['card-container']);
    this.element.innerHTML = `
     <div class="card"'>
      <div class="card-front" style="background-image: url('./images/${this.image}')"></div>
      <div class="card-back"></div>
    </div>
    `;
  }

  flipToBack(): Promise<void> {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    this.isFlipped = true;
    return this.flip(false);
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
