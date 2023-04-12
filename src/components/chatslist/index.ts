import Block from '../../utils/Block';
import template from './chatsList.pug';
import router from '../../utils/Router';
import { store, withStore } from '../../utils/Store';

import { ChatInfo } from '../../api/ChatsAPI';
import ChatsController from '../../controllers/ChatsController';

import { Chat } from '../chat';
import { Link } from '../Link/link';
import { Button } from '../button/button';
import { PopupCreate } from '../popupCreate/popup';

interface ChatsListProps {
  chats: ChatInfo[];
  isLoaded: boolean;
  avatar?: string;
}

class ChatsListBase extends Block<ChatsListProps> {
  constructor(props: ChatsListProps) {
    super({ ...props });
  }

  protected init() {
    this.children.popupCreateChat = new PopupCreate({});

    this.children.linkToProfile = new Link({
      to: '/profile',
      label: 'Мой профиль',
      classes: 'link_profile',
    });

    this.children.chats = this.createChats(this.props);

    /* this.children.createChatInput = new Input({
      type: "text",
      label: "Создать чат(введите название)",
      className: "create-chat",
      name: "create-chat",
    }); */

    this.children.buttonCreateChat = new Button({
      label: 'Создать чат',
      type: 'submit',
      classes: 'button chatlist_create__button',
      events: {
        click: () => (this.children.popupCreateChat as PopupCreate).show(),
      },
    });

    /* this.children.createChat = new Button({
      classes: "button main-button",
      label: "Создать чат",
      events: {
        click: async () => {
          const data = (
            document.querySelector(".create-chat .input") as HTMLInputElement
          ).value;

          await ChatsController.create(data);
        },
      },
    }); */
  }

  protected componentDidUpdate(_oldProps: ChatsListProps, _newProps: ChatsListProps): boolean {
    this.children.chats = this.createChats(_newProps);
    return true;
  }

  private createChats(props: ChatsListProps) {
    return props.chats.map((data) => new Chat({
      ...data,
      avatar: `https://ya-praktikum.tech/api/v2/resources${data?.avatar}`,
      events: {
        click: () => {
          ChatsController.selectChat(data.id);
        },
      },
    }));
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));

export const ChatsList = withChats(ChatsListBase as unknown as typeof Block);
