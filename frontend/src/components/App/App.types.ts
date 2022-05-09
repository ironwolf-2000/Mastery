import { IHeatmapCellParams } from '../common/Heatmap/Heatmap.types';

export type IEntityType = 'habit' | 'skill' | 'preference';

export interface IEntityParams {
  name: string;
  userEmail: string;
  motivation: string;
  entityFrequency: number;
  requirementsText: string;
  requirementsMinValue: number;
  successRate: number;
  heatmap: IHeatmapCellParams[][];
  startTime: number;
}

export type IEntityEditParams = Pick<
  IEntityParams,
  'name' | 'motivation' | 'requirementsText' | 'requirementsMinValue'
>;
