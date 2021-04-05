import { ReactElement, FC } from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { connect, useSelector } from 'react-redux';
import { ReducersState } from '@store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { setRepeatWordData } from '@reducers/repeat';
import { Button } from '@material-ui/core';
import { getUserId, getIsAuth } from '@reducers/auth/selectors';
import { nextButton_button } from './styles.scss';

interface IProps {
  disabled: boolean;
  useAbuse: boolean;
  nextWord: (userId: number | null, isAuth: boolean, useAbuse: boolean) => void;
}

const NextButton: FC<IProps> = ({ disabled, nextWord, useAbuse }): ReactElement => {
  const userId = useSelector(getUserId);
  const isAuth = useSelector(getIsAuth);

  const handleNextWord = () => nextWord(userId, isAuth, useAbuse);

  return (
    <Button
      className={nextButton_button}
      onClick={handleNextWord}
      variant="contained"
      size="large"
      color="primary"
      startIcon={<NavigateNextIcon />}
      disabled={disabled}
      fullWidth={true}
    >
      Далее
    </Button>
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    repeat: { finished },
    settings: { useAbuse },
  } = state;
  return { disabled: !finished, useAbuse };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<ReducersState, void, AnyAction>) => {
  const nextWord = (userId: number | null, isAuth: boolean, useAbuse: boolean) =>
    dispatch(setRepeatWordData(userId, isAuth, useAbuse));

  return { nextWord };
};

export default connect(mapStateToProps, mapDispatchToProps)(NextButton);
