import Block from '../../utils/Block';
import template from './buttonImg.pug';

interface IButtonProps {
  label: string;
  events?: {
    click: () => void;
  };
  classes?: string;
  url: string;
  type?: 'button' | 'submit';

}

export class ButtonImg extends Block<IButtonProps> {
  render() {
    return this.compile(template, { ...this.props });
  }
}
