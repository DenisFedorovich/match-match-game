/* eslint-disable */
import { BaseComponent } from '../../base-component';
import { ADD_NINE, ADD_SEC, TIMEOUT_GET_TIME, ZERO } from '../../constants/constants';

export class Timer extends BaseComponent {
  readonly timeritem: HTMLElement;

  seconds: number;

  minutes: number;

  hours: number;

  setIntevalId: NodeJS.Timeout;

  timerBlock: HTMLElement;

  elem: HTMLCollectionOf<Element>;

  constructor(private readonly root: HTMLElement | null) {
    super('div', ['timer-container']);
    this.timeritem = document.createElement('div');
    this.timeritem.classList.add('timer-b');
    this.minutes = ZERO;
    this.hours = ZERO;
    this.seconds = ZERO;
    this.setIntevalId = null;
    this.timerBlock= null;
    this.elem = null;
  }

  render(): void {
    this.root.appendChild(this.timeritem);
    this.timeritem.innerHTML = `
    <div class="stopwatch" id="stopwatch">
    <div>
    `;
    this.getTime();
  }

  getTime(): void  {
    this.timerBlock = document.getElementById('stopwatch');
    this.seconds = 0;
    this.setIntevalId = setInterval(() => {
      this.add();
    }, TIMEOUT_GET_TIME);
  }

  clearTimer(): void  {
    clearInterval(this.setIntevalId);
  }

  add(): void {
    this.seconds++;

    if (this.seconds > ADD_SEC) {
      this.seconds = ZERO;
      this.minutes++;
    }

    this.timerBlock.innerHTML = `${
      this.minutes ? this.minutes > ADD_NINE ? this.minutes : `0 ${this.minutes}` : '00'} :
    ${this.seconds > ADD_NINE ? this.seconds : `0${this.seconds}`}`;

  }
}
