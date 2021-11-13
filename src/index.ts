import './style/main.scss';
import { App } from './app';
import { StartGame } from './components/app/start-game';
import { AboutGame } from './components/app/about-game/about-game';
import { ScoreItem } from './components/app/score/score-item';
import { Settings } from './components/gameSettings/game-settings';
import { Acitve } from './components/constants/constants';

const rootNode: HTMLElement = document.querySelector('#app');

function router() {
  let currentUrl: string = window.location.hash.slice(2);

  function getNewUrl() {
    if (window.location.href.indexOf('#') === -1) {
      currentUrl = window.location.href.slice(5, 6);
    } else currentUrl = window.location.hash.slice(1);
  }

  getNewUrl();

  const appRoutes: { [key: string]: string } = {
    '/': '<div id="about-game"></div>',
    '/game/': '<div id="game"></div>',
    '/settings/': '<div id="settings"></div>',
    '/score/': '<div id="score"></div>',
  };

  const getUrl = appRoutes[currentUrl];
  const body: HTMLElement = document.getElementById('body');
  body.innerHTML = `${getUrl}`;

  const about: HTMLElement = document.getElementById('about-game');
  const game: HTMLElement = document.getElementById('game');
  const registarion: HTMLElement = document.getElementById('regBtn');
  const settings: HTMLElement = document.getElementById('settings');
  const score: HTMLElement = document.getElementById('score');
  const activeAbout: HTMLElement = document.getElementById('about-active');
  const activeScore: HTMLElement = document.getElementById('game-score');
  const activeSettings: HTMLElement = document.getElementById('settings-active');
  const gameActive: HTMLElement = document.getElementById('game-active');

  if (about) {
    new AboutGame(body).render();
    activeAbout.classList.add(Acitve.Active);
  } else {
    activeAbout.classList.remove(Acitve.Active);
  }

  if (registarion) {
    new AboutGame(body).render();
  }

  if (game) {
    new StartGame(body).start();
    gameActive.classList.add(Acitve.Active);
  } else {
    gameActive.classList.remove(Acitve.Active);
  }

  if (settings) {
    new Settings(body).render();
    activeSettings.classList.add(Acitve.Active);
  } else {
    activeSettings.classList.remove(Acitve.Active);
  }

  if (score) {
    new ScoreItem(body).render();
    activeScore.classList.add(Acitve.Active);
  } else {
    activeScore.classList.remove(Acitve.Active);
  }
}

window.addEventListener('load', () => {
  const mainLink = window.location.pathname;
  document.location.assign(`${mainLink}#/`);
  new App(rootNode).render();
  router();
});
window.addEventListener('hashchange', () => router());
