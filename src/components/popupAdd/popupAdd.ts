import Block from '../../utils/Block';
import template from './popupAdd.pug';
import { Button } from '../button/button';
import { ButtonClose } from '../buttonClose/buttonClose';
import { Input } from '../input/input';
import { getData } from '../../utils/getData';
import UserController from '../../controllers/UserController';
import { withStore } from '../../hocs/withStore';
import { UserItem } from '../userItem/userItem';
import ChatsController from '../../controllers/ChatsController';

import { User } from '../../api/types';

interface PopupAddUserToChatProps {
    userSearchResultList?: User[];
    selectedChat: number;
}

export class PopupAddUserToChatBase extends Block<PopupAddUserToChatProps> {
  constructor(props: PopupAddUserToChatProps) {
    super(props);
    if (props.userSearchResultList?.length) {
      this.show();
    }
  }

  init() {
    this.children.closeButton = new ButtonClose({
      events: {
        click: () => this.hide(),
      },
    });

    this.children.input = new Input({
      label: '',
      name: 'user_name',
      idInput: 'messenger',
      type: 'text',
      inputClasses: 'input input_add_user',
      events: {
        focusin: () => {
          const messageText = document.querySelector(
            `#${this.children.input[0].props.idInput}`,
          );
          messageText?.classList.remove();
        },
      },
    });

    this.children.button = new Button({
      label: 'Add',
      classes: 'button popup_button',
      type: 'submit',
      events: {
        click: async (e: Event) => {
          e.preventDefault();
          const data = (document.querySelector('.input_add_user') as HTMLInputElement).value;
          console.log(data);
          await ChatsController.addUserToChat(this.props.selectedChat, Number(data));
          this.hide();
        },
      },
    });
    this.children.userList = this.createUserList(this.props);
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    const form = this.getContent()?.querySelector('.popup_form_add_user') as HTMLElement | null;
    const data = getData(form);
    await UserController.searchUser(data.user_name);
  }

  createUserList(props: PopupAddUserToChatProps) {
    return (props.userSearchResultList || []).map(((user) => new UserItem({
      name: `${user.login} (${user.first_name} ${user.second_name})`,
      buttonName: 'добавить',
      onClick: () => this.addUserToChat(user),
    })));
  }

  addUserToChat(user: User) {
    ChatsController.addUserToChat(this.props.selectedChat, user.id);
  }

  componentDidUpdate(_oldProps: PopupAddUserToChatProps, newProps: PopupAddUserToChatProps): boolean {
    this.children.userList = this.createUserList(newProps);
    return true;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export const PopupAdd = withStore((state) => ({
  userSearchResultList: state.userSearchResultList,
  selectedChat: state.selectedChat,
}))(PopupAddUserToChatBase);
