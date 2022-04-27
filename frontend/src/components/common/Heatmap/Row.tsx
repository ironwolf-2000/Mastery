import { blk } from './Heatmap';
import { IHeatmapRowProps } from './Heatmap.types';

export const Row = ({ children }: IHeatmapRowProps) => {
  return <div className={blk('Row')}>{children}</div>;
};
