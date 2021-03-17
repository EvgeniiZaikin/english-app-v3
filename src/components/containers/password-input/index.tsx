import { ChangeEvent, FC, ReactElement } from 'react';
import { connect } from 'react-redux';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ReducersState } from '@store';
import { Dispatch } from 'redux';
import { setPassword, toggleShowPassword } from '@reducers/auth';

interface IProps {
  password: string;
  showPassword: boolean;
  changePassword: (value: string) => void;
  toggleVisiblePassword: () => void;
}

const passwordInput: FC<IProps> = ({ password, showPassword, changePassword, toggleVisiblePassword }): ReactElement => {
  const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => changePassword(event.target.value);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  return (
    <FormControl>
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

const mapStateToProps = (state: ReducersState) => {
  const {
    auth: { password, showPassword },
  } = state;
  return { password, showPassword };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const changePassword = (password: string) => dispatch(setPassword(password));
  const toggleVisiblePassword = () => dispatch(toggleShowPassword());
  return { changePassword, toggleVisiblePassword };
};

export default connect(mapStateToProps, mapDispatchToProps)(passwordInput);
