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
      if (useTitle) {
        const { startTime, entityFrequency } = props;
        const title =
          `${getDateByDayDiff(startTime, entityFrequency * (i * size + j))}` +
          (entityFrequency > 1
            ? ` - ${getDateByDayDiff(startTime, entityFrequency * (i * size + j + 1) - 1)}`
            : '');
        heatmap[i].push({ intensity: -1, title } as const);
      } else {
        heatmap[i].push({ intensity: -1 });
      }
    }
  }

  return heatmap;
}

function frequencyToHeatmapSizeMapper(frequency: number) {
  const minMapper = [
    [80, 2],
    [60, 3],
    [40, 4],
    [20, 5],
    [9, 6],
    [7, 7],
    [5, 8],
    [3, 9],
  ];

  for (const [freq, size] of minMapper) {
    if (frequency >= freq) {
      return size;
    }
  }

  return 10;
}

export function createParamsToHabitParams(params: ICreateParams): IHabitParams {
  const userEmail = getCurrentUserEmail() ?? 'anonymous@email.com';
  const startTime = Date.now();
  const {
    entityName: name,
    entityFrequency,
    motivationTextarea: motivation,
    requirementsShortDescription,
    requirementsUnits,
    successRate,
  } = params;

  const heatmapSize = frequencyToHeatmapSizeMapper(entityFrequency);
  const heatmap = getInitializedHeatmap({
    size: heatmapSize,
    useTitle: true,
    startTime,
    entityFrequency,
  });

  return {
    name,
    userEmail,
    motivation,
    entityFrequency,
    requirementsShortDescription,
    requirementsUnits,
    successRate,
    heatmap,
    startTime,
  };
}
