import { FC, ReactElement, ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';

interface IInputProps {
  value: string;
  helper: string;
  onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

const Input: FC<IInputProps> = ({ value, helper, onChange }): ReactElement => {
  return (
    <TextField
      onChange={onChange}
      defaultValue={value}
      error={!value}
      fullWidth={true}
      label={helper}
      helperText={helper}
      value={value}
    />
  );
};

export default Input;
