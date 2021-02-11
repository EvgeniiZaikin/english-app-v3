import { FC, ReactElement } from 'react';
import { connect } from 'react-redux';

import { container, authPageWrapper__label } from './styles.scss';
import Button from '@material-ui/core/Button';

import Presentations from '@presentations';
import Containers from '@containers';
import { reducersState } from '@store';
import { NextRouter, withRouter } from 'next/router';

interface IProps {
    showAuthForm: boolean,
    router: NextRouter,
};

const authPageWrapper: FC<IProps> = ({ showAuthForm, router }) : ReactElement => {
    return (
        <div className={ container }>
            { showAuthForm ? <Containers.AuthForm /> : null }
            <Button variant="contained" color="primary">Авторизация</Button>
            <div className={ authPageWrapper__label }>
                <Presentations.HelperLabel text='или'/>
            </div>
            <Button variant="contained" color="secondary">Регистрация</Button>
            <div className={ authPageWrapper__label }>
                <Presentations.HelperLabel text='или'/>
            </div>
            <Button variant="contained" onClick={ () => router.push('/repeat') }>Анонимно</Button>
        </div>
    );
};

const mapStateToProps = (state: reducersState) => {
    const { auth: { showAuthForm } } = state;
    return { showAuthForm };
};

export default connect(mapStateToProps)(withRouter(authPageWrapper));