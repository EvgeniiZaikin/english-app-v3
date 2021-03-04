import { ReactElement, FC, Fragment } from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';

import Presentations from '@presentations';
import Containers from '@containers';
import { reducersState } from '@store';

import {
  repeatPage_container,
  repeatPage__wordCard,
  repeatPage__nextButton,
  repeatPage__variants,
} from './styles.scss';

interface IProps {
  word: string;
  category: string;
  enValues: Array<string>;
  theme: string;
}

const repeatPageWrapper: FC<IProps> = ({ word, category, enValues, theme }): ReactElement => {
  return (
    <>
      {word.length ? (
        <div className={repeatPage_container}>
          <div className={repeatPage__wordCard}>
            <Presentations.WordCard theme={theme} word={word} category={category} />
          </div>
          <div className={repeatPage__variants}>
            {enValues.map((variant: string) => {
              return (
                <Fragment key={uniqid()}>
                  <Containers.TranslateVariant value={variant} />
                </Fragment>
              );
            })}
          </div>
          <div className={repeatPage__nextButton}>
            <Containers.NextButton />
          </div>
        </div>
      ) : (
        <div>На сервере произошла ошибка. Попробуйте позже.</div>
      )}
    </>
  );
};

const mapStateToProps = (state: reducersState) => {
  const {
    repeat: { word, category, enValues },
    theme: { theme },
  } = state;
  return { word, category, enValues, theme };
};

export default connect(mapStateToProps)(repeatPageWrapper);
