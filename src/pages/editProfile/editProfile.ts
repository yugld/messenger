import Block from '../../utils/Block';
import template from './editProfile.pug';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { DataField } from '../../components/dataField/dataField';
import noAvavtarIcon from '../../../static/images/avatar_no.svg';

import { Link } from "../../components/Link/link";
import { LinkBack } from "../../components/linkBack/linkBack";

interface IEditProfileProps {
  title: string;
  classes?: string[];
  url?: string;
  children?: {
    fields: Block[];
    footer: Block[];
  };
}

export class EditProfile extends Block<IEditProfileProps> {

  init() {
    const fields = [
      new DataField({
        label: 'Поле',
        name: 'Почта',
        classes: ['data'],
        fieldValue: new Input({
          label: '',
          idInput: 'email',
          type: 'text',
          valueInput: 'pochta@yandex.ru',
          inputClasses: '',
        }),
      }),
      new DataField({
        label: 'Поле',
        name: 'Логин',
        classes: ['data'],
        fieldValue: new Input({
          label: '',
          idInput: 'login',
          type: 'text',
          valueInput: 'ivanivanov',
          inputClasses: '',
        }),
      }),
      new DataField({
        label: 'Поле',
        name: 'Имя',
        classes: ['data'],
        fieldValue: new Input({
          label: '',
          idInput: 'first_name',
          type: 'text',
          valueInput: 'Иван',
          inputClasses: '',
        }),
      }),
      new DataField({
        label: 'Поле',
        name: 'Фамилия',
        classes: ['data'],
        fieldValue: new Input({
          label: '',
          idInput: 'second_name',
          type: 'text',
          valueInput: 'Иванов',
          inputClasses: '',
        }),
      }),
      new DataField({
        label: 'Поле',
        name: 'Имя в чате',
        classes: ['data'],
        fieldValue: new Input({
          label: '',
          idInput: 'display_name',
          type: 'text',
          valueInput: 'Иван',
          inputClasses: '',
        }),
      }),
      new DataField({
        label: 'Поле',
        name: 'Телефон',
        classes: ['data'],
        fieldValue: new Input({
          label: '',
          idInput: 'phone',
          type: 'text',
          valueInput: '+79099673030',
          inputClasses: '',
        }),
      }),
      new DataField({
        label: 'Поле',
        name: 'Старый пароль',
        classes: ['data'],
        fieldValue: new Input({
          label: '',
          idInput: 'oldPassword',
          type: 'password',
          valueInput: '12345qwertyQ',
          inputClasses: '',
        }),
      }),
      new DataField({
        label: 'Поле',
        name: 'Новый пароль',
        classes: ['data'],
        fieldValue: new Input({
          label: '',
          idInput: 'newPassword',
          type: 'password',
          valueInput: '12345qwertyQQ',
          inputClasses: '',
        }),
      }),
      new DataField({
        label: 'Поле',
        name: 'Повторите новый пароль',
        classes: ['data'],
        fieldValue: new Input({
          label: '',
          idInput: 'passwordYet',
          type: 'password',
          valueInput: '12345qwertyQQ',
          inputClasses: '',
        }),
      }),
    ];
    this.children.fields = fields;

    this.children.linkToProfile = new LinkBack({
      to:'/profile',
      classes: 'link_back',
    });

    this.children.buttonSave = new Button({
      label: 'Сохранить',
      type: "submit",
      classes: 'button main-button editProfile_button editProfile_button_saveData',
      events: {
        click: () => this.onSubmit(),
      },
    });
  }

  render() {
    return this.compile(template, {
      noAvavtarIcon,
    });
  }
}
