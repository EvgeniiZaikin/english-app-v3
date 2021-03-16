import { FC, ReactElement } from 'react';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

interface IProps {
  checked: boolean;
  color: string;
  onClick: () => void;
}

const onOffSwitch: FC<IProps> = ({ checked, color, onClick }): ReactElement => {
  return (
    <Grid component="label" container alignItems="center" spacing={1}>
      <Grid item>Off</Grid>
      <Grid item>
        <Switch
          checked={checked}
          onChange={onClick}
          color={color}
          name="checkedB"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </Grid>
      <Grid item>On</Grid>
    </Grid>
  );
};

export default onOffSwitch;
