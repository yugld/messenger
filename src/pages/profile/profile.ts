import Block from '../../utils/Block';
import template from './profile.pug';
import { DataField } from '../../components/dataField/dataField';

import noAvavtarIcon from '../../../static/images/avatar_no.svg';

import { withStore } from '../../utils/Store';
import AuthController from '../../controllers/AuthController';
import { Link } from "../../components/Link/link";

interface ProfileProps {
  title: string;
  classes?: string[];
  url?: string;
  children?: {
    fields: Block[];
    footer: Block[];
  };
}

class ProfilePage extends Block<ProfileProps> {

  init() {
    AuthController.fetchUser();

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

    const links = [
      new Link({
        label: 'Изменить данные',
        to: '/editProfile',
      }),
      new Link({
        label: 'Изменить пароль',
        to: '/editProfile',
      }),
      new Link({
        label: 'Выйти',
        to: '/',
        events: {
          click: () => {
            AuthController.logout();
          }
        }
      }),
    ];
    this.children.links = links;

  }

  render() {
    return this.compile(template, {
      noAvavtarIcon,
    });
  }
}

const withUser = withStore((state) => ({ ...state.user }))

export const Profile = withUser(ProfilePage);
