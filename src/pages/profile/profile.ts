import Block from '../../utils/Block';
import template from './profile.pug';
import { DataField } from '../../components/dataField/dataField';

import store, { withStore } from '../../utils/Store';
import AuthController from '../../controllers/AuthController';
import { Link } from "../../components/Link/link";
import { LinkBack } from "../../components/linkBack/linkBack";
import { Button } from '../../components/button/button';
import { EditAvatar } from "../../components/editAvatar/editAvatar";


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

  constructor() {
    const state = store.getState();
    super(state.user || {});
  }

  init() {
    AuthController.fetchUser();

    this.children.avatar = new EditAvatar({});

    const fields = [
      new DataField({
        label: 'Поле',
        name: 'Почта',
        value: this.props.email,
        classes: ['data'],
      }),
      new DataField({
        label: 'Поле',
        name: 'Логин',
        value: this.props.login,
        classes: ['data'],
      }),
      new DataField({
        label: 'Поле',
        name: 'Имя',
        value: this.props.first_name,
        classes: ['data'],
      }),
      new DataField({
        label: 'Поле',
        name: 'Фамилия',
        value: this.props.second_name,
        classes: ['data'],
      }),
      new DataField({
        label: 'Поле',
        name: 'Имя в чате',
        value: this.props.display_name,
        classes: ['data'],
      }),
      new DataField({
        label: 'Поле',
        name: 'Телефон',
        value: this.props.phone,
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
        to: '/editpassword',
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
      name: this.props.display_name || "Anonym",
      props: this.props,
    });
  }
}

export const Profile = withStore((state) => { return state.user || {};})(ProfilePage);
