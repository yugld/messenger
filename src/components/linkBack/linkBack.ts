import Block from '../../utils/Block';
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';
import template from './linkBack.pug';

interface ILinkProps extends PropsWithRouter {
    to: string;
    label: string;
    classes?: string;
    events?: Record<string, EventListenerOrEventListenerObject>;
}

class Link extends Block<ILinkProps> {
    constructor(props: ILinkProps) {
        super({
            ...props,
            events: {
                click: () => this.navigate()
            },
        });
    }

    navigate() {
        this.props.router.go(this.props.to);
    }

    render() {
        return this.compile(template, this.props);
    }
}

export const LinkBack = withRouter(Link);
