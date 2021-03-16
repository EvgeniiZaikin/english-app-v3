import { NextPage } from 'next';
import { ReactElement } from 'react';
import Containers from '@containers';

const settingsPage: NextPage = (): ReactElement => (
  <Containers.MainLayout>
    <Containers.SettingsPageWrapper />
  </Containers.MainLayout>
);

export default settingsPage;
