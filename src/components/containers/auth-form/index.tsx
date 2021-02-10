import { FC, ReactElement, useState } from 'react';
import { connect } from 'react-redux';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Containers from '@containers';

const AuthForm: FC = () : ReactElement => {
    const [ remember, setRemember ] = useState<boolean>(false);
    const changeRemember = () => setRemember(!remember);

    const checkbox = <Checkbox checked={ remember } onChange={ changeRemember } name="checkedB" color="primary" />
    
    return (
        <div>
            <Containers.LoginInput />
            <Containers.PasswordInput />
            <FormControlLabel control={ checkbox } label="Запомнить" />
        </div>
    )
};

export default connect()(AuthForm);