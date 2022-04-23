import { ReactNode } from 'react';
import { blk } from './Heatmap';

export const Row = ({ children }: IRowProps) => {
  return <div className={blk('Row')}>{children}</div>;
};

interface IRowProps {
  children: ReactNode;
}
