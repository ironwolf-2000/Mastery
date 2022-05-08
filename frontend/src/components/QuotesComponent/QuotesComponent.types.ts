import { IEntityType } from '../App/App.types';

export interface IQuotesComponentProps {
  entityType: IEntityType;
}

export interface IMotivationMessageParams {
  text: string;
  author: string;
}
