import { FC, ReactElement } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Presentations from '@presentations';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { connect } from 'react-redux';
import { reducersState } from '@store';
import { AsyncDispatch } from '@utils/types';
import { registration } from '@reducers/auth';

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
};

const authButton: FC<IProps> = ({ label, login, password, withRegistration = false, doRegistration }) : ReactElement => {
    const registration = () => doRegistration(login, password);

    return (
        <ThemeProvider theme={ theme }>
            <Presentations.Button 
                click={ registration }
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

    return { doRegistration };
};

export default connect(mapStateToProps, mapDispatchToProps)(authButton);