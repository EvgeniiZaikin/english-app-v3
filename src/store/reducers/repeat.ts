import { Reducer, AnyAction, Dispatch } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { getAction } from '@rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { ReducersState } from '@store';
import axios from 'axios';
import { IResponse } from '@utils/interfaces';
import { showSnackbar } from '@reducers/snackbar/creators';
import { TSnackbar } from '@reducers/snackbar/types';

const SET_REPEAT_WORD_INFO: string = 'SET_REPEAT_WORD_INFO';
const FINISH_REPEAT_WORD: string = 'FINISH_REPEAT_WORD';
const SET_REPEAT_WORD_STATUS: string = 'SET_GUESSED_WORD_STATUS';
const RESET_REPEAT_WORD_INFO: string = 'RESET_REPEAT_WORD_INFO';

interface IState {
  word: string;
  wordId: number | null;
  category: string;
  rightEnValue: string;
  enValues: Array<string>;
  guessed: boolean;
  finished: boolean;
  isExpression: boolean;
  isSlang: boolean;
  isAbuse: boolean;
  isAbbreviation: boolean;
  transcription: string | null;
}

const initialState: IState = {
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

const repeat: Reducer<IState, AnyAction> = (state = initialState, action) => {
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
      return { ...state };
  }
};

export default repeat;

export const setRepeatWordInfo = (data: object) => getAction<object>(SET_REPEAT_WORD_INFO, data);
export const finishRepeatWord = () => getAction(FINISH_REPEAT_WORD);
export const setRepeatWordStatus = (status: boolean) => getAction<boolean>(SET_REPEAT_WORD_STATUS, status);
export const resetRepeatWordInfo = () => getAction(RESET_REPEAT_WORD_INFO);

export const setRepeatWordData = (userId: number | null, isAuth: boolean, useAbuse: boolean) => async (
  dispatch: ThunkDispatch<ReducersState, void, AnyAction>
) => {
  try {
    dispatch(resetRepeatWordInfo());

    const url: string = isAuth && userId ? `/api/users-words/guess-word?userId=${userId}` : `/api/words/guess-word`;

    const {
      data: { status, result, error },
    }: { data: IResponse } = await axios.get(url, { params: useAbuse });
    if (status && !error) {
      const [words] = result as Array<object>;
      dispatch(setRepeatWordInfo(words));
    } else {
      dispatch(showSnackbar(TSnackbar.ERROR, 'Не удалось получить слово для повторения со стороны сервера'));
    }
  } catch (error: unknown) {
    dispatch(showSnackbar(TSnackbar.ERROR, 'Не удалось получить слово для повторения'));
  }
};

export interface IUpdateWordParams {
  id: number;
  ruValue: string;
  enValue: string;
  incrementViews: boolean;
  success: boolean;
  isAuth: boolean;
  userId: number | null;
}

export const updateWord = (params: IUpdateWordParams) => async (dispatch: Dispatch) => {
  const innerUpdateWord = async () => {
    let isUpdated = true;

    const data: IResponse = await axios.put(`/api/words/word`, params);
    if (!data.status || data.error) {
      isUpdated = false;
      dispatch(showSnackbar(TSnackbar.ERROR, 'Слово не удалось обновить на стороне сервера'));
    }

    return isUpdated;
  };

  const getUserWord = async () => {
    const { data }: { data: IResponse } = await axios.get(`/api/users-words/user-word`, {
      params: {
        userId: params.userId,
        id: params.id,
      },
    });

    (!data.status || data.error) && dispatch(showSnackbar(TSnackbar.ERROR, 'Не удалось получить слово с сервера'));
    return data.result[0];
  };

  const updateUserWord = async () => {
    const data: IResponse = await axios.put(`/api/users-words/user-word`, params);
    (!data.status || data.error) &&
      dispatch(showSnackbar(TSnackbar.ERROR, 'Не удалось обновить пользовательское слово на стороне сервера'));
  };

  const createUserWord = async () => {
    let isCreated: boolean = true;

    const data: IResponse = await axios.post(`/api/users-words/user-word`, params);
    if (!data.status || data.error) {
      isCreated = false;
      dispatch(showSnackbar(TSnackbar.ERROR, 'Не удалось создать слово на стороне сервера'));
    }

    return isCreated;
  };

  try {
    const isUpdated = await innerUpdateWord();
    if (isUpdated && params.isAuth && params.userId) {
      const isExists = await getUserWord();
      if (isExists) {
        await updateUserWord();
      } else {
        const isUserWordCreated = await createUserWord();
        if (isUserWordCreated) await updateUserWord();
      }
    }
  } catch (error: unknown) {
    dispatch(showSnackbar(TSnackbar.ERROR, 'Слово не удалось обновить'));
  }
};
