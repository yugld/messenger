import Block from '../../utils/Block';
import template from './popup.pug';
import { Button } from '../button/button';
import { ButtonClose } from '../buttonClose/buttonClose';
import { getData } from '../../utils/getData';

import { Input } from '../input/input';
import ChatsController from '../../controllers/ChatsController';

export interface PopupCreateProps {
    events?: Record<string, EventListenerOrEventListenerObject>;
}

export class PopupCreate extends Block<PopupCreateProps> {
  constructor(props: PopupCreateProps) {
    super(props);
  }

  init() {
    this.children.input = new Input({
      label: 'Не может быть пустым',
      idInput: 'input_create_chat',
      type: 'text',
      inputClasses: 'input input_popup input_create_chat',
    });
    this.children.buttonClose = new ButtonClose({
      events: {
        click: () => this.hide(),
      },
    });

    this.children.button = new Button({
      label: 'Создать чат',
      classes: 'button popup_button',
      type: 'submit',
      events: {
        click: async (e: Event) => {
          e.preventDefault();
          const data = (document.querySelector('.input_create_chat') as HTMLInputElement).value;
          console.log(data);
          await ChatsController.create(data);
          this.hide();
        },

      },
    });
  }

  render() {
    return this.compile(template, {});
  }
}
