import { NextPage } from 'next';
import { ReactElement } from 'react';
import Containers from '@containers';
import Presentations from '@presentations';

const SearchPage: NextPage = (): ReactElement => (
  <Containers.MainLayout>
    <Presentations.SearchPageWrapper>
      <Containers.SearchInput />
      <Containers.SearchInfo />
    </Presentations.SearchPageWrapper>
  </Containers.MainLayout>
);

export default SearchPage;
