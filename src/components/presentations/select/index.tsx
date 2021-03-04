import { ChangeEvent, ReactElement, ReactNode } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import uniqid from 'uniqid';

interface IProps {
  title: string;
  value: string;
  change: (event: ChangeEvent<{ name?: string; value: unknown }>, child: ReactNode) => void;
  options: Array<string>;
  error: boolean;
  helperText: string;
}

const select: React.FunctionComponent<IProps> = ({
  title,
  value,
  change,
  options,
  error,
  helperText,
}): ReactElement => (
  <FormControl fullWidth={true} error={error}>
    <InputLabel htmlFor="age-native-simple">{title}</InputLabel>
    <Select native value={value} onChange={change}>
      <option aria-label="None" value="" />
      {options.map((item: string) => (
        <option key={uniqid()} value={item}>
          {value}
        </option>
      ))}
    </Select>
    {error && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

export default select;
