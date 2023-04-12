import Block from "../../utils/Block";
import template from "./messenger.pug";
import MessagesController, {
  Message as MessageInfo,
} from "../../controllers/MessagesController";
import ChatsController from "../../controllers/ChatsController";
import { withStore } from "../../utils/Store";

import { Message } from "../Message";
import { Input } from "../input/input";
import { Button } from "../button/button";
import { PopupAdd } from "../popupAdd/popupAdd";
import { PopupUserList } from "../popupUserList/popupUserList";


import { ChatInfo, User } from "../../api/types";

interface MessengerProps {
  selectedChat: number | undefined;
  messages: MessageInfo[];
  userId: number;
}

class MessengerBase extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super(props);
  }
  protected init() {
    this.children.popupAdd = new PopupAdd({});
    this.children.popupDelete = new PopupUserList({});

    this.children.messages = this.createMessages(this.props);

    this.children.deleteChat = new Button({
      label: "Удалить этот чат",
      events: {
        click: async () => {
          const chatId = this.props.selectedChat;
          await ChatsController.deleteChat(chatId!);
        },
      },
      classes: "button button_delete_chat",
    });

    this.children.addUser = new Button({
      label: "Добавить пользователя",
      events: {
        //@ts-ignore
        click: () => (this.children.popupAdd as PopupAdd).show(),
      },
      classes: "button button_add_user",
    });

    this.children.deleteUser = new Button({
      label: "Удалить пользователя",
      events: {
        //@ts-ignore
        click: () => (this.children.popupDelete as PopupUserList).show(),
      },
      classes: "button button_delete_user",
    });

    this.children.input = new Input({
      type: "text",
      inputClasses: 'input_message',
      idInput: "message",
      label: "Введите сообщение",
    });

    this.children.button = new Button({
      label: "Отправить",
      type: "button",
      classes: "button main-button",
      events: {
        click: () => {
          const input = this.children.input as Input;
          const message = (
            document.querySelector(".input_message") as HTMLInputElement
          ).value;
          console.log(message);
          input.setValue("");
          if (message != '') {
            MessagesController.sendMessage(this.props.selectedChat!, message);
          };

        },
      },
    });
  }

  protected componentDidUpdate(
    _oldProps: MessengerProps,
    _newProps: MessengerProps
  ): boolean {
    this.children.messages = this.createMessages(_newProps);

    return true;
  }

  private createMessages(props: MessengerProps) {
    return props.messages.map((data) => {
      return new Message({ ...data, isMine: props.userId === data.user_id });
    });
  }


  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}


const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id,
  };
});

export const Messenger = withSelectedChatMessages(
  MessengerBase as unknown as typeof Block
);
