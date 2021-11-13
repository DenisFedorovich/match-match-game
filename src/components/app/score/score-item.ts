import { BaseComponent } from '../../base-component';
import { Database } from '../../../database/database';
import { ForDatabase } from '../../../models/image-category-model';
import { COUNT_OF_PLAYERS, NameDataBase, SETTIMEOUT_PLAYERS } from '../../constants/constants';

export class ScoreItem extends BaseComponent {
  private database: Database;

  private readonly position: HTMLElement;

  private score: HTMLElement;

  private headerBlock: HTMLElement;

  constructor(private readonly root: HTMLElement) {
    super();
    this.database = null;
    this.position = document.createElement('div');
    this.database = new Database();
    this.database.init(NameDataBase.NameDataBase);
    this.addElements();
  }

  render(): HTMLElement {
    this.root.appendChild(this.score);

    setTimeout(() => {
      const players: Array<ForDatabase> = this.database.readFiltered();
      setTimeout(() => {
        this.addScore(COUNT_OF_PLAYERS, players);
      }, SETTIMEOUT_PLAYERS);
    }, SETTIMEOUT_PLAYERS);

    return this.score;
  }

  addElements(): void {
    this.score = document.createElement('div');
    this.score.classList.add('score');
    this.headerBlock = document.createElement('h2');
    this.headerBlock.innerHTML = 'Top score';
    this.headerBlock.classList.add('header-block');
    this.score.appendChild(this.headerBlock);
    this.score.appendChild(this.position);
    this.position.classList.add('score-block');
  }

  addScore(count: number, players: Array<ForDatabase>): void {
    for (let i = 0; i < players.length; i++) {
      const player = document.createElement('div');
      player.classList.add('player');
      player.innerHTML = `
      <div class="name">name: ${players[i].name}</div>
      <div class="email"> email: ${players[i].email}</div>
      <div class="score-item">score: ${players[i].score}</div>
      `;
      this.position.appendChild(player);
    }
  }
}
