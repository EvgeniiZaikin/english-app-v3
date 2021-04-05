import { FC, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import { registration, authorization, logoutUser } from '@reducers/auth/creators';
import Presentations from '@presentations';
import Containers from '@containers';

import { getIsAuth, getLogin, getPassword } from '@reducers/auth/selectors';

import { IAuthPageWrapperProps } from './types';
import { authPageWrapper__container, authPageWrapper__label, authPageWrapper__authForm } from './styles.scss';

const AuthPageWrapper: FC<IAuthPageWrapperProps> = ({ router }): ReactElement => {
  const isAuth = useSelector(getIsAuth);
  const login = useSelector(getLogin);
  const password = useSelector(getPassword);

  const dispatch = useDispatch();
  const doRegistration = (login: string, password: string) => dispatch(registration(login, password));
  const doAuth = (login: string, password: string) => dispatch(authorization(login, password));
  const logout = () => dispatch(logoutUser());

  const doLogin = async (type: 'auth' | 'reg') => {
    const action = type === 'auth' ? doAuth : doRegistration;
    const success = await action(login, password);
    !!success && router.push('/repeat');
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

export default withRouter(AuthPageWrapper);
