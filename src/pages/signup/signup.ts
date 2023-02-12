import Block from '../../utils/Block';
import template from './signUp.pug';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';

interface SignUpProps {
    title: string;
    classes?: string[];
    url?: string;
    children?: {
        fields: Block[];
        footer: Block[];
    };
}

export class SignUp extends Block {
  constructor(props: SignUpProps) {
    super(props);
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
        events: {
          click: () => {
            event.preventDefault();
            const valid = this.children.fields.reduce((acc, val) => {
              const result = val.checkValidate();
              return acc && result;
            }, true);
            const emailUser = document.querySelector(
              `#${this.children.fields[0].props.idInput}`,
            )!.value;
            const loginUser = document.querySelector(
              `#${this.children.fields[1].props.idInput}`,
            )!.value;
            const firstNameUser = document.querySelector(
              `#${this.children.fields[2].props.idInput}`,
            )!.value;
            const secondNameUser = document.querySelector(
              `#${this.children.fields[3].props.idInput}`,
            )!.value;
            const phoneUser = document.querySelector(
              `#${this.children.fields[4].props.idInput}`,
            )!.value;
            const passwordUser = document.querySelector(
              `#${this.children.fields[5].props.idInput}`,
            )!.value;
            if (valid) {
              console.log({
                Почта: emailUser,
                Логин: loginUser,
                Имя: firstNameUser,
                Фамилия: secondNameUser,
                Телефон: phoneUser,
                Пароль: passwordUser,
              });
            }
          },
        },
        url: '',
        classes: 'button main-button',
        type: 'submit',
      }),
    ];
    this.children.actions = buttons;
  }

  render() {
    return this.compile(template, { title: this.props.title });
  }
}
