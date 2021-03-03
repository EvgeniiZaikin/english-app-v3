import React, { FC, ReactElement } from 'react';
import Containers from '@containers';
import {
  layout__container,
  layout__wrap,
  layout__save,
  layout__values,
  layout__divider,
  layout__top,
  layout__spacer,
} from './styles.scss';
import { connect } from 'react-redux';
import { reducersState } from '@store';

interface IProps {
  type: string;
}

const Spacer = () => <div className={layout__spacer}></div>;

const createPageWrapper: FC<IProps> = ({ type }): ReactElement => {
  return (
    <div className={layout__container}>
      <div className={layout__wrap}>
        <div className={layout__top}>
          <Containers.TypeRadioButtons />
          <hr className={layout__divider} />
          {type === `word` ? <Containers.CategorySelect /> : <Spacer />}
        </div>
        <div className={layout__values}>
          <Containers.RuValueInput />
          {type === `word` ? <Containers.EnValueInput /> : <Spacer />}
        </div>
        {type === `word` ? (
          <Containers.CreateCheckboxsGroup />
        ) : (
          <>
            <Spacer />
            <Spacer />
          </>
        )}
        <div className={layout__save}>
          <Containers.SaveButton />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: reducersState) => {
  const {
    create: { type },
  } = state;
  return { type };
};

export default connect(mapStateToProps)(createPageWrapper);
