import { FC, ReactElement, useState } from 'react';

import { container, authPageWrapper__label } from './styles.scss';
import Button from '@material-ui/core/Button';

import Presentations from '@presentations';
import Containers from '@containers';

const authPageWrapper: FC = () : ReactElement => {
    return (
        <div className={ container }>
            <Containers.AuthForm />
            <Button variant="contained" color="primary">Авторизация</Button>
            <div className={ authPageWrapper__label }>
                <Presentations.HelperLabel text='или'/>
            </div>
            <Button variant="contained" color="secondary">Регистрация</Button>
            <div className={ authPageWrapper__label }>
                <Presentations.HelperLabel text='или'/>
            </div>
            <Button variant="contained">Анонимно</Button>
        </div>
    );
};

export default authPageWrapper;