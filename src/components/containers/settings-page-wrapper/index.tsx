import { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { Divider } from '@material-ui/core';

import Presentations from '@presentations';
import { ReducersState } from '@store';
import { setRemember, setUseAbuse } from '@reducers/settings';
import { AsyncDispatch } from '@utils/types';

interface IProps {
  isRemember: boolean;
  userId: number | null;
  useAbuse: boolean;
  toggleRemember: (userId: number, remember: boolean) => Promise<void>;
  toggleUseAbuse: (useAbuse: boolean) => void;
}

const SettingsPageWrapper: FC<IProps> = ({
  isRemember,
  userId,
  useAbuse,
  toggleRemember,
  toggleUseAbuse,
}): ReactElement => {
  const handleRemember = () => {
    userId && !isRemember && Cookies.set('remember', String(userId), { expires: 7 });
    userId && isRemember && Cookies.remove('remember');
    userId && toggleRemember(userId, !isRemember);
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
      <div>Использовать мат:</div>
      <Presentations.OnOffSwitch checked={useAbuse} color="secondary" onClick={handleAbuse} />
    </div>
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    auth: { userId },
    settings: { isRemember, useAbuse },
  } = state;

  return {
    isRemember,
    userId,
    useAbuse,
  };
};

const mapDispatchToProps = (dispatch: AsyncDispatch) => {
  const toggleRemember = (userId: number, remember: boolean): Promise<void> => dispatch(setRemember(userId, remember));
  const toggleUseAbuse = (useAbuse: boolean) => dispatch(setUseAbuse(useAbuse));

  return {
    toggleRemember,
    toggleUseAbuse,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPageWrapper);
