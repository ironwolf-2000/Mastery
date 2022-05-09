import { IEntityType } from '../App/App.types';

export interface IQuotesComponentProps {
  entityType: Exclude<IEntityType, 'preference'>;
}

export interface IMotivationMessageParams {
  text: string;
  author: string;
}
