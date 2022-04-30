import { getCurrentUserEmail } from '../../../services/user.service';
import { getDateByDayDiff } from '../../../utils';
import { ICreateParams } from '../../common/Forms/Forms.types';
import { IHeatmapCellParams, IHeatmapInitializerProps } from '../../common/Heatmap/Heatmap.types';
import { IHabitParams } from './Habits.types';

export function getInitializedHeatmap(props: IHeatmapInitializerProps): IHeatmapCellParams[][] {
  const { size, useTitle } = props;

  const heatmap: IHeatmapCellParams[][] = new Array(size);
  for (let i = 0; i < size; i++) {
    heatmap[i] = [];

    for (let j = 0; j < size; j++) {
      const title = useTitle && getDateByDayDiff(props.startTime, i * size + j);
      const params = title ? ({ intensity: -1, title } as const) : ({ intensity: -1 } as const);

      heatmap[i].push(params);
    }
  }

  return heatmap;
}

export function createParamsToHabitParams(params: ICreateParams): IHabitParams {
  const timePeriod = Number(params.masteryType.match(/\d+/)?.[0] ?? '36');
  const heatmapSize = Math.sqrt(timePeriod);

  const userEmail = getCurrentUserEmail() ?? 'anonymous@email.com';
  const startTime = Date.now();

  return {
    name: params.entityName,
    userEmail,
    motivation: params.motivationTextarea,
    timePeriod,
    successRate: params.successRate,
    heatmap: getInitializedHeatmap({ size: heatmapSize, useTitle: true, startTime }),
    startTime,
  };
}
