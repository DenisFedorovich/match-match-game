/* eslint-disable */
import { Component } from '../../app.api';
import { ScoreItem } from './score-item';

export class Score implements Component {
  readonly form: HTMLElement;

  constructor(private readonly root: HTMLElement | null) {
    this.form = document.createElement('div');
    this.form.classList.add('form1');
  }

  render(): HTMLElement {
    this.root.appendChild(this.form);
    this.form.appendChild(new ScoreItem(this.form).render());
    return this.form;
  }
}
