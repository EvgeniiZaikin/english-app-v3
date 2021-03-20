import { FC, ReactElement } from 'react';

import Containers from '@containers';

const AuthForm: FC = (): ReactElement => (
  <div>
    <Containers.LoginInput />
    <Containers.PasswordInput />
  </div>
);

export default AuthForm;
