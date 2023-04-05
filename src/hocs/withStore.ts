import Block from '../utils/Block';
import { StoreEvents, store }  from '../utils/Store';
import {isEqual} from '../utils/isEqual';

export const withStore = (mapStateToProps: (state: any) => any) => (Component: typeof Block<any>) => {
    let currentState: any;
    return class WithStore extends Component {
        constructor(props: Record<string, any>) {
            currentState = mapStateToProps(store.getState());
            super({ ...props, ...currentState });

            store.on(StoreEvents.Updated, (newState) => {
                const newPropsFromState = mapStateToProps(newState);

                if (isEqual(currentState, newPropsFromState)) {
                    return;
                }

                currentState = { ...newPropsFromState };

                this.setProps({ ...currentState });
            });
        }
    };
};
