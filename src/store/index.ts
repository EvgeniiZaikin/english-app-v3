import {createStore, AnyAction} from 'redux';
import {MakeStore, createWrapper, Context, HYDRATE} from 'next-redux-wrapper';

export interface State {
    tick: string;
}

// create your reducer
const reducer = (state: State = {tick: 'init'}, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload};
        case 'TICK':
            return {...state, tick: action.payload};
        default:
            return state;
    }
};

const makeStore: MakeStore<State> = (context: Context) => createStore(reducer);
export const wrapper = createWrapper<State>(makeStore, {debug: true});