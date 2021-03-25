import { connect } from 'react-redux';
import { FC, ReactElement } from 'react';
import { Typography } from '@material-ui/core';

import { ReducersState } from '@store';
import Presentations from '@presentations';

import { searchWordInfo__container } from './styles.scss';

interface IProps {
  ruValue: string;
  enValue: string;
  category: string;
  isExpression: boolean;
  isSlang: boolean;
  isAbuse: boolean;
  isAbbreviation: boolean;
  transcription: string | null;
}

const searchInfo: FC<IProps> = ({
  ruValue,
  enValue,
  category,
  isExpression,
  isSlang,
  isAbuse,
  isAbbreviation,
  transcription,
}): ReactElement => {
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

const mapStateToProps = (state: ReducersState) => {
  const {
    search: { ruValue, enValue, category, isExpression, isSlang, isAbuse, isAbbreviation, transcription },
  } = state;
  return { ruValue, enValue, category, isExpression, isSlang, isAbuse, isAbbreviation, transcription };
};

export default connect(mapStateToProps)(searchInfo);
