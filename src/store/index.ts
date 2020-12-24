import {createStore} from 'redux';
import {MakeStore, createWrapper, Context} from 'next-redux-wrapper';
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

// const x = { [$CombinedState]: undefined };

/* const TEST = 
    (state: reducersState, action: AnyAction) : Reducer<reducersState, AnyAction> => 
    action.type === HYDRATE ? { ...x, ...state, ...action.payload } : reducers(state, action); */

export const makeStore: MakeStore<reducersState> = (context: Context) => createStore(reducers);
export const wrapper = createWrapper<reducersState>(makeStore, { debug: true });