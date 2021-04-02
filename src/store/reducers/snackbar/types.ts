export enum TSnackbar {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export interface ISnackbarState {
  show: boolean;
  message: string;
  type: TSnackbar;
}
