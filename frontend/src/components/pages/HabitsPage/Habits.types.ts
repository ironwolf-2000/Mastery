import { IEntityParams } from '../../App/App.types';
import { IHeatmapCellParams } from '../../common/Heatmap/Heatmap.types';

export type IHabitParams = IEntityParams;

export interface IHabitsProps {
  entityHeatmap: IHeatmapCellParams[][];
}
