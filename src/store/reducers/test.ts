import { AnyAction, Reducer } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

export const TICK: string = 'TICK';

interface IAction<P> {
    type: string,
    payload?: P,
};

export function action<P>(type: string, payload: P): IAction<P> {
    return { type, payload };
}

export const setTick = (data: string) => action<string>(TICK, data);

export interface State {
    tick: string;
}

const initialState: State = {
    tick: 'init',
};

// create your reducer
const reducer: Reducer<State, AnyAction> = (state: State = initialState, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            const hydrateState = action.payload.test;
            return {...hydrateState};
        case TICK:
            return {...state, tick: action.payload};
        default:
            return {...state};
    }
};

export default reducer;