import React, { FC, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'next/router';
import Cookies from 'js-cookie';

import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';

import { logoutUser as logoutUserAction } from '@reducers/auth/creators';
import { setRemember, setUseAbuse } from '@reducers/settings/creators';
import Presentations from '@presentations';

import { getIsAuth, getLogin, getUserId } from '@reducers/auth/selectors';
import { getIsRemember, getUseAbuse } from '@reducers/settings/selectors';

import { IHeaderProps } from './types';
import { header__wrapper, header__auth } from './styles.scss';

const Header: FC<IHeaderProps> = ({ router }): ReactElement => {
  const isAuth = useSelector(getIsAuth);
  const login = useSelector(getLogin);
  const userId = useSelector(getUserId);
  const isRemember = useSelector(getIsRemember);
  const useAbuse = useSelector(getUseAbuse);

  const dispatch = useDispatch();
  const logout = () => dispatch(logoutUserAction());
  const toggleRemember = (id: number, remember: boolean) => dispatch(setRemember(id, remember));
  const toggleUseAbuse = (use: boolean) => dispatch(setUseAbuse(use));

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

export default withRouter(Header);
