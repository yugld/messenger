import Block from '../../utils/Block';
import template from './error404.pug';

interface Error404Props {
  title: string;
}

export class Error404 extends Block<Error404Props> {
  render() {
    return this.compile(template, { ...this.props });
  }
}
