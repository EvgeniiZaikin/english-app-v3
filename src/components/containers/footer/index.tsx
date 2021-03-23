import { FC, ReactElement } from 'react';
import Presentations from '@presentations';
import Cookies from 'js-cookie';

import { connect } from 'react-redux';
import { ReducersState } from '@store';
import { NextRouter, withRouter } from 'next/router';
import { Dispatch } from 'redux';
import { toggleNavigationFullsize } from '@reducers/navigation';
import { logoutUser } from '@reducers/auth';

import styles, { layout__footer } from './styles.scss';

interface IProps {
  fullNavigation: boolean;
  isAuth: boolean;
  router: NextRouter;
  openNavigation: Function;
  hideNavigation: Function;
  logout: Function;
}

const footerBlock: FC<IProps> = ({
  fullNavigation,
  isAuth,
  router,
  openNavigation,
  hideNavigation,
  logout,
}): ReactElement => {
  const footerClass: string = `
        ${styles[fullNavigation ? `layout__footer_show` : `layout__footer_hide`]}
        &nbsp;
        ${styles.footer__wrapper}
    `;

  const loginUser = () => router.push('/');
  const exitAuth = () => {
    Cookies.remove('remember');
    logout();
    router.push('/');
  };
  const authAction = isAuth ? exitAuth : loginUser;

  return (
    <footer className={footerClass}>
      <div className={layout__footer}>
        <Presentations.NavigationItem type={isAuth ? 'logout' : 'auth'} action={authAction} />
        <Presentations.NavigationItem type="repeat" action={() => router.push('/repeat')} />
        <Presentations.NavigationItem type="create" action={() => router.push('/create')} />
        <Presentations.NavigationItem type="more" action={openNavigation} />
      </div>
      <div className={layout__footer}>
        <Presentations.NavigationItem type="info" action={() => router.push('/info')} />
        <Presentations.NavigationItem type="search" action={() => router.push('/search')} />
        <Presentations.NavigationItem type="close" action={hideNavigation} />
      </div>
    </footer>
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    navigation: { fullsize },
    auth: { isAuth },
  } = state;

  return {
    fullNavigation: fullsize,
    isAuth,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const openNavigation = () => dispatch(toggleNavigationFullsize(true));
  const hideNavigation = () => dispatch(toggleNavigationFullsize(false));

  const logout = () => dispatch(logoutUser());

  return {
    openNavigation,
    hideNavigation,
    logout,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(footerBlock));
