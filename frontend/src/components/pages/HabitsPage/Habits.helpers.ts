import { ICreateParams } from '../../common/Forms/Forms.types';
import { IHabitParams } from './Habits.types';

export function createParamsToHabitParams(params: ICreateParams): IHabitParams {
  const timePeriod = Number(params.masteryType.match(/\d+/)?.[0] ?? '36');
  const heatmapSize = Math.sqrt(timePeriod);

  const heatmap = new Array(heatmapSize);
  for (let i = 0; i < heatmapSize; i++) {
    heatmap[i] = new Array(heatmapSize).fill(0);
  }

  return {
    name: params.entityName,
    motivation: params.motivationTextarea,
    timePeriod,
    successRate: params.successRate,
    heatmap,
  };
}
