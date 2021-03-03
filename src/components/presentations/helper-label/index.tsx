import { FC, ReactElement } from 'react';
import { helper_container } from './styles.scss';

interface IProps {
  text: string;
}

const helperLabel: FC<IProps> = ({ text }): ReactElement => {
  return <div className={helper_container}>{text}</div>;
};

export default helperLabel;
