import { ChangeEvent, FC, ReactElement } from 'react';
import Presentations from '@presentations';
import { connect } from 'react-redux';
import { reducersState } from '@store';
import { Dispatch } from 'redux';
import { setEnValue } from '@reducers/create';

interface IProps {
  enValue: string;
  setValue: Function;
}

const enValueInput: FC<IProps> = ({ enValue, setValue }): ReactElement => {
  return (
    <Presentations.Input
      change={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(event.target.value)}
      defaultValue={enValue}
      errorCondition={!enValue}
      label={`EN значение`}
      placeholder={`EN значение`}
    />
  );
};

const mapStateToProps = (state: reducersState) => {
  const {
    create: { enValue },
  } = state;
  return { enValue };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const setValue = (value: string) => dispatch(setEnValue(value));
  return { setValue };
};

export default connect(mapStateToProps, mapDispatchToProps)(enValueInput);
