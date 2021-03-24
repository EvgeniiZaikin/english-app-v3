import { ReactElement, FC, useState } from 'react';
import { connect } from 'react-redux';
import { ReducersState } from '@store';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { finishRepeatWord, IUpdateWordParams, setRepeatWordStatus, updateWord } from '@reducers/repeat';

import {
  translateVariant__button,
  translateVariant__button_neutral,
  translateVariant__button_success,
  translateVariant__button_error,
  translateVariant__button_light,
} from './styles.scss';

interface IProps {
  value: string;
  wordId: number | null;
  wordRuValue: string;
  rightEnValue: string;
  openNextButton: Function;
  setGuessedWordStatus: Function;
  finished: boolean;
  updateGuessedWord: Function;
  isAuth: boolean;
  userId: number | null;
}

const TranslateVariant: FC<IProps> = ({
  value,
  rightEnValue,
  wordId,
  wordRuValue,
  openNextButton,
  setGuessedWordStatus,
  finished,
  updateGuessedWord,
  isAuth,
  userId,
}): ReactElement => {
  const [style, setStyle] = useState(translateVariant__button_neutral);

  const classes: string = `
        ${translateVariant__button}
        &nbsp;
        ${translateVariant__button_light}
        &nbsp;
        ${style}
    `;

  const click = () => {
    const guessed: boolean = value === rightEnValue;

    const currentStyle: string = guessed ? translateVariant__button_success : translateVariant__button_error;
    setStyle(currentStyle);

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
    <button type="button" disabled={finished} className={classes} onClick={click}>
      {value}
    </button>
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    repeat: { wordId, word, rightEnValue, finished },
    auth: { isAuth, userId },
  } = state;
  return { wordId, wordRuValue: word, rightEnValue, finished, isAuth, userId };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<ReducersState, void, AnyAction>) => {
  const openNextButton = () => dispatch(finishRepeatWord());
  const setGuessedWordStatus = (guessed: boolean) => dispatch(setRepeatWordStatus(guessed));
  const updateGuessedWord = (params: IUpdateWordParams) => dispatch(updateWord(params));

  return {
    openNextButton,
    setGuessedWordStatus,
    updateGuessedWord,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TranslateVariant);
