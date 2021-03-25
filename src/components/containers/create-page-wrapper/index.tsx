import { FC, ReactElement, useState, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Checkbox,
  Button,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import uniqid from 'uniqid';

import Presentations from '@presentations';
import { showGlobalLoading, hideGlobalLoading } from '@reducers/global-loading';
import { TSnackbar, showSnackbar } from '@reducers/snackbar';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { ReducersState } from '@store';
import axios from 'axios';
import { IResponse } from '@utils/interfaces';

import {
  layout__container,
  layout__wrap,
  layout__save,
  layout__values,
  layout__divider,
  layout__top,
  checkboxs__container,
  checkboxs__checkbox,
  checkboxs__wrapper,
  checkboxs__button,
} from './styles.scss';

interface ICreatePageWrapperProps {
  categories: Array<string>;
  showLoading(): void;
  hideLoading(): void;
  showSuccessSnackbar(message: string): void;
  showErrorSnackbar(message: string): void;
}

const CreatePageWrapper: FC<ICreatePageWrapperProps> = ({
  categories,
  showLoading,
  hideLoading,
  showSuccessSnackbar,
  showErrorSnackbar,
}): ReactElement => {
  const [entity, setEntity] = useState<'word' | 'category'>('word');
  const [existsCategory, chooseExistsCategory] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [ruValue, setRuValue] = useState<string>('');
  const [enValue, setEnValue] = useState<string>('');
  const [transcription, setTranscription] = useState<string>('');
  const [isExpression, setIsExpression] = useState<boolean>(false);
  const [isSlang, setIsSlang] = useState<boolean>(false);
  const [isAbuse, setIsAbuse] = useState<boolean>(false);
  const [isAbbreviation, setIsAbbreviation] = useState<boolean>(false);

  const handleChangeEntity = (event: ChangeEvent<{ name?: string; value: string }>) => {
    setEntity(event.target.value as 'word' | 'category');
  };

  type ChangeInput = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

  const handleChangeEnValue = (event: ChangeInput) => setEnValue(event.target.value);
  const handleChangeRuValue = (event: ChangeInput) => setRuValue(event.target.value);
  const handleChangeTranscription = (event: ChangeInput) => setTranscription(event.target.value);
  const handleChangeCategory = (event: ChangeInput) => setCategory(event.target.value);

  const handleChooseExistsCategory = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    chooseExistsCategory(event.target.value as string);
  };

  const handleSetIsExpression = () => setIsExpression(!isExpression);
  const handleSetIsSlang = () => setIsSlang(!isSlang);
  const handleSetIsAbuse = () => setIsAbuse(!isAbuse);
  const handleSetIsAbbreviation = () => setIsAbbreviation(!isAbbreviation);

  let disabledSaveButton: boolean = false;
  if (entity === 'word') disabledSaveButton = !existsCategory || !ruValue || !enValue || !transcription;
  if (entity === 'category') disabledSaveButton = !category;

  const handleSaveButtonClick = async () => {
    let url: string = '';
    entity === 'word' && (url = '/api/words/word');
    entity === 'category' && (url = '/api/categories/category');

    if (!url) {
      return;
    }

    let params: object = {};
    entity === 'word' &&
      (params = {
        ruValue,
        enValue,
        transcription,
        isExpression,
        isSlang,
        isAbuse,
        isAbbreviation,
        category: existsCategory,
      });
    entity === 'category' && (params = { category_label: category });

    let successMessage: string = '';
    entity === 'word' && (successMessage = 'Слово успешно создано');
    entity === 'category' && (successMessage = 'Категория успешно создана');

    let errorMessage: string = '';
    entity === 'word' && (errorMessage = 'Не удалось создать слово');
    entity === 'category' && (errorMessage = 'Не удалось создать категорию');

    let duplicateMessage: string = '';
    entity === 'word' && (duplicateMessage = 'Данное слово уже существует');
    entity === 'category' && (duplicateMessage = 'Данная категория уже существует');

    showLoading();

    try {
      const { data }: { data: IResponse } = await axios.post(url, params);
      if (data.status) showSuccessSnackbar(successMessage);
      else if ((data.error as Error).toString().includes('Duplicate entry')) showErrorSnackbar(duplicateMessage);
      else showErrorSnackbar(errorMessage);
    } catch (error: unknown) {
      if ((error as Error).toString().includes('Duplicate entry')) showErrorSnackbar(duplicateMessage);
      else showErrorSnackbar(errorMessage);
    }

    hideLoading();
  };

  return (
    <div className={layout__container}>
      <div className={layout__wrap}>
        <div className={layout__top}>
          <RadioGroup onChange={handleChangeEntity} row aria-label="position" name="position" defaultValue={entity}>
            {['word', 'category'].map((item: string) => {
              return <FormControlLabel key={uniqid()} value={item} control={<Radio color="primary" />} label={item} />;
            })}
          </RadioGroup>
          <hr className={layout__divider} />
        </div>

        <div className={layout__values}>
          {entity === 'category' && (
            <Presentations.Input value={category} helper="Название категории" onChange={handleChangeCategory} />
          )}

          {entity === 'word' && (
            <>
              <FormControl fullWidth={true} error={!existsCategory}>
                <InputLabel htmlFor="age-native-simple">Категория</InputLabel>
                <Select native value={existsCategory} onChange={handleChooseExistsCategory}>
                  <option aria-label="None" value="" />
                  {categories.map((item: string) => (
                    <option key={uniqid()} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
                {!existsCategory && <FormHelperText>Выберите категорию</FormHelperText>}
              </FormControl>

              <Presentations.Input value={ruValue} helper="RU значение" onChange={handleChangeRuValue} />
              <Presentations.Input value={enValue} helper="EN значение" onChange={handleChangeEnValue} />
              <Presentations.Input
                value={transcription}
                helper="Транскрипция EN значения"
                onChange={handleChangeTranscription}
              />

              <div className={checkboxs__container}>
                <div className={checkboxs__checkbox}>
                  <Checkbox onClick={handleSetIsExpression} color="primary" checked={isExpression} />
                  <button type="button" onClick={handleSetIsExpression} className={checkboxs__button}>
                    Выражение
                  </button>
                </div>

                <div className={checkboxs__checkbox}>
                  <Checkbox onClick={handleSetIsAbbreviation} color="primary" checked={isAbbreviation} />
                  <button type="button" onClick={handleSetIsAbbreviation} className={checkboxs__button}>
                    Абривиатура
                  </button>
                </div>

                <div className={checkboxs__wrapper}>
                  <div className={checkboxs__checkbox}>
                    <Checkbox onClick={handleSetIsSlang} color="primary" checked={isSlang} />
                    <button type="button" onClick={handleSetIsSlang} className={checkboxs__button}>
                      Сленг
                    </button>
                  </div>

                  <div className={checkboxs__checkbox}>
                    <Checkbox onClick={handleSetIsAbuse} color="primary" checked={isAbuse} />
                    <button type="button" onClick={handleSetIsAbuse} className={checkboxs__button}>
                      Мат
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className={layout__save}>
          <Button
            onClick={handleSaveButtonClick}
            variant="contained"
            size="large"
            color="primary"
            startIcon={<SaveIcon />}
            fullWidth={true}
            disabled={disabledSaveButton}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<ReducersState, void, AnyAction>) => {
  const showLoading = () => dispatch(showGlobalLoading());
  const hideLoading = () => dispatch(hideGlobalLoading());
  const showSuccessSnackbar = (message: string) => dispatch(showSnackbar(TSnackbar.SUCCESS, message));
  const showErrorSnackbar = (message: string) => dispatch(showSnackbar(TSnackbar.ERROR, message));

  return { showLoading, hideLoading, showSuccessSnackbar, showErrorSnackbar };
};

export default connect(null, mapDispatchToProps)(CreatePageWrapper);
