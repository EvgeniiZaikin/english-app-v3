import { FC, ReactElement } from 'react';
import { connect } from 'react-redux';

import { ReducersState } from '@store';
import { Dispatch } from 'redux';
import { setLogin } from '@reducers/auth';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

interface IProps {
  login: string;
  changeLogin: (value: string) => void;
}

const loginInput: FC<IProps> = ({ login, changeLogin }): ReactElement => {
  const loginHandler = (event: React.ChangeEvent<HTMLInputElement>) => changeLogin(event.target.value);

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="standard-adornment-password">Логин</InputLabel>
      <Input value={login} onChange={loginHandler} />
    </FormControl>
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    auth: { login },
  } = state;
  return { login };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const changeLogin = (login: string) => dispatch(setLogin(login));
  return { changeLogin };
};

export default connect(mapStateToProps, mapDispatchToProps)(loginInput);
