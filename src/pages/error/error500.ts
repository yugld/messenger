import Block from '../../utils/Block';
import template from './error500.pug';

interface Error500Props {
  title: string;
}

export class Error500 extends Block<Error500Props> {

  render() {
    return this.compile(template, { ...this.props });
  }
}
