import { blk } from './Heatmap';
import { IRowProps } from './Heatmap.types';

export const Row = ({ children }: IRowProps) => {
  return <div className={blk('Row')}>{children}</div>;
};
