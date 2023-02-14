import Block from '../../utils/Block';
import template from './profile.pug';
import { DataField } from '../../components/dataField/dataField';

import noAvavtarIcon from '../../../static/images/avatar_no.svg';

interface ProfileProps {
  title: string;
  classes?: string[];
  url?: string;
  children?: {
    fields: Block[];
    footer: Block[];
  };
}

export class Profile extends Block<ProfileProps> {
  init() {
    const fields = [
      new DataField({
        label: 'Поле',
        name: 'Почта',
        value: 'pochta@yandex.ru',
        classes: ['data'],
      }),
      new DataField({
        label: 'Поле',
        name: 'Логин',
        value: 'ivanivanov',
        classes: ['data'],
      }),
      new DataField({
        label: 'Поле',
        name: 'Имя',
        value: 'Иван',
        classes: ['data'],
      }),
      new DataField({
        label: 'Поле',
        name: 'Фамилия',
        value: 'Иванов',
        classes: ['data'],
      }),
      new DataField({
        label: 'Поле',
        name: 'Имя в чате',
        value: 'Иван',
        classes: ['data'],
      }),
      new DataField({
        label: 'Поле',
        name: 'Телефон',
        value: '+7 (909) 967 30 30',
        classes: ['data'],
      }),
    ];
    this.children.fields = fields;
  }

  render() {
    return this.compile(template, {
      noAvavtarIcon,
    });
  }
}
