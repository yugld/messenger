import Block from '../../utils/Block';
import template from './popup.pug';
import { Button } from '../button/button';
import { ButtonClose } from '../buttonClose/buttonClose';

import UserController from '../../controllers/UserController';

export interface PopupProps {
    events?: Record<string, EventListenerOrEventListenerObject>;
}

export class Popup extends Block<PopupProps> {
    constructor(props: PopupProps) {
        super(props);
    }

    init() {
        this.children.buttonClose = new ButtonClose({
            events: {
                click: () => this.hide(),
            },
        });

        this.children.button = new Button({
            label: 'Поменять',
            classes: 'button popup_button',
            type: 'submit',
            events: {
                click: (e: Event) => this.onSubmit(e),
            },
        });
    }

    async onSubmit(e: Event) {
        e.preventDefault();
        const form = new FormData(document.querySelector('.popup_form') as HTMLFormElement);
        if (form.get('avatar')) {
            await UserController.changeAvatar(form);
            this.hide();
        }
    }

    render() {
        return this.compile(template, {});
    }
}
