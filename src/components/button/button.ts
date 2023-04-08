import Block from '../../utils/Block';

import template from './button.pug';

interface IButtonProps {
  label?: string;
  events?: Record<string, EventListenerOrEventListenerObject>;
  classes?: string;
  url?: string;
  type?: 'button' | 'submit';
  text?: string;

}

export class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props});
  }
}
