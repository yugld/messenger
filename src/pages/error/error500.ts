import Block from '../../utils/Block';
import template from './error500.pug';

import { Link } from "../../components/Link/link";

interface Error500Props {
  title: string;
}

export class Error500 extends Block {
  constructor(props: Error500Props) {
    super(props);
  }

  init(): void {
    this.children.link = new Link({
      label: "Назад к чатам",
      to: "/chats",
      classes: "link error__link-back",
    });
  }

  render() {
    return this.compile(template, { title: "500" });
  }
}
