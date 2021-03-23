import { FC, ReactElement } from 'react';
import { Menu, MenuItem, Divider, Grid, Switch } from '@material-ui/core';

interface ISettingsBlockProps {
  anchorElement: HTMLElement | null;
  id: string;
  isOpen: boolean;
  isRememberChecked: boolean;
  isRememberDisabled: boolean;
  useAbuseChecked: boolean;
  useAbuseDisabled: boolean;
  onClose(): void;
  isRememberOnChange(): void;
  useAbuseOnChange(): void;
}

const SettingsBlock: FC<ISettingsBlockProps> = ({
  anchorElement,
  id,
  isOpen,
  isRememberChecked,
  isRememberDisabled,
  useAbuseChecked,
  useAbuseDisabled,
  onClose,
  isRememberOnChange,
  useAbuseOnChange,
}): ReactElement => {
  return (
    <Menu
      anchorEl={anchorElement}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={id}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isOpen}
      onClose={onClose}
    >
      <MenuItem>
        <div>
          <div>Запомнить пользователя:</div>
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Off</Grid>
            <Grid item>
              <Switch
                disabled={isRememberDisabled}
                checked={isRememberChecked}
                onChange={isRememberOnChange}
                color="primary"
                name="isRemember"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
            <Grid item>On</Grid>
          </Grid>
          <Divider />
          <div>Использовать мат:</div>
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Off</Grid>
            <Grid item>
              <Switch
                disabled={useAbuseDisabled}
                checked={useAbuseChecked}
                onChange={useAbuseOnChange}
                color="secondary"
                name="usAbuse"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
            <Grid item>On</Grid>
          </Grid>
        </div>
      </MenuItem>
    </Menu>
  );
};

export default SettingsBlock;
