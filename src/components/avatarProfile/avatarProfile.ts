import Block from '../../utils/Block';
import template from './avatarProfile.pug';

export interface EditAvatarProps {
    class?: string;
    avatar?: string;
    events?: Record<string, EventListenerOrEventListenerObject>;
}

export class AvatarProfile extends Block<EditAvatarProps> {
  constructor(props: EditAvatarProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
