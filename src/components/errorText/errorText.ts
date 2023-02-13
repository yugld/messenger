import Block from '../../utils/Block';
import template from './errorText.pug';

interface IErrorTextProps {
  errorText: string;
}

export class ErrorText extends Block<IErrorTextProps> {

  render() {
    return this.compile(template, {
      errorText: this.props.errorText,
    });
  }
}
