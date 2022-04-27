import { IHeatmapCellParams } from '../../common/Heatmap/Heatmap.types';

export interface IHabitParams {
  name: string;
  motivation: string;
  timePeriod: number;
  successRate: number;
  heatmap: IHeatmapCellParams[][];
  startTime: number;
}

export interface IHabitsProps {
  overallHeatmap: IHeatmapCellParams[][];
}

export type IHeatmapInitializerProps = { size: number } & (
  | {
      useTitle: false;
    }
  | {
      useTitle: true;
      startTime: number;
    }
);
