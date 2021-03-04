import { createStore, applyMiddleware } from 'redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import reducers from './reducers';

export type reducersState = ReturnType<typeof reducers>;

export const makeStore: MakeStore<reducersState> = () => createStore(reducers, applyMiddleware(thunk));
export const wrapper = createWrapper<reducersState>(makeStore, { debug: true });
