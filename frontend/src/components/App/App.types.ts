import { IHeatmapCellParams } from '../common/Heatmap/Heatmap.types';

export const ENTITY_TYPES = ['habit', 'skill', 'preference'] as const;
export const ENTITY_STATUSES = ['active', 'completed', 'failed'] as const;

export type IEntityType = typeof ENTITY_TYPES[number];
export type IEntityStatus = typeof ENTITY_STATUSES[number];

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
  entityType: IEntityType;
}

export type IEntityEditParams = Pick<
  IEntityParams,
  'name' | 'motivation' | 'requirementsText' | 'requirementsMinValue'
>;
