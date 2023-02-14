import { Input } from '../../components/input/input';

import { ButtonImg } from '../../components/buttonImg/buttonImg';
import Block from '../../utils/Block';
import template from './chats.pug';
import avatarIcon from '../../../static/images/avatar.png';
import menuIcon from '../../../static/images/menu.svg';
import imgPhoto from '../../../static/images/camera.png';
import statusReadIcon from '../../../static/images/statusRead.svg';
import arrowIcon from '../../../static/images/arrow.svg';
import attachIcon from '../../../static/images/attach.svg';

interface IChatProps {
    title: string;
    classes?: string[];
    url?: string;
    children?: {
        fields: Block[];
        footer: Block[];
    };
}

export class Chats extends Block<IChatProps> {
  init() {
    const message = new Input({
      label: '',
      idInput: 'message',
      type: 'text',
      valueInput: '',
      placeholder: 'Сообщение',
      inputClasses: 'input input_send',
      events: {
        focusin: () => {
          const messageText = document.querySelector(
            `#${this.children.message.props.idInput}`,
          );
          messageText?.classList.remove(ERROR_TEXT);
        },
      },
    });
    this.children.message = message;

    const buttons = [
      new ButtonImg({
        label: '',
        events: {
          click: () => {
            event.preventDefault();
            const messageInput = document.querySelector(
              `#${this.children.message.props.idInput}`,
            )!.value;
            if (messageInput) {
              console.log({ message: messageInput });
            } else {
              console.log('Не может быть пустым');
            }
          },
        },
        url: '',
        classes: 'btn_send',
        type: 'submit',
      }),
    ];
    this.children.actions = buttons;
  }

  render() {
    return this.compile(template, {
      title: this.props.title,
      avatarIcon,
      menuIcon,
      imgPhoto,
      statusReadIcon,
      arrowIcon,
      attachIcon,
    });
  }
}
