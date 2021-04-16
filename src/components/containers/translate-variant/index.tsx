import { ReactElement, FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

import { finishRepeatWord, IUpdateWordParams, setRepeatWordStatus, updateWord } from '@reducers/repeat/creators';
import { getUserId, getIsAuth } from '@reducers/auth/selectors';

import { getWord, getRightEnValue, getFinished, getWordId } from '@reducers/repeat/selectors';

import { ITranslateVariantProps } from './types';
import {
  translateVariant__button,
  translateVariant__button_neutral,
  translateVariant__button_success,
  translateVariant__button_error,
  translateVariant__button_light,
} from './styles.scss';

const TranslateVariant: FC<ITranslateVariantProps> = ({ value, transcription }): ReactElement => {
  const isAuth = useSelector(getIsAuth);
  const userId = useSelector(getUserId);
  const wordId = useSelector(getWordId);
  const wordRuValue = useSelector(getWord);
  const rightEnValue = useSelector(getRightEnValue);
  const finished = useSelector(getFinished);

  const dispatch = useDispatch();
  const openNextButton = () => dispatch(finishRepeatWord());
  const setGuessedWordStatus = (guessed: boolean) => dispatch(setRepeatWordStatus(guessed));
  const updateGuessedWord = (params: IUpdateWordParams) => dispatch(updateWord(params));

  const [style, setStyle] = useState(translateVariant__button_neutral);
  const classes = clsx(translateVariant__button, translateVariant__button_light, style);

  const click = () => {
    const guessed: boolean = value === rightEnValue;

    const currentStyle: string = guessed ? translateVariant__button_success : translateVariant__button_error;
    setStyle(currentStyle);

    openNextButton();
    setGuessedWordStatus(guessed);
    updateGuessedWord({
      id: Number(wordId),
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
      <br />
      {transcription ? `[${transcription}]` : `Транскрипция не указана`}
    </button>
  );
};

export default TranslateVariant;
