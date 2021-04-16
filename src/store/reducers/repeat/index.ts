import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { SET_REPEAT_WORD_INFO, FINISH_REPEAT_WORD, SET_REPEAT_WORD_STATUS, RESET_REPEAT_WORD_INFO } from './actions';
import { IRepeatState } from './types';

const initialState: IRepeatState = {
  word: '',
  wordId: null,
  category: '',
  rightEnValue: '',
  enValues: [],
  guessed: false,
  finished: false,
  isExpression: false,
  isSlang: false,
  isAbuse: false,
  isAbbreviation: false,
  transcription: null,
};

const repeat: Reducer<IRepeatState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.repeat };
    case SET_REPEAT_WORD_INFO:
      return { ...state, ...action.payload };
    case FINISH_REPEAT_WORD:
      return { ...state, finished: true };
    case SET_REPEAT_WORD_STATUS:
      return { ...state, guessed: action.payload };
    case RESET_REPEAT_WORD_INFO:
      return { ...initialState };
    default:
      return state;
  }
};

export default repeat;
