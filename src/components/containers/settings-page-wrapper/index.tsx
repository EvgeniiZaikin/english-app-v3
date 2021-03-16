import { FC, ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Divider } from '@material-ui/core';

import Presentations from '@presentations';
import { setAppTheme } from '@reducers/theme';
import { reducersState } from '@store';

interface IProps {
  appTheme: string;
  toggleAppTheme: (theme: string) => void;
}

const SettingsPageWrapper: FC<IProps> = ({ appTheme, toggleAppTheme }): ReactElement => {
  const [remember, toggleRemember] = useState<boolean>(false);
  const [darkTheme, toggleDarkTheme] = useState<boolean>(false);
  const [abuse, toggleAbuse] = useState<boolean>(false);

  const handleRemember = () => {
    toggleRemember(!remember);
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
      <Presentations.OnOffSwitch checked={remember} color="primary" onClick={handleRemember} />
      <Divider />
      <div>Тёмная тема:</div>
      <Presentations.OnOffSwitch checked={darkTheme} color="primary" onClick={handleAppTheme} />
      <Divider />
      <div>Использовать мат:</div>
      <Presentations.OnOffSwitch checked={abuse} color="secondary" onClick={handleAbuse} />
    </div>
  );
};

const mapStateToProps = (state: reducersState) => {
  const {
    theme: { theme },
  } = state;

  return {
    appTheme: theme,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const toggleAppTheme = (theme: string) => dispatch(setAppTheme(theme === 'dark' ? 'light' : 'dark'));

  return {
    toggleAppTheme,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPageWrapper);
