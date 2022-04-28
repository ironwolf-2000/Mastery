import { IHeatmapCellParams } from '../common/Heatmap/Heatmap.types';

export type IEntityType = 'habit' | 'skill';

export interface IEntityParams {
  name: string;
  motivation: string;
  timePeriod: number;
  successRate: number;
  heatmap: IHeatmapCellParams[][];
  startTime: number;
}
