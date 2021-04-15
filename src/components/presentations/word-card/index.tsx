import { ReactElement, FC } from 'react';
import Presentations from '@presentations';

import { wordCard__container, wordCard__word, wordCard__category, wordCard__transcription } from './styles.scss';

interface IProps {
  word: string;
  category: string;
  isExpression: boolean;
  isSlang: boolean;
  isAbuse: boolean;
  isAbbreviation: boolean;
  transcription: string | null;
  showTranscription?: boolean;
}

const wordCard: FC<IProps> = ({
  word,
  category,
  isExpression,
  isSlang,
  isAbuse,
  isAbbreviation,
  transcription,
  showTranscription = false,
}): ReactElement => (
  <div className={wordCard__container}>
    <Presentations.WordsTypesChips
      isExpression={isExpression}
      isSlang={isSlang}
      isAbuse={isAbuse}
      isAbbreviation={isAbbreviation}
    />
    <p className={wordCard__word}>{word}</p>
    {showTranscription && (
      <p className={wordCard__transcription}>{transcription ? `[${transcription}]` : `Транскрипция не указана`}</p>
    )}
    <p className={wordCard__category}>{category}</p>
  </div>
);

export default wordCard;
