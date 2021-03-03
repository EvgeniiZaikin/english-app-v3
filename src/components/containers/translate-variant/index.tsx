import { ReactElement, FC, useState } from 'react';
import {
  translateVariant__button,
  translateVariant__button_neutral,
  translateVariant__button_success,
  translateVariant__button_error,
  translateVariant__button_light,
  translateVariant__button_dark,
} from './styles.scss';
import { connect } from 'react-redux';
import { reducersState } from '@store';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { finishRepeatWord, setRepeatWordStatus, updateWord } from '@reducers/repeat';

interface IProps {
  value: string;
  wordId: number | null;
  wordRuValue: string;
  rightEnValue: string;
  openNextButton: Function;
  setGuessedWordStatus: Function;
  finished: boolean;
  updateGuessedWord: Function;
  theme: string;
  isAuth: boolean;
  userId: number | null;
}

const translateVariant: FC<IProps> = ({
  value,
  rightEnValue,
  wordId,
  wordRuValue,
  openNextButton,
  setGuessedWordStatus,
  finished,
  updateGuessedWord,
  theme,
  isAuth,
  userId,
}): ReactElement => {
  const [style, setStyle] = useState(translateVariant__button_neutral);

  const classes: string = `
        ${translateVariant__button}
        &nbsp;
        ${style}
        &nbsp;
        ${theme === 'light' ? translateVariant__button_light : translateVariant__button_dark}
    `;

  const click = () => {
    const guessed: boolean = value === rightEnValue;

    const style: string = guessed ? translateVariant__button_success : translateVariant__button_error;
    setStyle(style);

    openNextButton();
    setGuessedWordStatus(guessed);
    updateGuessedWord({
      id: wordId,
      ruValue: wordRuValue,
      enValue: rightEnValue,
      incrementViews: true,
      success: guessed,
      isAuth,
      userId,
    });
  };

  return (
    <button disabled={finished} className={classes} onClick={click}>
      {value}
    </button>
  );
};

const mapStateToProps = (state: reducersState) => {
  const {
    repeat: { wordId, word, rightEnValue, finished },
    theme: { theme },
    auth: { isAuth, userId },
  } = state;
  return { wordId, wordRuValue: word, rightEnValue, finished, theme, isAuth, userId };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<reducersState, void, AnyAction>) => {
  const openNextButton = () => dispatch(finishRepeatWord());
  const setGuessedWordStatus = (guessed: boolean) => dispatch(setRepeatWordStatus(guessed));
  const updateGuessedWord = (params: object) => dispatch(updateWord(params));

  return {
    openNextButton,
    setGuessedWordStatus,
    updateGuessedWord,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translateVariant);
