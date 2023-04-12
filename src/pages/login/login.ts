import Block from '../../utils/Block';
import template from './login.pug';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';

import { Link } from '../../components/Link/link';
import { SigninData } from '../../api/types';
import AuthController from '../../controllers/AuthController';

interface LoginProps {
  title?: string;
  classes?: string[];
  url?: string;
  children?: {
    fields: Block[];
    footer: Block[];
  };
}

export class Login extends Block<LoginProps> {

  constructor() {
    super({});
  }

  init() {
    const fields = [
      new Input({
        label: 'Логин',
        idInput: 'login',
        type: 'text',
        classes: 'field',
        inputClasses: 'input',
        events: {
          focusin: () => {
            const loginL = document.querySelector(
              `#${this.children.fields[0].props.idInput}`,
            );
            loginL?.classList.remove(ERROR_TEXT);
          },
        },
      }),
      new Input({
        label: 'Пароль',
        idInput: 'password',
        type: 'password',
        classes: 'field',
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
    ];
    this.children.fields = fields;

    this.children.buttonEnter = new Button({
      label: 'Войти',
      classes: 'button login_form__btn',
      type: 'submit',
      events: {
        click: () => this.onSubmit(),
      },
    });

    this.children.link = new Link({
      label: 'Регистрация',
      to: '/signup',
      classes: 'link login_form__link-signup',
    });
  }

  onSubmit() {
    const values = Object
      .values(this.children.fields)
      .filter(child => child instanceof Input)
      .map((child) => ([
        child._element.childNodes[1].name,
        child._element.childNodes[1].value,
      ]));

    const data = Object.fromEntries(values);

    AuthController.signin(data as SigninData);
    console.log(data);
  }

  render() {
    return this.compile(template, { ...this.props, title: "Вход" });
  }
}
