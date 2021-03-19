import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import axios from 'axios';

import { getAction } from '@rootReducer';
import { AsyncDispatch } from '@utils/types';
import { IResponse } from '@utils/interfaces';

import { hideGlobalLoading, showGlobalLoading } from './global-loading';
import { AlertTypes, delayHideGlobalAlert, showErrorGlobalAlert, showGlobalAlert } from './global-alert';

interface IState {
  isRemember: boolean;
}

const initialState: IState = {
  isRemember: false,
};

const SET_REMEMBER: string = 'SET_REMEMBER';

const settings: Reducer<IState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.settings };
    case SET_REMEMBER:
      return {
        ...state,
        isRemember: action.payload,
      };
    default:
      return { ...state };
  }
};

export default settings;

// export const setRemember = (remember: boolean) => getAction<boolean>(SET_REMEMBER, remember);

export const setRemember = (userId: number, remember: boolean) => async (dispatch: AsyncDispatch): Promise<void> => {
  dispatch(showGlobalLoading());

  try {
    const { data }: { data: IResponse } = await axios.put(`/api/users/remember`, { userId, remember });

    if (data.status) {
      dispatch(showGlobalAlert(AlertTypes.SUCCESS, `Авторизация пользователя сохранена!`));
      dispatch(getAction<boolean>(SET_REMEMBER, remember));
    } else {
      showErrorGlobalAlert(dispatch, `Не удалось сохранить пользователя авторизированным!`, data.error);
    }

    delayHideGlobalAlert(dispatch, 2000);
  } catch (error: unknown) {
    showErrorGlobalAlert(dispatch, `Не удалось сохранить пользователя авторизированным!`, error);
  }

  dispatch(hideGlobalLoading());
};
