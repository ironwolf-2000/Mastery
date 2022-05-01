import { IHeatmapCellParams } from '../common/Heatmap/Heatmap.types';

export type IEntityType = 'habit' | 'skill';

export interface IEntityParams {
  name: string;
  userEmail: string;
  motivation: string;
  entityFrequency: number;
  requirementsShortDescription: string;
  requirementsUnits: number;
  successRate: number;
  heatmap: IHeatmapCellParams[][];
  startTime: number;
}
