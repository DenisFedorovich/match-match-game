export interface Component {
  render(): HTMLElement | HTMLCollectionOf<Element>;
}
