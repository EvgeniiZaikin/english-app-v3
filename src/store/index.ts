import {createStore, AnyAction, combineReducers} from 'redux';
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

const reducers = combineReducers({
    test: reducer, 
});

export type reducersState = ReturnType<typeof reducers>;

const TEST = (state: reducersState, action: AnyAction) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      }
      return nextState
    } else {
      return reducers(state, action)
    }
  }

const makeStore: MakeStore<State> = (context: Context) => createStore(TEST);
export const wrapper = createWrapper<State>(makeStore, {debug: true});