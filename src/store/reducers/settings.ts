import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import axios from 'axios';

import { getAction } from '@rootReducer';
import { AsyncDispatch } from '@utils/types';
import { IResponse } from '@utils/interfaces';
import { showSnackbar } from '@reducers/snackbar/creators';
import { TSnackbar } from '@reducers/snackbar/types';

interface IState {
  isRemember: boolean;
  useAbuse: boolean;
}

const initialState: IState = {
  isRemember: false,
  useAbuse: false,
};

const SET_REMEMBER: string = 'SET_REMEMBER';
const SET_USE_ABUSE: string = 'SET_USE_ABUSE';

const settings: Reducer<IState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.settings };
    case SET_REMEMBER:
      return { ...state, isRemember: action.payload };
    case SET_USE_ABUSE:
      return { ...state, useAbuse: action.payload };
    default:
      return { ...state };
  }
};

export default settings;

export const setUseAbuse = (useAbuse: boolean) => getAction<boolean>(SET_USE_ABUSE, useAbuse);
export const simpleSetRemember = (remember: boolean) => getAction<boolean>(SET_REMEMBER, remember);

export const setRemember = (userId: number, remember: boolean) => async (dispatch: AsyncDispatch): Promise<void> => {
  try {
    const { data }: { data: IResponse } = await axios.put(`/api/users/remember`, { userId, remember });

    if (data.status) {
      dispatch(simpleSetRemember(remember));
    } else {
      dispatch(
        showSnackbar(TSnackbar.WARNING, 'Не удалось сохранить пользователя авторизированным на стороне сервера!')
      );
    }
  } catch (error: unknown) {
    dispatch(showSnackbar(TSnackbar.WARNING, 'Не удалось сохранить пользователя авторизированным!'));
  }
};
