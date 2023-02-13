import Block from '../../utils/Block';
import template from './dataField.pug';

interface IDataFieldProps {
  label: string;
  idInput?: string;
  type?: string;
  events?: {
    click: () => void;
  };
  classes?: string[];
  name?: string | Block;
  value?: string;
  fieldName?: Block;
  fieldValue?: Block;
}

export class DataField extends Block<IDataFieldProps> {

  render() {
    return this.compile(template, {
      label: this.props.label,
      idInput: this.props.idInput,
      type: this.props.type,
      name: this.props.name,
      value: this.props.value,
    });
  }
}
