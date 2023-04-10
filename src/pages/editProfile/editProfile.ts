import Block from '../../utils/Block';
import template from './editProfile.pug';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { DataField } from '../../components/dataField/dataField';

import { Link } from "../../components/Link/link";
import { LinkBack } from "../../components/linkBack/linkBack";

import { withStore } from "../../utils/Store";
import UserController from "../../controllers/UserController";
import { ChangeUserData } from '../../api/types';
import { getData } from "../../utils/getData";
import { EditAvatar } from "../../components/editAvatar/editAvatar";

interface IEditProfileProps {
  title: string;
  classes?: string;
  url?: string;
  children?: {
    fields: Block[];
    footer: Block[];
  };
}

export class EditProfileBase extends Block<IEditProfileProps> {
  init() {

    this.children.avatar = new EditAvatar({});

    const fields = [
      new DataField({
        label: 'Поле',
        name: 'Почта',
        classes: 'data',
        fieldValue: new Input({
          label: '',
          idInput: 'email',
          type: 'text',
          valueInput: this.props.email,
          inputClasses: '',
        }),
      }),
      new DataField({
        label: 'Поле',
        name: 'Логин',
        classes: 'data',
        fieldValue: new Input({
          label: '',
          idInput: 'login',
          type: 'text',
          valueInput: this.props.login,
          inputClasses: '',
        }),
      }),
      new DataField({
        label: 'Поле',
        name: 'Имя',
        classes: 'data',
        fieldValue: new Input({
          label: '',
          idInput: 'first_name',
          type: 'text',
          valueInput: this.props.first_name,
          inputClasses: '',
        }),
      }),
      new DataField({
        label: 'Поле',
        name: 'Фамилия',
        classes: 'data',
        fieldValue: new Input({
          label: '',
          idInput: 'second_name',
          type: 'text',
          valueInput: this.props.second_name,
          inputClasses: '',
        }),
      }),
      new DataField({
        label: 'Поле',
        name: 'Имя в чате',
        classes: 'data',
        fieldValue: new Input({
          label: '',
          idInput: 'display_name',
          type: 'text',
          valueInput: this.props.display_name,
          inputClasses: '',
        }),
      }),
      new DataField({
        label: 'Поле',
        name: 'Телефон',
        classes: 'data',
        fieldValue: new Input({
          label: '',
          idInput: 'phone',
          type: 'text',
          valueInput: this.props.phone,
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
        click: (e: Event) => this.onSubmit(e),
      },
    });
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    const data = getData(this.getContent()?.querySelector(".editProfile_info"));
  
    console.log(data);
    await UserController.changeUser(data as ChangeUserData);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      userName: this.props.display_name || 'Anonym',
    });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const EditProfile = withUser(EditProfileBase);
