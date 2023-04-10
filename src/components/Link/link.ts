import Block from '../../utils/Block';
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';
import template from './link.pug';

interface LinkProps extends PropsWithRouter {
  to: string;
  label: string;
  classes?: string;
  events?: Record<string, EventListenerOrEventListenerObject>;
}

class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
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

export const Link = withRouter(BaseLink);
