import Block from '../../utils/Block';
import template from './login.pug';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';

interface LoginProps {
    title: string;
    classes?: string[];
    url?: string;
    children?: {
        fields: Block[];
        footer: Block[];
    };
}

export class Login extends Block<LoginProps> {
  init() {
    const fields = [
      new Input({
        label: 'Логин',
        idInput: 'login',
        type: 'text',
        classes: ['field'],
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
    ];
    this.children.fields = fields;

    const buttons = [
      new Button({
        label: 'Войти',
        events: {
          click: () => {
            event.preventDefault();
            const valid = this.children.fields.reduce((acc, val) => {
              const result = val.checkValidate();
              return acc && result;
            }, true);
            const loginUser = document.querySelector(
              `#${this.children.fields[0].props.idInput}`,
            )!.value;
            const passwordUser = document.querySelector(
              `#${this.children.fields[1].props.idInput}`,
            )!.value;
            if (valid) {
              console.log({ login: loginUser, password: passwordUser });
            }
          },
        },
        url: '',
        classes: 'login_form__btn login_form__link-login',
        type: 'submit',
      }),
    ];
    this.children.actions = buttons;
  }

  render() {
    return this.compile(template, { title: this.props.title });
  }
}
