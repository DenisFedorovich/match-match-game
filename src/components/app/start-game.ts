import { Game } from './game/game';
import { ImageCategoryModel } from '../../models/image-category-model';
import { hardmode, cardType } from '../gameSettings/game-settings';
import {
  CARD_ANIMALS, CARD_CARS, HARDMODE_EASY, HARDMODE_HARD,
} from '../constants/constants';

export class StartGame {
  private readonly game: Game;

  private readonly hardmode: string;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.rootElement.appendChild(this.game.element);
    this.hardmode = hardmode;
  }

  async start(): Promise<void> {
    let response: Response;
    if (this.hardmode === HARDMODE_EASY) {
      response = await fetch('./images4.json');
    }
    if (this.hardmode === HARDMODE_HARD) {
      response = await fetch('./images6.json');
    }

    const categories: ImageCategoryModel[] = await response.json();
    let images: string[];
    if (cardType === CARD_ANIMALS) {
      images = categories[0].images.map(
        (name) => `${categories[0].category}/${name}`,
      );
    }
    if (cardType === CARD_CARS) {
      images = categories[1].images.map(
        (name) => `${categories[1].category}/${name}`,
      );
    }
    this.game.newGame(images);
  }
}
