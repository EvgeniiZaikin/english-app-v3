import { ChangeEvent, FC, ReactElement } from 'react';
import Presentations from '@presentations';
import { connect } from 'react-redux';
import { ReducersState } from '@store';
import { Dispatch } from 'redux';
import { setTranscription } from '@reducers/create';

interface IProps {
  transcription: string;
  setValue: Function;
}

const enValueInput: FC<IProps> = ({ transcription, setValue }): ReactElement => {
  return (
    <Presentations.Input
      change={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(event.target.value)}
      defaultValue={transcription}
      errorCondition={!transcription}
      label="Транскрипция EN значения"
      placeholder="Транскрипция EN значения"
    />
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    create: { transcription },
  } = state;
  return { transcription };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const setValue = (value: string) => dispatch(setTranscription(value));
  return { setValue };
};

export default connect(mapStateToProps, mapDispatchToProps)(enValueInput);
