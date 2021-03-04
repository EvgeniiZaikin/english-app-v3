import { ChangeEvent, FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { reducersState } from '@store';
import { setRuValue } from '@reducers/create';
import Presentations from '@presentations';

interface IProps {
  ruValue: string;
  setValue: Function;
}

const ruValueInput: FC<IProps> = ({ ruValue, setValue }): ReactElement => {
  return (
    <Presentations.Input
      change={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(event.target.value)}
      defaultValue={ruValue}
      errorCondition={!ruValue}
      label="RU значение"
      placeholder="RU значение"
    />
  );
};

const mapStateToProps = (state: reducersState) => {
  const {
    create: { ruValue },
  } = state;
  return { ruValue };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const setValue = (value: string) => dispatch(setRuValue(value));
  return { setValue };
};

export default connect(mapStateToProps, mapDispatchToProps)(ruValueInput);
