export interface IHabitParams {
  name: string;
  motivation: string;
  successRate: number;
}

export interface IHabitsDashboardProps {
  habits: IHabitParams[];
  currHeatmapState: number[][];
  allHeatmapState: number[][];
}
