import { ReactElement, FC } from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { connect } from 'react-redux';
import { ReducersState } from '@store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { setRepeatWordData } from '@reducers/repeat';
import { Button } from '@material-ui/core';
import { nextButton_button } from './styles.scss';

interface IProps {
  disabled: boolean;
  isAuth: boolean;
  userId: number | null;
  useAbuse: boolean;
  nextWord: (userId: number | null, isAuth: boolean, useAbuse: boolean) => void;
}

const nextButton: FC<IProps> = ({ disabled, isAuth, userId, nextWord, useAbuse }): ReactElement => {
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
