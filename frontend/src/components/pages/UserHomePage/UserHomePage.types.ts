import { IEntityType } from '../../App/App.types';
import { IHeatmapCellParams } from '../../common/Heatmap/Heatmap.types';
import { IUser } from '../../RegisterForm/RegisterForm.types';

export interface IUserHomePageProps {
  user: IUser | null;
}

export type IEntityOverallHeatmaps = Partial<Record<IEntityType, IHeatmapCellParams[][]>>;
