import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

interface IState {
    type: string,
    ruValue: string,
    category: string,
    enValue: string,
    enableCategories: Array<string>,
};

const initialState: IState = {
    type: `word`,
    ruValue: '',
    category: '',
    enValue: '',
    enableCategories: [],
};

const add: Reducer<IState, AnyAction> = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            const hydrateState = action.payload.add;
            return { ...hydrateState };
        default:
            return { ...state };
    }
};

export default add;