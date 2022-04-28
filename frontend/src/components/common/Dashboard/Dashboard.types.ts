import { IEntityType } from '../../App/App.types';

export interface IDashboardProps {
  className?: string;
  entityType: IEntityType;
  redirectPath: string;
  entityHeatmapColor: string;
}
