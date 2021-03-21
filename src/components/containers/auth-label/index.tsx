import { ReducersState } from '@store';
import { ReactElement, FC } from 'react';
import { connect } from 'react-redux';
import { label__container, label__text } from './styles.scss';

interface IProps {
  isAuth: boolean;
  login: string;
}

const AuthLabel: FC<IProps> = ({ isAuth, login }): ReactElement => (
  <div className={label__container}>
    <p className={label__text}>{isAuth ? login : `анонимный пользователь`}</p>
  </div>
);

const mapStateToProps = (state: ReducersState) => {
  const {
    auth: { isAuth, login },
  } = state;
  return { isAuth, login };
};

export default connect(mapStateToProps)(AuthLabel);
