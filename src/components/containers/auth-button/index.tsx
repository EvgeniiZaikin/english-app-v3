import { FC, ReactElement } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Presentations from '@presentations';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { connect } from 'react-redux';
import { reducersState } from '@store';
import { AsyncDispatch } from '@utils/types';
import { registration, authorization } from '@reducers/auth';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#008000',
        contrastText: '#fff',
      },
    },
});

interface IProps {
    label: string,
    login: string,
    password: string,
    withRegistration?: boolean,
    doRegistration: Function,
    doAuth: Function,
};

const authButton: FC<IProps> = ({ 
    label, login, password, withRegistration = false, doRegistration, doAuth, 
}) : ReactElement => {
    const doLogin = () => withRegistration ? doRegistration(login, password) : doAuth(login, password);

    return (
        <ThemeProvider theme={ theme }>
            <Presentations.Button 
                click={ doLogin }
                disabled={ false }
                icon={ <NavigateNextIcon /> }
                title={ label }
            />
        </ThemeProvider>
    );
};

const mapStateToProps = (state: reducersState) => {
    const { auth: { login, password } } = state;
    return { login, password };
};

const mapDispatchToProps = (dispatch: AsyncDispatch) => {
    const doRegistration = (login: string, password: string) => dispatch(registration(login, password));
    const doAuth = (login: string, password: string) => dispatch(authorization(login, password));

    return { doRegistration, doAuth };
};

export default connect(mapStateToProps, mapDispatchToProps)(authButton);