import Block from '../../utils/Block';
import template from './buttonEditAvatar.pug';

export interface EditAvatarProps {
    class?: string;
    avatar?: string;
    events?: Record<string, EventListenerOrEventListenerObject>;
}

export class ButtonEditAvatar extends Block<EditAvatarProps> {
  constructor(props: EditAvatarProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
