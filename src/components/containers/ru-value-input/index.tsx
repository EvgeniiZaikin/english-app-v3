import { ChangeEvent, FC, ReactElement } from 'react';
import Presentations from '@presentations';
import { connect } from 'react-redux';
import { reducersState } from '@store';
import { Dispatch } from 'redux';
import { setRuValue } from '@reducers/create';

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
      label={`RU значение`}
      placeholder={`RU значение`}
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
