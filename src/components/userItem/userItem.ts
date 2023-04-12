import Block from '../../utils/Block';
import template from './userItem.pug';
import { Button } from '../button/button';

interface UserItemProps {
    name: string;
    buttonName: string;
    onClick: () => void;
}

export class UserItem extends Block<UserItemProps> {
  constructor(props: UserItemProps) {
    super(props);
  }

  init() {
    this.children.deleteButton = new Button({
      text: this.props.buttonName,
      type: 'submit',
      classes: 'link_delete_user',
      events: {
        click: (e) => {
          e.preventDefault();
          this.props.onClick();
          console.log('delete');
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
