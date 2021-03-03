import { FC, ReactElement, PropsWithChildren } from 'react';
import { wrapper__container } from './styles.scss';

const searchPageWrapper: FC<PropsWithChildren<{}>> = ({ children }): ReactElement => {
  return <div className={wrapper__container}>{children}</div>;
};

export default searchPageWrapper;
