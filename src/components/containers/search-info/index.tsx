import { useSelector } from 'react-redux';
import { FC, ReactElement } from 'react';
import { Typography } from '@material-ui/core';

import Presentations from '@presentations';
import {
  getRuValue,
  getEnValue,
  getCategory,
  getIsExpression,
  getIsSlang,
  getIsAbuse,
  getIsAbbreviation,
  getTranscription,
} from '@reducers/search/selectors';

import { searchWordInfo__container } from './styles.scss';

const SearchInfo: FC = (): ReactElement => {
  const ruValue = useSelector(getRuValue);
  const enValue = useSelector(getEnValue);
  const category = useSelector(getCategory);
  const isExpression = useSelector(getIsExpression);
  const isSlang = useSelector(getIsSlang);
  const isAbuse = useSelector(getIsAbuse);
  const isAbbreviation = useSelector(getIsAbbreviation);
  const transcription = useSelector(getTranscription);

  return (
    <div className={searchWordInfo__container}>
      <Typography variant="h4" gutterBottom>
        {ruValue}
      </Typography>
      <Presentations.WordCard
        word={enValue}
        category={category}
        isExpression={isExpression}
        isSlang={isSlang}
        isAbuse={isAbuse}
        isAbbreviation={isAbbreviation}
        transcription={transcription}
      />
    </div>
  );
};

export default SearchInfo;
