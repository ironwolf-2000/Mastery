import { getCurrentUserEmail } from '../services/user.service';
import { daysToMs, getDateByDayDiff, truncateDateTime } from '../utils';
import { IEntityParams } from './App/App.types';
import { ICreateParams, IEditParams } from './common/Forms/Forms.types';
import { IHeatmapInitializerProps, IHeatmapCellParams } from './common/Heatmap/Heatmap.types';

export function getInitializedHeatmap(props: IHeatmapInitializerProps): IHeatmapCellParams[][] {
  const { size, useTitle } = props;

  const heatmap: IHeatmapCellParams[][] = new Array(size);
  for (let i = 0; i < size; i++) {
    heatmap[i] = [];

    for (let j = 0; j < size; j++) {
      const params: IHeatmapCellParams = {
        status: 'new',
        isActive: false,
        currValue: 0,
        targetValue: props.targetValue,
      };

      if (useTitle) {
        const { startTime, entityFrequency } = props;
        params.title =
          `${getDateByDayDiff(startTime, entityFrequency * (i * size + j))}` +
          (entityFrequency > 1
            ? ` - ${getDateByDayDiff(startTime, entityFrequency * (i * size + j + 1) - 1)}`
            : '') +
          ': 0';
      }

      heatmap[i].push(params);
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

export function createParamsToEntityParams(params: ICreateParams): IEntityParams {
  const userEmail = getCurrentUserEmail() ?? 'anonymous@email.com';
  const startTime = truncateDateTime(new Date()).getTime();

  const {
    entityName: name,
    entityFrequency,
    motivationTextarea: motivation,
    requirementsText,
    requirementsMinValue,
    successRate,
  } = params;

  const heatmapSize = frequencyToHeatmapSizeMapper(entityFrequency);
  const heatmap = getInitializedHeatmap({
    heatmapType: 'tracking',
    size: heatmapSize,
    useTitle: true,
    startTime,
    entityFrequency,
    targetValue: requirementsMinValue,
  });

  return {
    name,
    userEmail,
    motivation,
    entityFrequency,
    requirementsText,
    requirementsMinValue,
    successRate,
    heatmap,
    startTime,
  };
}

export function editParamsToEntityParams(
  entity: IEntityParams,
  params: IEditParams
): IEntityParams {
  return { ...entity, ...params };
}

export function getEntityEndTime(entity: IEntityParams) {
  const { startTime, heatmap, entityFrequency } = entity;
  return startTime + daysToMs(heatmap.length ** 2 * entityFrequency - 1);
}

export function entityFrequencyToLabel(frequency: number) {
  if (frequency === 1) return 'daily';

  return `every ${frequency} days`;
}
