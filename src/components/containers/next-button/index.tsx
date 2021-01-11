import { ReactElement, FC } from 'react';
import Presentations from '@presentations';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reducersState } from '@store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { setRepeatWordData } from '../../../store/reducers/repeat';

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
    nextWord: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
};

const nextButton: FC<IProps> = ({ disabled, nextWord }) : ReactElement => {
    return (
        <ThemeProvider theme={ theme }>
            <Presentations.Button 
                click={ nextWord }
                disabled={ disabled }
                icon={ <NavigateNextIcon /> }
                title={ `Далее` }
            />
        </ThemeProvider>
    );
};

const mapStateToProps = (state: reducersState) => {
    const { repeat: { finished } } = state;
    return { disabled: !finished };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<reducersState, void, AnyAction>) => {
    const nextWord = () => dispatch(setRepeatWordData());
    return { nextWord };
};

export default connect(mapStateToProps, mapDispatchToProps)(nextButton);