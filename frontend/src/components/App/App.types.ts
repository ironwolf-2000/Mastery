import { IHeatmapCellParams } from '../common/Heatmap/Heatmap.types';

export const ENTITY_TYPES = ['habit', 'skill', 'preference'] as const;
export type IEntityType = typeof ENTITY_TYPES[number];

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
