import { createStore, applyMiddleware } from 'redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import { isDevelop } from '@utils/functions';
import reducers from './reducers';

export type ReducersState = ReturnType<typeof reducers>;

export const makeStore: MakeStore<ReducersState> = () => createStore(reducers, applyMiddleware(thunk));
export const wrapper = createWrapper<ReducersState>(makeStore, { debug: isDevelop() });
