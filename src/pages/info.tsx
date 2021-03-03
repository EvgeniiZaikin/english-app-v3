import React, { ReactElement } from 'react';
import { NextPage } from 'next';

import Containers from '@containers';
import Presentations from '@presentations';

const indexPage: NextPage = (): ReactElement => {
  return (
    <Containers.MainLayout>
      <Presentations.InfoText />
    </Containers.MainLayout>
  );
};

export default indexPage;
