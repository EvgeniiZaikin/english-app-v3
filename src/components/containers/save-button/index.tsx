import { FC, ReactElement } from 'react';
import Presentations from '@presentations';
import SaveIcon from '@material-ui/icons/Save';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { ReducersState } from '@store';
import { AnyAction } from 'redux';
import { createWordOrCategory } from '@reducers/create';
import { ThunkDispatch } from 'redux-thunk';
import { printLog } from '@utils/functions';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#008000',
      contrastText: '#fff',
    },
  },
});

interface IProps {
  type: string;
  ruValue: string;
  category: string;
  enValue: string;
  create: Function;
  appTheme: string;
  expression: boolean;
  slang: boolean;
  abuse: boolean;
  abbreviation: boolean;
  transcription: string;
}

const saveButton: FC<IProps> = ({
  type,
  ruValue,
  category,
  enValue,
  create,
  appTheme,
  expression,
  slang,
  abuse,
  abbreviation,
  transcription,
}): ReactElement => {
  let disabled: boolean = true;
  if (type === `word`) disabled = !ruValue || !category || !enValue;
  if (type === `category`) disabled = !ruValue;

  const save = () => {
    try {
      create(type, {
        ruValue,
        category_label: ruValue,
        enValue,
        category,
        expression,
        slang,
        abuse,
        abbreviation,
        transcription,
      });
    } catch (error: unknown) {
      printLog('Something was wrong with save!', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Presentations.Button click={save} disabled={disabled} icon={<SaveIcon />} title="Сохранить" theme={appTheme} />
    </ThemeProvider>
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    create: { type, ruValue, enValue, category, expression, slang, abuse, abbreviation, transcription },
    theme: { theme: appTheme },
  } = state;
  return { type, ruValue, enValue, category, appTheme, expression, slang, abuse, abbreviation, transcription };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<ReducersState, void, AnyAction>) => {
  const create = (type: string, params: object) => dispatch(createWordOrCategory(type, params));
  return { create };
};

export default connect(mapStateToProps, mapDispatchToProps)(saveButton);
