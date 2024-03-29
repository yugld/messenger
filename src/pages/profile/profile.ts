import Block from '../../utils/Block';
import template from './profile.pug';
import { DataField } from '../../components/dataField/dataField';

import store, { withStore } from '../../utils/Store';
import AuthController from '../../controllers/AuthController';
import { Link } from '../../components/Link/link';
import { LinkBack } from '../../components/linkBack/linkBack';
import { Button } from '../../components/button/button';
import { AvatarProfile } from '../../components/avatarProfile/avatarProfile';

interface ProfileProps {
  title?: string;
  classes?: string;
  url?: string;
  children?: {
    fields: Block[];
    footer: Block[];
  };
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  avatar?: string;
}

class ProfileBase extends Block<ProfileProps> {
  constructor() {
    const state = store.getState();
    super(state.user || {});
  }

  init() {
    AuthController.fetchUser();

    this.children.avatarProfile = new AvatarProfile({
      avatar: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`
    });

    this.children.email = new DataField({
      label: 'Поле',
      name: 'Почта',
      value: this.props.email,
      classes: 'data',
    });
    this.children.login = new DataField({
      label: 'Поле',
      name: 'Логин',
      value: this.props.login,
      classes: 'data',
    });
    this.children.first_name = new DataField({
      label: 'Поле',
      name: 'Имя',
      value: this.props.first_name,
      classes: 'data',
    });
    this.children.second_name = new DataField({
      label: 'Поле',
      name: 'Фамилия',
      value: this.props.second_name,
      classes: 'data',
    });
    this.children.display_name = new DataField({
      label: 'Поле',
      name: 'Имя в чате',
      value: this.props.display_name,
      classes: 'data',
    });
    this.children.phone = new DataField({
      label: 'Поле',
      name: 'Телефон',
      value: this.props.phone,
      classes: 'data',
    });

    this.children.linkToChats = new LinkBack({
      to: '/messenger',
      classes: 'link_back',
    });

    this.children.linkEditProfile = new Link({
      to: '/editprofile',
      label: 'Изменить данные',
      classes: 'link profile_buttons__changeData',
    });
    
    this.children.linkEditPassword = new Link({
      to: '/editpassword',
      label: 'Изменить пароль',
      classes: 'link profile_buttons__changePassword',
    });


    this.children.exitLink = new Button({
      label: 'Выйти',
      classes: 'profile_buttons__logout link__red',
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });
  }

  render() {
    return this.compile(template, {
      name: this.props.display_name || 'Anonym',
      avatar: this.props.avatar,
      props: this.props,
    });
  }
}

export const Profile = withStore((state) => state.user || {})(ProfileBase as unknown as typeof Block);
