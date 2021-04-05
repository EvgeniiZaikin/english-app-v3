import { FC, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setLogin } from '@reducers/auth/creators';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { getLogin } from '@reducers/auth/selectors';

const LoginInput: FC = (): ReactElement => {
  const login = useSelector(getLogin);

  const dispatch = useDispatch();
  const changeLogin = (value: string) => dispatch(setLogin(value));
  const loginHandler = (event: React.ChangeEvent<HTMLInputElement>) => changeLogin(event.target.value);

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="standard-adornment-password">Логин</InputLabel>
      <Input value={login} onChange={loginHandler} />
    </FormControl>
  );
};

export default LoginInput;
