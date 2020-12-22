import {createStore, AnyAction, Reducer} from 'redux';
import {MakeStore, createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import reducers from './reducers';

export type reducersState = ReturnType<typeof reducers>;

/*const TEST = (state: reducersState, action: AnyAction) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      }
      return nextState
    } else {
      return reducers(state, action)
    }
  }*/

const TEST: Reducer<reducersState, AnyAction> = 
    (state: reducersState, action: AnyAction) => 
    action.type === HYDRATE ? { ...state, ...action.payload } : reducers(state, action);

const makeStore: MakeStore<reducersState> = (context: Context) => createStore(TEST);
export const wrapper = createWrapper<reducersState>(makeStore, {debug: true});