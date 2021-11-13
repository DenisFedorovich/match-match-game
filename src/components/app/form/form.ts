import { Database } from '../../../database/database';
import { BaseComponent } from '../../base-component';
import {
  ElementById, ErrorText, NameDataBase, NAME_LENGTH, TIMEOUT_REGBTN,
} from '../../constants/constants';

export class Form extends BaseComponent {
  readonly formitem: HTMLElement;

  private emailInp: HTMLElement;

  private emailLab: HTMLElement;

  private nameInp: HTMLElement;

  private nameLab: HTMLElement;

  private surnameInp: HTMLElement;

  private surnameLab: HTMLElement;

  private newscore: number;

  private name: string;

  private email: string;

  private regBtn: HTMLElement;

  private base: Database;

  constructor(private readonly root: HTMLElement | null) {
    super('div', ['form']);
    this.newscore = 0;
    this.name = '';
    this.email = '';
    this.regBtn = document.getElementById('regBtn');
    this.base = null;
  }

  render(newscore: number): void {
    this.newscore = newscore;
    this.root.appendChild(this.element);
    const link = window.location.pathname;
    this.element.innerHTML = `
      <div class="services_contents">
          <div class="services_item opened">
              <form class="feedback-form-new">
                  <div class="inputs">
                    <span class="about-input">Name</span>
                    <input id="text" class="feedback-form-main-input" type="text" name="text"
                        placeholder="Name">
                    <label class="label" id="message-name" for="text"></label>
                  </div>

                  <div class="inputs">
                    <span class="about-input">Surname</span>
                    <input id="text-surname" class="feedback-form-main-input" type="text" name="text"
                        placeholder="Surname">
                    <label class="label" id="message-surname" for="text"></label>
                  </div>

                  <div class="inputs">
                    <span class="about-input">E-mail</span>
                    <input id="email" class="feedback-form-main-input" type="email" name="email"
                        placeholder="E-mail">
                    <label class="label" id="email-message" for="email"></label>
                  </div>

                  <div class="login-registraion">
                    <div class="button" id='regBtn'><a href='${link}#/'>Registration</a></div>
                  </div>
              </form>
          </div>
        </div>
     `;
    this.nameInp = document.getElementById(ElementById.Text);
    this.nameLab = document.getElementById(ElementById.MessageName);
    this.surnameInp = document.getElementById(ElementById.TextSurname);
    this.surnameLab = document.getElementById(ElementById.MessageSurname);
    this.emailInp = document.getElementById(ElementById.Email);
    this.emailLab = document.getElementById(ElementById.EmailMessage);
    this.emailInp.addEventListener('blur', this.validateBlurMail.bind(this));
    this.emailInp.addEventListener('focus', this.validateFocusMail.bind(this));
    this.nameInp.addEventListener(
      'blur',
      this.validateBlurName.bind(this, this.nameLab, this.nameInp),
    );
    this.nameInp.addEventListener(
      'focus',
      this.validateFocusName.bind(this, this.nameLab, this.nameInp),
    );
    this.surnameInp.addEventListener(
      'blur',
      this.validateBlurSurname.bind(this, this.surnameLab, this.surnameInp),
    );
    this.surnameInp.addEventListener(
      'focus',
      this.validateFocusSurname.bind(this, this.surnameLab, this.surnameInp),
    );
    this.regBtn = document.getElementById('regBtn');
    this.regBtn.addEventListener('click', () => {
      if (
        this.nameInp.classList.contains(ErrorText.Valid)
        && this.surnameInp.classList.contains(ErrorText.Valid)
        && this.emailInp.classList.contains(ErrorText.Valid)
      ) {
        this.name = `${(this.nameInp as HTMLInputElement).value} ${(this.surnameInp as HTMLInputElement).value
        }`;
        this.email = (this.emailInp as HTMLInputElement).value;
        this.base = new Database();
        this.base.init(NameDataBase.NameDataBase);
        setTimeout(() => {
          this.base.write(this.name, this.email, this.newscore);
        }, TIMEOUT_REGBTN);
      }
    });
  }

  validateBlurMail(): void | boolean {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const address: string = (this.emailInp as HTMLInputElement).value;
    if (address === '') {
      this.emailLab.innerText = ErrorText.EnterYourMail;
      this.emailInp.classList.add(ErrorText.Invalid);
      return;
    }
    if (!reg.test(address)) {
      this.emailLab.innerText = ErrorText.IncorrectMail;
      this.emailInp.classList.add(ErrorText.Invalid);
      return;
    }
    this.emailInp.classList.remove(ErrorText.Invalid);
    this.emailInp.classList.add(ErrorText.Valid);
  }

  validateFocusMail(): void | boolean {
    this.emailLab.innerText = '';
    this.emailInp.focus();
  }

  validateBlurName(): void | boolean {
    const reg = /^(([a-zA-Z' -]{2,30})|([а-яА-ЯЁёІіЇїҐґЄє' -]{2,30}))$/u;
    const name: string = (this.nameInp as HTMLInputElement).value;

    if (name === '') {
      this.nameLab.innerText = ErrorText.EnterYourName;
      this.nameInp.classList.add(ErrorText.Invalid);
      return;
    }

    if (name.length < NAME_LENGTH) {
      this.nameLab.innerText = ErrorText.ShortName;
      this.nameInp.classList.add(ErrorText.Invalid);
      return;
    }

    if (!reg.test(name)) {
      this.nameLab.innerText = ErrorText.InvalidName;
      this.nameInp.classList.add(ErrorText.Invalid);
      return;
    }

    this.nameInp.classList.remove(ErrorText.Invalid);
    this.nameInp.classList.add(ErrorText.Valid);
  }

  validateFocusName(): void {
    this.nameInp.focus();
    this.nameLab.innerText = '';
  }

  validateBlurSurname(): void | boolean {
    const reg = /^(([a-zA-Z' -]{2,30})|([а-яА-ЯЁёІіЇїҐґЄє' -]{2,30}))$/u;
    const surname: string = (this.surnameInp as HTMLInputElement).value;

    if (surname === '') {
      this.surnameLab.innerText = ErrorText.EnterYourName;
      this.surnameInp.classList.add(ErrorText.Invalid);
      return;
    }

    if (surname.length < NAME_LENGTH) {
      this.surnameLab.innerText = ErrorText.ShortName;
      this.surnameInp.classList.add(ErrorText.Invalid);
      return;
    }

    if (!reg.test(surname)) {
      this.surnameLab.innerText = ErrorText.InvalidName;
      this.surnameInp.classList.add(ErrorText.Invalid);
      return;
    }
    this.surnameInp.classList.remove(ErrorText.Invalid);
    this.surnameInp.classList.add(ErrorText.Valid);
  }

  validateFocusSurname(): void {
    this.surnameInp.focus();
    this.surnameLab.innerText = '';
  }
}
