import { ReactElement, FC } from 'react';
import Presentations from '@presentations';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reducersState } from '@store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { setRepeatWordData } from '@reducers/repeat';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#008000',
        contrastText: '#fff',
      },
    },
});

interface IProps {
    disabled: boolean,
    isAuth: boolean,
    userId: number | null,
    nextWord: (userId: number | null, isAuth: boolean) => void,
};

const nextButton: FC<IProps> = ({ disabled, isAuth, userId, nextWord }) : ReactElement => {
    return (
        <ThemeProvider theme={ theme }>
            <Presentations.Button 
                click={ () => nextWord(userId, isAuth) }
                disabled={ disabled }
                icon={ <NavigateNextIcon /> }
                title={ `Далее` }
            />
        </ThemeProvider>
    );
};

const mapStateToProps = (state: reducersState) => {
    const { 
        repeat: { finished },
        auth: { isAuth, userId },
    } = state;
    return { disabled: !finished, isAuth, userId };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<reducersState, void, AnyAction>) => {
    const nextWord = (userId: number | null, isAuth: boolean) => dispatch(setRepeatWordData(userId, isAuth));
    return { nextWord };
};

export default connect(mapStateToProps, mapDispatchToProps)(nextButton);