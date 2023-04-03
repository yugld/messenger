import Block from '../../utils/Block';
import template from './profile.pug';
import { DataField } from '../../components/dataField/dataField';

import noAvavtarIcon from '../../../static/images/avatar_no.svg';

import { withStore } from '../../utils/Store';
import AuthController from '../../controllers/AuthController';
import { Link } from "../../components/Link/link";
import { LinkBack } from "../../components/linkBack/linkBack";
import { Button } from '../../components/button/button';

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

    this.children.linkToChats = new LinkBack({
      to:'/chats',
      classes: 'link_back',
    });

    const links = [
      new Link({
        to: '/editprofile',
        label: 'Изменить данные',
        classes: 'link profile_buttons__changeData',
      }),
      new Link({
        to: '/editprofile',
        label: 'Изменить пароль',
        classes: 'link profile_buttons__changePassword',
      }),
    ];
    this.children.links = links;

    this.children.exitLink = new Button({
      label: 'Выйти',
      classes: 'profile_buttons__logout link__red',
      events: {
        click: () => {
          AuthController.logout();
        }
      }
    })

  }

  render() {
    return this.compile(template, {
      noAvavtarIcon,
    });
  }
}

const withUser = withStore((state) => ({ ...state.user }))

export const Profile = withUser(ProfilePage);
