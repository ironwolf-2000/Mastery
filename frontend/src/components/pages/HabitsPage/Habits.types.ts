import { IEntityParams, IEntityType } from '../../App/App.types';

export type IHabitParams = IEntityParams;

export interface IEntitiesMotivationProps {
  entityType: IEntityType;
}

export interface IMotivationMessageParams {
  text: string;
  author: string;
}
