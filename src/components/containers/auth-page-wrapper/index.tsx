import { FC, ReactElement } from 'react';
import { connect } from 'react-redux';

import { container, authPageWrapper__label } from './styles.scss';
import Button from '@material-ui/core/Button';

import Presentations from '@presentations';
import Containers from '@containers';
import { reducersState } from '@store';
import { NextRouter, withRouter } from 'next/router';

import { AsyncDispatch } from '@utils/types';
import { registration, authorization, showAuthForm } from '@reducers/auth';

interface IProps {
    showAuthForm: boolean,
    login: string,
    password: string,
    isAuthProcess: boolean, 
    isRegProcess: boolean,
    doRegistration: Function,
    doAuth: Function,
    showForm: Function,
    router: NextRouter,
};

const authPageWrapper: FC<IProps> = ({ 
    showAuthForm, login, password, doRegistration, doAuth, showForm, router, isAuthProcess, isRegProcess
}) : ReactElement => {
    const regLogic = showAuthForm ? () => doRegistration(login, password) : () => showForm('reg');
    const authLogic = showAuthForm ? () => doAuth(login, password) : () => showForm('auth');

    return (
        <div className={ container }>
            { showAuthForm ? <Containers.AuthForm /> : null }

            {
                !showAuthForm || (showAuthForm && isAuthProcess) ?
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={ authLogic }
                >Авторизация</Button> : null
            }

            {
                !showAuthForm ?
                <div className={ authPageWrapper__label }>
                    <Presentations.HelperLabel text='или'/>
                </div> : null
            }
            
            {
                !showAuthForm || (showAuthForm && isRegProcess) ?
                <Button
                    variant="contained" 
                    color="secondary" 
                    onClick={ regLogic }
                >Регистрация</Button> : null
            }

            {
                !showAuthForm ?
                <>
                    <div className={ authPageWrapper__label }>
                        <Presentations.HelperLabel text='или'/>
                    </div>

                    <Button variant="contained" onClick={ () => router.push('/repeat') }>Анонимно</Button>
                </> : null
            }
        </div>
    );
};

const mapStateToProps = (state: reducersState) => {
    const { auth: { showAuthForm, login, password, isAuthProcess, isRegProcess } } = state;
    return { showAuthForm, login, password, isAuthProcess, isRegProcess };
};

const mapDispatchToProps = (dispatch: AsyncDispatch) => {
    const doRegistration = (login: string, password: string) => dispatch(registration(login, password));
    const doAuth = (login: string, password: string) => dispatch(authorization(login, password));
    const showForm = (type: string) => dispatch(showAuthForm(type));

    return { doRegistration, doAuth, showForm };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(authPageWrapper));