import { NextPage } from 'next';
import { ReactElement } from 'react';
import Containers from '@containers';

const authPage: NextPage = (): ReactElement => (
  <Containers.MainLayout>
    <Containers.AuthPageWrapper />
  </Containers.MainLayout>
);

export default authPage;
