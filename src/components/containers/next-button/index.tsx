import { ReactElement, FC } from 'react';
import Presentations from '@presentations';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { ReducersState } from '@store';
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
  disabled: boolean;
  isAuth: boolean;
  userId: number | null;
  useAbuse: boolean;
  nextWord: (userId: number | null, isAuth: boolean, useAbuse: boolean) => void;
}

const nextButton: FC<IProps> = ({ disabled, isAuth, userId, nextWord, useAbuse }): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <Presentations.Button
        click={() => nextWord(userId, isAuth, useAbuse)}
        disabled={disabled}
        icon={<NavigateNextIcon />}
        title="Далее"
      />
    </ThemeProvider>
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    repeat: { finished },
    auth: { isAuth, userId },
    settings: { useAbuse },
  } = state;
  return { disabled: !finished, isAuth, userId, useAbuse };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<ReducersState, void, AnyAction>) => {
  const nextWord = (userId: number | null, isAuth: boolean, useAbuse: boolean) =>
    dispatch(setRepeatWordData(userId, isAuth, useAbuse));

  return { nextWord };
};

export default connect(mapStateToProps, mapDispatchToProps)(nextButton);
