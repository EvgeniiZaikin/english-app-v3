import { HYDRATE } from 'next-redux-wrapper';
import { Reducer, AnyAction } from 'redux';

import { ISearchState } from './types';
import { SET_SEARCH_INFO, RESET_SEARCH_INFO, SET_SEARCH_VALUE } from './actions';

const initialState: ISearchState = {
  searchValue: '',
  ruValue: 'Слово не определено',
  enValue: 'Translate is not define',
  category: 'Категория не определена',
  isExpression: false,
  isSlang: false,
  isAbuse: false,
  isAbbreviation: false,
  transcription: null,
};

const search: Reducer<ISearchState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.search };
    case SET_SEARCH_INFO:
      return {
        ...state,
        ruValue: action.payload.ruValue,
        enValue: action.payload.enValue,
        category: action.payload.category,
        isExpression: action.payload.isExpression,
        isSlang: action.payload.isSlang,
        isAbuse: action.payload.isAbuse,
        isAbbreviation: action.payload.isAbbreviation,
        transcription: action.payload.transcription,
      };
    case RESET_SEARCH_INFO:
      return {
        ...initialState,
      };
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      };
    default:
      return { ...state };
  }
};

export default search;
