import Block from '../../utils/Block';
import template from './inputField.pug';

interface IFieldProps {
  errorMsg?: string;
  idInput?: string;
  type?: string;
  events?: {
    click?: () => void;
    focusin?: () => void;
    focusout?: (env: Event) => void;
    blur?:(env: FocusEvent) => void;
  };
  classes?: string;
  valueInput?: string;
  errorInput?: string;
  placeholder?: string;
  RegExp?: any;
  RegInput?: any;
  name?: string;
  onBlur?: (env: FocusEvent) => void;
}

export class InputField extends Block<IFieldProps> {
  constructor(props: IFieldProps) {
    super(props);
    this.props.events = {
      blur: this.props.onBlur,
    };
  }

  render() {
    return this.compile(template, {
      idInput: this.props.idInput,
      type: this.props.type,
      classes: this.props.classes,
      valueInput: this.props.valueInput,
      errorMsg: this.props.errorMsg,
      placeholder: this.props.placeholder,
    });
  }
}
