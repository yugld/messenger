import Block from '../../utils/Block';
import template from './editPassword.pug';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { DataField } from '../../components/dataField/dataField';
import noAvavtarIcon from '../../../static/images/avatar_no.svg';

import { LinkBack } from '../../components/linkBack/linkBack';

import { withStore } from '../../utils/Store';
import UserController from '../../controllers/UserController';
import { ChangePasswordData } from '../../api/types';
import { getData } from '../../utils/getData';

interface IEditProfileProps {
  title: string;
  classes?: string;
  url?: string;
  children?: {
    fields: Block[];
    footer: Block[];
  };
  display_name:string;
  newPassword: string;
  oldPassword: string;
}

export class EditPasswordBase extends Block<IEditProfileProps> {
  constructor(props: IEditProfileProps) {
    super(props);
  }

  init() {
    this.children.oldPassword = new DataField({
        label: '',
        name: 'Старый пароль',
        classes: 'data',
        fieldValue: new Input({
          label: '',
          idInput: 'oldPassword',
          type: 'password',
          valueInput: this.props.oldPassword,
          inputClasses: ''
        }),
      });
      this.children.newPassword = new DataField({
        label: '',
        name: 'Новый пароль',
        classes: 'data',
        fieldValue: new Input({
          label: '',
          idInput: 'newPassword',
          type: 'password',
          valueInput: this.props.newPassword,
          inputClasses: ''
        })
      });
      this.children.repeatNewPassword = new DataField({
        label: '',
        name: 'Повторите новый пароль',
        classes: 'data',
        fieldValue: new Input({
          label: '',
          idInput: 'passwordYet',
          type: 'password',
          valueInput: this.props.newPassword,
          inputClasses: ''
        })
      });

    this.children.linkToProfile = new LinkBack({
      to: '/profile',
      classes: 'link_back',
    });

    this.children.buttonSave = new Button({
      label: 'Сохранить',
      type: 'submit',
      classes: 'button main-button editProfile_button editProfile_button_saveData',
      events: {
        click: (e: Event) => this.onSubmit(e),
      },
    });
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    const data = getData(this.getContent()?.querySelector('.editProfile_info'));

    console.log(data);

    await UserController.changePassword(data as ChangePasswordData);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      noAvavtarIcon,
      userName: this.props.display_name || 'Anonym',
    });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const EditPassword = withUser(EditPasswordBase as unknown as typeof Block);
