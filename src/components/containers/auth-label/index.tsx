import { reducersState } from '@store';
import { ReactElement, FC } from 'react';
import { connect } from 'react-redux';
import { label__container, label__text_light, label__text_dark } from './styles.scss';

interface IProps {
  isAuth: boolean;
  login: string;
  theme: string;
}

const AuthLabel: FC<IProps> = ({ isAuth, login, theme }): ReactElement => {
  const textClass: string = theme === 'light' ? label__text_light : label__text_dark;

  return (
    <div className={label__container}>
      <p className={textClass}>{isAuth ? login : `анонимный пользователь`}</p>
    </div>
  );
};

const mapStateToProps = (state: reducersState) => {
  const {
    auth: { isAuth, login },
    theme: { theme },
  } = state;
  return { isAuth, login, theme };
};

export default connect(mapStateToProps)(AuthLabel);
