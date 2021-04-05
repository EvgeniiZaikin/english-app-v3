import { ChangeEvent, FC, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { setPassword, toggleShowPassword } from '@reducers/auth/creators';
import { getPassword, getShowPassword } from '@reducers/auth/selectors';

const PasswordInput: FC = (): ReactElement => {
  const password = useSelector(getPassword);
  const showPassword = useSelector(getShowPassword);

  const dispatch = useDispatch();
  const changePassword = (value: string) => dispatch(setPassword(value));
  const toggleVisiblePassword = () => dispatch(toggleShowPassword());
  const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => changePassword(event.target.value);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="standard-adornment-password">Пароль</InputLabel>
      <Input
        id="standard-adornment-password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={passwordHandler}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleVisiblePassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default PasswordInput;
