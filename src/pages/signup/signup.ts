import Block from '../../utils/Block';
import template from './signup.pug';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';

import { Link } from '../../components/Link/link';
import { SignupData } from '../../api/AuthAPI';
import AuthController from '../../controllers/AuthController';

interface SignUpProps {
    title: string;
    classes?: string[];
    url?: string;
    children?: {
        fields: Block[];
        footer: Block[];
    };
}

export class SignUp extends Block<SignUpProps> {
  constructor() {
    super({});
  }

  init() {
    const fields = [
      new Input({
        label: 'Почта',
        idInput: 'email',
        type: 'text',
        classes: ['field'],
        inputClasses: 'input',
        events: {
          click() { },
          focusin: () => {
            const loginL = document.querySelector(
              `#${this.children.fields[0].props.idInput}`,
            );
            loginL?.classList.remove(ERROR_TEXT);
          },
        },
      }),
      new Input({
        label: 'Логин',
        idInput: 'login',
        type: 'text',
        classes: ['field'],
        inputClasses: 'input',
        events: {
          focusin: () => {
            const loginL = document.querySelector(
              `#${this.children.fields[1].props.idInput}`,
            );
            loginL?.classList.remove(ERROR_TEXT);
          },
        },
      }),
      new Input({
        label: 'Имя',
        idInput: 'first_name',
        type: 'text',
        classes: ['field'],
        inputClasses: 'input',
        events: {
          focusin: () => {
            const loginL = document.querySelector(
              `#${this.children.fields[2].props.idInput}`,
            );
            loginL?.classList.remove(ERROR_TEXT);
          },
        },
      }),
      new Input({
        label: 'Фамилия',
        idInput: 'second_name',
        type: 'text',
        classes: ['field'],
        inputClasses: 'input',
        events: {
          focusin: () => {
            const loginL = document.querySelector(
              `#${this.children.fields[3].props.idInput}`,
            );
            loginL?.classList.remove(ERROR_TEXT);
          },
        },
      }),
      new Input({
        label: 'Телефон',
        idInput: 'phone',
        type: 'text',
        classes: ['field'],
        inputClasses: 'input',
        events: {
          focusin: () => {
            const loginL = document.querySelector(
              `#${this.children.fields[4].props.idInput}`,
            );
            loginL?.classList.remove(ERROR_TEXT);
          },
        },
      }),
      new Input({
        label: 'Пароль',
        idInput: 'password',
        type: 'password',
        classes: ['field'],
        inputClasses: 'input',
        events: {
          focusin: () => {
            const loginL = document.querySelector(
              `#${this.children.fields[5].props.idInput}`,
            );
            loginL?.classList.remove(ERROR_TEXT);
          },
        },
      }),
      new Input({
        label: 'Пароль (еще раз)',
        idInput: 'passwordYet',
        type: 'password',
        classes: ['field'],
        inputClasses: 'input',
        events: {
          focusin: () => {
            const loginL = document.querySelector(
              `#${this.children.fields[6].props.idInput}`,
            );
            loginL?.classList.remove(ERROR_TEXT);
          },
        },
      }),
    ];
    this.children.fields = fields;

    const buttons = [
      new Button({
        label: 'Зарегистрироваться',
        url: '',
        classes: 'button main-button',
        type: 'submit',
        events: {
          click: () => this.onSubmit(),
        },
      }),
    ];
    this.children.actions = buttons;

    this.children.link = new Link({
      label: 'Войти',
      to: '/'
    });
  }

  onSubmit() {
    const values = Object
      .values(this.children)
      .filter(child => child instanceof Input)
      .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))

    const data = Object.fromEntries(values);

    AuthController.signup(data as SignupData);
  }
  
  render() {
    return this.compile(template, { title: this.props.title });
  }
}
