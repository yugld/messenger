import Block from '../../utils/Block';
import template from './editAvatar.pug';
import  {Popup} from '../popup/popup';
import { ButtonEditAvatar } from '../buttonEditAvatar/buttonEditAvatar';
import { withStore } from '../../hocs/withStore';

export interface EditAvatarProps {
    classes?: string;
    avatar?: string;
    events?: Record<string, EventListenerOrEventListenerObject>;
}

export class EditAvatarBase extends Block<EditAvatarProps> {
    constructor(props: EditAvatarProps) {
        super(props);
    }

    init() {
        this.children.popup = new Popup({});
        this.children.button = this.createAvatarButton(this.props);
    }

    createAvatarButton(props: EditAvatarProps) {
        return new ButtonEditAvatar({
            classes: props.class,
            avatar: `https://ya-praktikum.tech/api/v2/resources${props.avatar}`,
            events: {
                click: () => {
                    (this.children.popup as Popup).show();
                },
            },
        });
    }

    componentDidUpdate(_oldProps: EditAvatarProps, newProps: EditAvatarProps): boolean {
        this.children.button = this.createAvatarButton(newProps);
        return true;
    }

    render() {
        return this.compile(template, this.props);
    }
}

export const EditAvatar = withStore((state) => {
    return { ...state.user };
})(EditAvatarBase);
