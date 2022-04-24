export interface IHabitParams {
  name: string;
  motivation: string;
  timePeriod: number;
  successRate: number;
  heatmap: number[][];
}

export interface IHabitsProps {
  overallHeatmap: number[][];
}
