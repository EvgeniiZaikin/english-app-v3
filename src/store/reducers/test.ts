import { AnyAction, Reducer } from 'redux';

export interface State {
    tick: string;
}

// create your reducer
const reducer: Reducer<State, AnyAction> = (state: State = {tick: 'init'}, action: AnyAction) => {
    switch (action.type) {
        case 'TICK':
            return {...state, tick: action.payload};
        default:
            return state;
    }
};

export default reducer;