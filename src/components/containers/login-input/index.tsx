import { FC, ReactElement } from 'react';
import { connect } from 'react-redux';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { reducersState } from '@store';
import { Dispatch } from 'redux';
import { setLogin } from '@reducers/auth';

interface IProps {
    login: string,
    changeLogin: (value: string) => void,
};

const loginInput: FC<IProps> = ({ login, changeLogin }) : ReactElement => {
    const loginHandler = (event: React.ChangeEvent<HTMLInputElement>) => changeLogin(event.target.value);

    return (
        <TextField
            onChange={ loginHandler }
            value={ login }
            id="input-with-icon-textfield"
            label="Логин"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                ),
            }}
        />
    );
};

const mapStateToProps = (state: reducersState) => {
    const { auth: { login } } = state;
    return { login };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    const changeLogin = (login: string) => dispatch(setLogin(login));
    return { changeLogin };
};

export default connect(mapStateToProps, mapDispatchToProps)(loginInput);