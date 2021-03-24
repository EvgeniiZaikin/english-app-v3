import { FC, ReactElement } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { connect } from 'react-redux';
import { ReducersState } from '@store';
import { AnyAction } from 'redux';
import { createWordOrCategory } from '@reducers/create';
import { ThunkDispatch } from 'redux-thunk';
import { printLog } from '@utils/functions';
import { Button } from '@material-ui/core';
import { saveButton_button } from './styles.scss';

interface IProps {
  type: string;
  ruValue: string;
  category: string;
  enValue: string;
  create: Function;
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
      printLog(`Something was wrong with save! ${error}`);
    }
  };

  return (
    <Button
      className={saveButton_button}
      onClick={save}
      variant="contained"
      size="large"
      color="primary"
      startIcon={<SaveIcon />}
      disabled={disabled}
      fullWidth={true}
    >
      Сохранить
    </Button>
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    create: { type, ruValue, enValue, category, expression, slang, abuse, abbreviation, transcription },
  } = state;
  return { type, ruValue, enValue, category, expression, slang, abuse, abbreviation, transcription };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<ReducersState, void, AnyAction>) => {
  const create = (type: string, params: object) => dispatch(createWordOrCategory(type, params));
  return { create };
};

export default connect(mapStateToProps, mapDispatchToProps)(saveButton);
