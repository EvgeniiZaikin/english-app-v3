import { ReactElement, FC } from 'react';
import Presentations from '@presentations';

import {
  wordCard__container,
  wordCard__word,
  wordCard__category,
  wordCard__container_dark,
  wordCard__container_light,
  wordCard__transcription,
} from './styles.scss';

interface IProps {
  word: string;
  category: string;
  theme: string;
  isExpression: boolean;
  isSlang: boolean;
  isAbuse: boolean;
  isAbbreviation: boolean;
  transcription: string | null;
}

const wordCard: FC<IProps> = ({
  word,
  category,
  theme,
  isExpression,
  isSlang,
  isAbuse,
  isAbbreviation,
  transcription,
}): ReactElement => {
  const containerTheme: string = theme === 'light' ? wordCard__container_light : wordCard__container_dark;

  return (
    <div className={`${wordCard__container} ${containerTheme}`}>
      <Presentations.WordsTypesChips
        isExpression={isExpression}
        isSlang={isSlang}
        isAbuse={isAbuse}
        isAbbreviation={isAbbreviation}
      />
      <p className={wordCard__word}>{word}</p>
      <p className={wordCard__transcription}>{transcription ? `[${transcription}]` : `Транскрипция не указана`}</p>
      <p className={wordCard__category}>{category}</p>
    </div>
  );
};

export default wordCard;
