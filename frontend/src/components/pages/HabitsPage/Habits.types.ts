export interface IHabitParams {
  name: string;
  motivation: string;
  timePeriod: number;
  successRate: number;
  heatmap: number[][];
  startTime: number;
}

export interface IHabitsProps {
  overallHeatmap: number[][];
}
