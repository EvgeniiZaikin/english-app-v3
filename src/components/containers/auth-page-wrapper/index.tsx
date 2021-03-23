import { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import { NextRouter, withRouter } from 'next/router';
import Button from '@material-ui/core/Button';

import { AsyncDispatch } from '@utils/types';
import { registration, authorization, logoutUser } from '@reducers/auth';
import { ReducersState } from '@store';
import Presentations from '@presentations';
import Containers from '@containers';

import { authPageWrapper__container, authPageWrapper__label, authPageWrapper__authForm } from './styles.scss';

interface IProps {
  login: string;
  password: string;
  isAuth: boolean;
  doRegistration: (login: string, password: string) => Promise<boolean>;
  doAuth: (login: string, password: string) => Promise<boolean>;
  logout: Function;
  router: NextRouter;
}

const authPageWrapper: FC<IProps> = ({
  login,
  password,
  doRegistration,
  doAuth,
  router,
  isAuth,
  logout,
}): ReactElement => {
  const doLogin = async (type: 'auth' | 'reg') => {
    const action = type === 'auth' ? doAuth : doRegistration;
    const success: boolean = await action(login, password);
    success && router.push('/repeat');
  };

  const authUser = () => doLogin('auth');
  const regUser = () => doLogin('reg');

  const exit = () => {
    logout();
    router.push('/repeat');
  };

  return (
    <div className={authPageWrapper__container}>
      <div className={authPageWrapper__authForm}>
        <Containers.LoginInput />
        <Containers.PasswordInput />
      </div>

      {!isAuth && (
        <>
          <Button variant="contained" color="primary" onClick={authUser}>
            Авторизация
          </Button>
          <div className={authPageWrapper__label}>
            <Presentations.HelperLabel text="или" />
          </div>
          <Button variant="contained" color="secondary" onClick={regUser}>
            Регистрация
          </Button>
          <div className={authPageWrapper__label}>
            <Presentations.HelperLabel text="или" />
          </div>
        </>
      )}

      <Button variant="contained" onClick={exit}>
        Анонимно
      </Button>
    </div>
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    auth: { login, password, isAuth },
  } = state;
  return { login, password, isAuth };
};

const mapDispatchToProps = (dispatch: AsyncDispatch) => {
  const doRegistration = (login: string, password: string): Promise<boolean> => dispatch(registration(login, password));
  const doAuth = (login: string, password: string): Promise<boolean> => dispatch(authorization(login, password));
  const logout = () => dispatch(logoutUser());

  return { doRegistration, doAuth, logout };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(authPageWrapper));
