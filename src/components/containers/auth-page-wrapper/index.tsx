import { FC, ReactElement } from 'react';
import { connect } from 'react-redux';

import { container, authPageWrapper__label } from './styles.scss';
import Button from '@material-ui/core/Button';

import Presentations from '@presentations';
import Containers from '@containers';
import { reducersState } from '@store';
import { NextRouter, withRouter } from 'next/router';

import { AsyncDispatch } from '@utils/types';
import { registration, authorization, showAuthForm, logoutUser } from '@reducers/auth';

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
  const authUser = showAuthForm
    ? async () => {
        const success: boolean = await doAuth(login, password);
        success && router.push('/repeat');
      }
    : () => showForm('auth');

  const regUser = showAuthForm
    ? async () => {
        const success: boolean = await doRegistration(login, password);
        success && router.push('/repeat');
      }
    : () => showForm('reg');

  const logoutUser = () => {
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
        <Button variant="contained" onClick={logoutUser}>
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
  const showForm = (type: string) => dispatch(showAuthForm(type));
  const logout = () => dispatch(logoutUser());

  return { doRegistration, doAuth, showForm, logout };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(authPageWrapper));
