import Block from '../../utils/Block';
import template from './error404.pug';

import { Link } from "../../components/Link/link";

interface Error404Props {
  title: string;
}

export class Error404 extends Block<Error404Props> {
  constructor(props: Error404Props) {
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
    return this.compile(template, { title: "404" });
  }
}
