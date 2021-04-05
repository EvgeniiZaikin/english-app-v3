export interface IAuthState {
  userId: number | null;
  login: string;
  password: string;
  showPassword: boolean;
  isAuth: boolean;
}
