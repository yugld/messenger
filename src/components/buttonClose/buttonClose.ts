import Block from '../../utils/Block';
import template from './buttonClose.pug';

export interface ButtonCloseProps {
    events?: Record<string, EventListenerOrEventListenerObject>;
}

export class ButtonClose extends Block<ButtonCloseProps> {
    constructor(props: ButtonCloseProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
