import { connect } from 'react-redux';
import { FC, ReactElement } from 'react';

import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Presentations from '@presentations';

import { reducersState } from '@store';
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
      <Presentations.WordsTypesChips
        isExpression={isExpression}
        isSlang={isSlang}
        isAbuse={isAbuse}
        isAbbreviation={isAbbreviation}
      />
      <List>
        <ListItem disableGutters={true}>
          <ListItemText style={{ fontWeight: 'bold' }} primary={ruValue} secondary={category} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disableGutters={true}>
          <ListItemText
            primary={enValue}
            secondary={transcription ? `[${transcription}]` : `Транскрипция не указана`}
          />
        </ListItem>
      </List>
    </div>
  );
};

const mapStateToProps = (state: reducersState) => {
  const {
    search: { ruValue, enValue, category, isExpression, isSlang, isAbuse, isAbbreviation, transcription },
  } = state;
  return { ruValue, enValue, category, isExpression, isSlang, isAbuse, isAbbreviation, transcription };
};

export default connect(mapStateToProps)(searchInfo);
