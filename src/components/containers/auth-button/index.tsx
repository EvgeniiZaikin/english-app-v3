import { FC, ReactElement } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Presentations from '@presentations';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { connect } from 'react-redux';
import { reducersState } from '@store';

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
};

const authButton: FC<IProps> = ({ label, login, password, withRegistration = false }) : ReactElement => {
    const tempMockFunc = () => { withRegistration && console.log(login, password) };

    return (
        <ThemeProvider theme={ theme }>
            <Presentations.Button 
                click={ tempMockFunc }
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

export default connect(mapStateToProps)(authButton);