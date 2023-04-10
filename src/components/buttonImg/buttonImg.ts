import Block from '../../utils/Block';
import template from './buttonImg.pug';

interface IButtonProps {
  label?: string;
    events?: Record<string, EventListenerOrEventListenerObject>;
  classes?: string;
  url: string;
  type?: 'button' | 'submit';

}

export class ButtonImg extends Block<IButtonProps> {

  render() {
    return this.compile(template, { ...this.props });
  }
}
