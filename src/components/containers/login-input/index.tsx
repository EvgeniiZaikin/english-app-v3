import { FC, ReactElement } from 'react';
import { connect } from 'react-redux';

import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { reducersState } from '@store';
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

  const adornment = (
    <InputAdornment position="end" style={{ paddingRight: '12px' }}>
      <AccountCircle />
    </InputAdornment>
  );

  return (
    <FormControl>
      <InputLabel htmlFor="standard-adornment-password">Логин</InputLabel>
      <Input value={login} onChange={loginHandler} endAdornment={adornment} />
    </FormControl>
  );
};

const mapStateToProps = (state: reducersState) => {
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
