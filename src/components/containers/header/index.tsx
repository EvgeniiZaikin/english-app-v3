import React, { FC, ReactElement } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { NextRouter, withRouter } from 'next/router';
import Cookies from 'js-cookie';

import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';

import { ReducersState } from '@store';
import { logoutUser as logoutUserAction } from '@reducers/auth/creators';
import { setRemember, setUseAbuse } from '@reducers/settings';
import { AsyncDispatch } from '@utils/types';
import Presentations from '@presentations';

import { getIsAuth, getLogin, getUserId } from '@reducers/auth/selectors';

import { header__wrapper, header__auth } from './styles.scss';

interface IHeaderProps {
  router: NextRouter;
  isRemember: boolean;
  useAbuse: boolean;
  toggleRemember(userId: number, remember: boolean): Promise<void>;
  toggleUseAbuse(useAbuse: boolean): void;
}

const Header: FC<IHeaderProps> = ({ router, isRemember, useAbuse, toggleRemember, toggleUseAbuse }): ReactElement => {
  const isAuth = useSelector(getIsAuth);
  const login = useSelector(getLogin);
  const userId = useSelector(getUserId);

  const dispatch = useDispatch();
  const logout = () => dispatch(logoutUserAction());

  const [settingsAnchorElement, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isSettingsOpen = Boolean(settingsAnchorElement);

  const handleSettingsClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleSettingsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleRemember = () => {
    userId && !isRemember && Cookies.set('remember', String(userId), { expires: 7 });
    userId && isRemember && Cookies.remove('remember');
    userId && toggleRemember(userId, !isRemember);
  };

  const handleAbuse = () => {
    !useAbuse ? Cookies.set('useAbuse', 'true', { expires: 7 }) : Cookies.remove('useAbuse');
    toggleUseAbuse(!useAbuse);
  };

  const loginUser = () => router.push('/');
  const logoutUser = () => {
    Cookies.remove('remember');
    userId && toggleRemember(userId, false);
    logout();
    router.push('/');
  };
  const authAction = isAuth ? logoutUser : loginUser;

  const settingsId = 'settings';

  return (
    <div className={header__wrapper}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={authAction}
            edge="start"
            className={header__auth}
            color="inherit"
            aria-label="open drawer"
          >
            {isAuth ? <TransferWithinAStationIcon /> : <AccountCircle />}
          </IconButton>
          <Typography variant="h6" noWrap>
            {isAuth ? login : 'Анонимный пользователь'}
          </Typography>
          <div className={header__wrapper} />
          <IconButton onClick={() => router.push('/search')} aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={settingsId}
            aria-haspopup="true"
            onClick={handleSettingsOpen}
            color="inherit"
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Presentations.SettingsBlock
        id={settingsId}
        anchorElement={settingsAnchorElement}
        isOpen={isSettingsOpen}
        onClose={handleSettingsClose}
        isRememberChecked={isRemember}
        isRememberDisabled={!userId}
        useAbuseChecked={useAbuse}
        useAbuseDisabled={false}
        isRememberOnChange={handleRemember}
        useAbuseOnChange={handleAbuse}
      />
    </div>
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    settings: { isRemember, useAbuse },
  } = state;
  return { isRemember, useAbuse };
};

const mapDispatchToProps = (dispatch: AsyncDispatch) => {
  const toggleRemember = (userId: number, remember: boolean): Promise<void> => dispatch(setRemember(userId, remember));
  const toggleUseAbuse = (useAbuse: boolean) => dispatch(setUseAbuse(useAbuse));

  return {
    toggleRemember,
    toggleUseAbuse,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
