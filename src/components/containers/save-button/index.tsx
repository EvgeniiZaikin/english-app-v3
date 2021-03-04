import { FC, ReactElement } from 'react';
import Presentations from '@presentations';
import SaveIcon from '@material-ui/icons/Save';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reducersState } from '@store';
import { AnyAction } from 'redux';
import { createWordOrCategory } from '@reducers/create';
import { ThunkDispatch } from 'redux-thunk';

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
      });
    } catch (error: unknown) {
      alert('Something was wrong!');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Presentations.Button click={save} disabled={disabled} icon={<SaveIcon />} title="Сохранить" theme={appTheme} />
    </ThemeProvider>
  );
};

const mapStateToProps = (state: reducersState) => {
  const {
    create: { type, ruValue, enValue, category, expression, slang, abuse, abbreviation },
    theme: { theme },
  } = state;
  return { type, ruValue, enValue, category, appTheme: theme, expression, slang, abuse, abbreviation };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<reducersState, void, AnyAction>) => {
  const create = (type: string, params: object) => dispatch(createWordOrCategory(type, params));
  return { create };
};

export default connect(mapStateToProps, mapDispatchToProps)(saveButton);
