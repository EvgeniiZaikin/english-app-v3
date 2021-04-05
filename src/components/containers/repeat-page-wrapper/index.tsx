import { ReactElement, FC } from 'react';
import { useSelector } from 'react-redux';
import uniqid from 'uniqid';

import Presentations from '@presentations';
import Containers from '@containers';

import {
  getWord,
  getCategory,
  getEnValues,
  getIsExpression,
  getIsSlang,
  getIsAbuse,
  getIsAbbreviation,
  getTranscription,
} from '@reducers/repeat/selectors';

import {
  repeatPage_container,
  repeatPage__wordCard,
  repeatPage__nextButton,
  repeatPage__variants,
} from './styles.scss';

const RepeatPageWrapper: FC = (): ReactElement => {
  const word = useSelector(getWord);
  const category = useSelector(getCategory);
  const enValues = useSelector(getEnValues);
  const isExpression = useSelector(getIsExpression);
  const isSlang = useSelector(getIsSlang);
  const isAbuse = useSelector(getIsAbuse);
  const isAbbreviation = useSelector(getIsAbbreviation);
  const transcription = useSelector(getTranscription);

  return (
    <>
      {word.length ? (
        <div className={repeatPage_container}>
          <div className={repeatPage__wordCard}>
            <Presentations.WordCard
              word={word}
              category={category}
              isExpression={isExpression}
              isSlang={isSlang}
              isAbuse={isAbuse}
              isAbbreviation={isAbbreviation}
              transcription={transcription}
            />
          </div>
          <div className={repeatPage__variants}>
            {enValues.map((variant: string) => {
              return <Containers.TranslateVariant key={uniqid()} value={variant} />;
            })}
          </div>
          <div className={repeatPage__nextButton}>
            <Containers.NextButton />
          </div>
        </div>
      ) : (
        <div>На сервере произошла ошибка. Попробуйте позже.</div>
      )}
    </>
  );
};

export default RepeatPageWrapper;
