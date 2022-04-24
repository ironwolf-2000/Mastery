import { ICreateParams } from '../../common/Forms/Forms.types';
import { IHabitParams } from './Habits.types';

export function createParamsToHabitParams(params: ICreateParams): IHabitParams {
  return {
    name: params.entityName,
    motivation: params.motivationTextarea,
    successRate: params.successRate ?? 100,
  };
}
