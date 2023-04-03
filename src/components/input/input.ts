import Block from '../../utils/Block';
import { Validation } from '../../utils/validation';
import { InputField } from '../inputField/inputField';
import { ErrorText } from '../errorText/errorText';

import template from './input.pug';

interface InputProps {
  label: string;
  idInput?: string;
  type?: string;
  events?: {
    click?: () => void;
    focusin?: () => void;
    focusout?: (env: Event) => void;
  };
  classes?: string[];
  inputClasses?: string;
  valueInput?: string;
  errorText?: string;
  errorInput?: string;
  RegExp?: any;
  RegInput?: any;
  placeholder?: string;
}

export class Input extends Block<InputProps> {

  init() {
    this.children.inputField = new InputField({
      idInput: this.props.idInput,
      name: this.props.idInput,
      type: this.props.type,
      classes: this.props.inputClasses,
      valueInput: this.props.valueInput,
      placeholder: this.props.placeholder,
      onBlur: (env: FocusEvent) => {
        const val = (env.target as HTMLInputElement).value;
        const valId = (env.target as HTMLInputElement).id;
        this.checkValidate(val, valId);
      },
    });
    this.children.errorText = new ErrorText({
      errorText: '',
    });
  }

  checkValidate(val: string, valId: string) {
    if (val === undefined) {
      val = this.children.inputField.props.valueInput;
    }

    const validationSettings = Validation(valId);
    const regIn = new RegExp(validationSettings[1], 'i');
    const isValid = regIn.test(val);
    const inputClasses = this.children.inputField.props.classes;
    const arrClasses = inputClasses.split(' ');

    if (!isValid) {
      this.children.errorText.setProps({
        errorText: validationSettings[0],
      });
      if (!(arrClasses.indexOf('error_text') > 0)) {
        this.children.inputField.setProps({
          classes: inputClasses.push('error_text'),
          valueInput: val,
        });
      } else {
        this.children.inputField.setProps({
          classes: inputClasses,
          valueInput: val,
        });
      }
    } else {
      this.children.errorText.setProps({ errorText: '' });
      const strClasses = arrClasses
        .filter((val) => val != 'error_text')
        .join(' ');
      this.children.inputField.setProps({
        classes: strClasses,
        valueInput: val,
      });
    }
    return isValid;
  }

  render() {
    return this.compile(template, {
      label: this.props.label,
      idInput: this.props.idInput,
    });
  }
}
