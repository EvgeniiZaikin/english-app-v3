import { FC, ReactElement, useState } from 'react';
import { connect } from 'react-redux';

import { Divider } from '@material-ui/core';

import Presentations from '@presentations';
import { setAppTheme } from '@reducers/theme';
import { ReducersState } from '@store';
import { setRemember } from '@reducers/settings';
import { AsyncDispatch } from '@utils/types';

interface IProps {
  appTheme: string;
  isRemember: boolean;
  userId: number | null;
  toggleAppTheme: (theme: string) => void;
  toggleRemember: (userId: number, remember: boolean) => Promise<void>;
}

const SettingsPageWrapper: FC<IProps> = ({
  appTheme,
  isRemember,
  userId,
  toggleAppTheme,
  toggleRemember,
}): ReactElement => {
  const [darkTheme, toggleDarkTheme] = useState<boolean>(false);
  const [abuse, toggleAbuse] = useState<boolean>(false);

  const handleRemember = () => {
    userId && toggleRemember(userId, !isRemember);
  };

  const handleAppTheme = () => {
    toggleDarkTheme(!darkTheme);
    toggleAppTheme(appTheme);
  };

  const handleAbuse = () => {
    toggleAbuse(!abuse);
  };

  return (
    <div>
      <div>Запомнить пользователя:</div>
      <Presentations.OnOffSwitch disabled={!userId} checked={isRemember} color="primary" onClick={handleRemember} />
      <Divider />
      <div>Тёмная тема:</div>
      <Presentations.OnOffSwitch checked={darkTheme} color="primary" onClick={handleAppTheme} />
      <Divider />
      <div>Использовать мат:</div>
      <Presentations.OnOffSwitch checked={abuse} color="secondary" onClick={handleAbuse} />
    </div>
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    auth: { userId },
    theme: { theme },
    settings: { isRemember },
  } = state;

  return {
    appTheme: theme,
    isRemember,
    userId,
  };
};

const mapDispatchToProps = (dispatch: AsyncDispatch) => {
  const toggleAppTheme = (theme: string) => dispatch(setAppTheme(theme === 'dark' ? 'light' : 'dark'));
  const toggleRemember = (userId: number, remember: boolean): Promise<void> => dispatch(setRemember(userId, remember));

  return {
    toggleAppTheme,
    toggleRemember,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPageWrapper);
