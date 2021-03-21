import { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { Divider } from '@material-ui/core';

import Presentations from '@presentations';
import { setAppTheme } from '@reducers/theme';
import { ReducersState } from '@store';
import { setRemember, setUseAbuse } from '@reducers/settings';
import { AsyncDispatch } from '@utils/types';

interface IProps {
  appTheme: string;
  isRemember: boolean;
  userId: number | null;
  useAbuse: boolean;
  toggleAppTheme: (theme: string) => void;
  toggleRemember: (userId: number, remember: boolean) => Promise<void>;
  toggleUseAbuse: (useAbuse: boolean) => void;
}

const SettingsPageWrapper: FC<IProps> = ({
  appTheme,
  isRemember,
  userId,
  useAbuse,
  toggleAppTheme,
  toggleRemember,
  toggleUseAbuse,
}): ReactElement => {
  const handleRemember = () => {
    userId && !isRemember && Cookies.set('remember', String(userId), { expires: 7 });
    userId && isRemember && Cookies.remove('remember');
    userId && toggleRemember(userId, !isRemember);
  };

  const handleAppTheme = () => {
    toggleAppTheme(appTheme);
  };

  const handleAbuse = () => {
    !useAbuse ? Cookies.set('useAbuse', 'true', { expires: 7 }) : Cookies.remove('useAbuse');
    toggleUseAbuse(!useAbuse);
  };

  return (
    <div>
      <div>Запомнить пользователя:</div>
      <Presentations.OnOffSwitch disabled={!userId} checked={isRemember} color="primary" onClick={handleRemember} />
      <Divider />
      <div>Тёмная тема:</div>
      <Presentations.OnOffSwitch checked={appTheme === 'dark'} color="primary" onClick={handleAppTheme} />
      <Divider />
      <div>Использовать мат:</div>
      <Presentations.OnOffSwitch checked={useAbuse} color="secondary" onClick={handleAbuse} />
    </div>
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    auth: { userId },
    theme: { theme },
    settings: { isRemember, useAbuse },
  } = state;

  return {
    appTheme: theme,
    isRemember,
    userId,
    useAbuse,
  };
};

const mapDispatchToProps = (dispatch: AsyncDispatch) => {
  const toggleAppTheme = (theme: string) => dispatch(setAppTheme(theme === 'dark' ? 'light' : 'dark'));
  const toggleRemember = (userId: number, remember: boolean): Promise<void> => dispatch(setRemember(userId, remember));
  const toggleUseAbuse = (useAbuse: boolean) => dispatch(setUseAbuse(useAbuse));

  return {
    toggleAppTheme,
    toggleRemember,
    toggleUseAbuse,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPageWrapper);
