import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { ICreateState } from './types';
import { CHANGE_FIELD, RESET_CREATE_FIELDS, SET_EXIST_CATEGORIES } from './actions';

const initialState: ICreateState = {
  entity: 'word',
  existsCategory: '',
  category: '',
  ruValue: '',
  enValue: '',
  transcription: '',
  isExpression: false,
  isSlang: false,
  isAbuse: false,
  isAbbreviation: false,
  listExistCategories: [],
};

const create: Reducer<ICreateState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.create };
    case CHANGE_FIELD:
      return { ...state, [action.payload.field]: action.payload.value };
    case RESET_CREATE_FIELDS:
      return { ...initialState };
    case SET_EXIST_CATEGORIES:
      return { ...state, listExistCategories: action.payload };
    default:
      return state;
  }
};

export default create;
