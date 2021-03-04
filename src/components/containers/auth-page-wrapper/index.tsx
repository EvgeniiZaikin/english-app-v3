import { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import { NextRouter, withRouter } from 'next/router';
import Button from '@material-ui/core/Button';

import { AsyncDispatch } from '@utils/types';
import { registration, authorization, showAuthForm as showAuthFormAction, logoutUser } from '@reducers/auth';
import { reducersState } from '@store';
import Presentations from '@presentations';
import Containers from '@containers';

import { container, authPageWrapper__label } from './styles.scss';

interface IProps {
  showAuthForm: boolean;
  login: string;
  password: string;
  isAuthProcess: boolean;
  isRegProcess: boolean;
  isAuth: boolean;
  doRegistration: (login: string, password: string) => Promise<boolean>;
  doAuth: (login: string, password: string) => Promise<boolean>;
  showForm: Function;
  logout: Function;
  router: NextRouter;
}

const authPageWrapper: FC<IProps> = ({
  showAuthForm,
  login,
  password,
  doRegistration,
  doAuth,
  showForm,
  router,
  isAuthProcess,
  isRegProcess,
  isAuth,
  logout,
}): ReactElement => {
  const openLoginForm = (type: 'auth' | 'reg') => showForm(type);
  const doLogin = async (type: 'auth' | 'reg') => {
    const action = type === 'auth' ? doAuth : doRegistration;
    const success: boolean = await action(login, password);
    success && router.push('/repeat');
  };

  const authUser = showAuthForm ? doLogin('auth') : openLoginForm('auth');
  const regUser = showAuthForm ? doLogin('reg') : openLoginForm('reg');

  const exit = () => {
    logout();
    router.push('/repeat');
  };

  return (
    <div className={container}>
      {showAuthForm ? <Containers.AuthForm /> : null}

      {!isAuth && (!showAuthForm || (showAuthForm && isAuthProcess)) ? (
        <Button variant="contained" color="primary" onClick={authUser}>
          Авторизация
        </Button>
      ) : null}

      {!isAuth && !showAuthForm ? (
        <div className={authPageWrapper__label}>
          <Presentations.HelperLabel text="или" />
        </div>
      ) : null}

      {(!isAuth && !showAuthForm) || (showAuthForm && isRegProcess) ? (
        <Button variant="contained" color="secondary" onClick={regUser}>
          Регистрация
        </Button>
      ) : null}

      {!isAuth && !showAuthForm ? (
        <div className={authPageWrapper__label}>
          <Presentations.HelperLabel text="или" />
        </div>
      ) : null}

      {!showAuthForm ? (
        <Button variant="contained" onClick={exit}>
          Анонимно
        </Button>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: reducersState) => {
  const {
    auth: { showAuthForm, login, password, isAuthProcess, isRegProcess, isAuth },
  } = state;
  return { showAuthForm, login, password, isAuthProcess, isRegProcess, isAuth };
};

const mapDispatchToProps = (dispatch: AsyncDispatch) => {
  const doRegistration = (login: string, password: string): Promise<boolean> => dispatch(registration(login, password));
  const doAuth = (login: string, password: string): Promise<boolean> => dispatch(authorization(login, password));
  const showForm = (type: string) => dispatch(showAuthFormAction(type));
  const logout = () => dispatch(logoutUser());

  return { doRegistration, doAuth, showForm, logout };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(authPageWrapper));
