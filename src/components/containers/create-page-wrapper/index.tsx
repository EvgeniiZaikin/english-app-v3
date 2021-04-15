import { FC, ReactElement, ChangeEvent } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
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
import {
  getCategory,
  getEnValue,
  getIsAbbreviation,
  getIsAbuse,
  getIsExpression,
  getRuValue,
  getTranscription,
  getEntity,
  getExistsCategory,
  getIsSlang,
  getListExistCategories,
} from '@reducers/create/selectors';
import { changeField, saveField } from '@reducers/create/creators';
import { ICreateState } from '@reducers/create/types';

import { ChangeInput } from './types';
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

const CreatePageWrapper: FC = (): ReactElement => {
  const entity = useSelector(getEntity);
  const existsCategory = useSelector(getExistsCategory);
  const category = useSelector(getCategory);
  const ruValue = useSelector(getRuValue);
  const enValue = useSelector(getEnValue);
  const transcription = useSelector(getTranscription);
  const isExpression = useSelector(getIsExpression);
  const isSlang = useSelector(getIsSlang);
  const isAbuse = useSelector(getIsAbuse);
  const isAbbreviation = useSelector(getIsAbbreviation);
  const categories = useSelector(getListExistCategories);

  const dispatch = useDispatch();

  const handleChangeEntity = (event: ChangeEvent<{ name?: string; value: string }>) => {
    dispatch(changeField('entity', event.target.value as 'word' | 'category'));
  };

  const handleChangeEnValue = (event: ChangeInput) => dispatch(changeField('enValue', event.target.value));
  const handleChangeRuValue = (event: ChangeInput) => dispatch(changeField('ruValue', event.target.value));
  const handleChangeTranscription = (event: ChangeInput) => dispatch(changeField('transcription', event.target.value));
  const handleChangeCategory = (event: ChangeInput) => dispatch(changeField('category', event.target.value));

  const handleChooseExistsCategory = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    dispatch(changeField('existsCategory', event.target.value as string));
  };

  const handleSetIsExpression = () => dispatch(changeField('isExpression', !isExpression));
  const handleSetIsSlang = () => dispatch(changeField('isSlang', !isSlang));
  const handleSetIsAbuse = () => dispatch(changeField('isAbuse', !isAbuse));
  const handleSetIsAbbreviation = () => dispatch(changeField('isAbbreviation', !isAbbreviation));

  let disabledSaveButton: boolean = false;
  if (entity === 'word') disabledSaveButton = !existsCategory || !ruValue || !enValue || !transcription;
  if (entity === 'category') disabledSaveButton = !category;

  const handleSaveButtonClick = async () => {
    const params: Omit<ICreateState, 'listExistCategories'> = {
      entity,
      ruValue,
      enValue,
      transcription,
      isExpression,
      isSlang,
      isAbuse,
      isAbbreviation,
      category,
      existsCategory,
    };

    dispatch(saveField(params));
  };

  return (
    <div className={layout__container}>
      <div className={layout__wrap}>
        <div className={layout__top}>
          <RadioGroup
            onChange={handleChangeEntity}
            row
            aria-label="position"
            name="position"
            // defaultValue={entity}
            value={entity}
          >
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

export default connect()(CreatePageWrapper);
