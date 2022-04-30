import { IEntityType, IEntityParams } from '../components/App/App.types';
import {
  IHeatmapCellParams,
  IHeatmapIntensityNames,
  IHeatmapIntensityValues,
} from '../components/common/Heatmap/Heatmap.types';
import { getInitializedHeatmap } from '../components/pages/HabitsPage/Habits.helpers';
import { IHabitParams } from '../components/pages/HabitsPage/Habits.types';
import { getDateByDayDiff, msToDays } from '../utils';
import { ICRUDResponse } from './services.types';

export const DEFAULT_SUCCESS_RATE = 80;
const entityMapper: Record<IEntityType, string> = {
  habit: 'habits',
  skill: 'skills',
};

const heatmapValueMapper = (n: IHeatmapIntensityValues): IHeatmapIntensityNames => {
  if (n === -1) return 'blank';
  if (n < 3) return 'failed';
  if (n < 6) return 'skipped';
  return 'completed';
};

export function getAllEntities(type: IEntityType): IEntityParams[] {
  return JSON.parse(localStorage.getItem(entityMapper[type]) ?? '[]');
}

export function addEntity(type: IEntityType, item: IEntityParams): ICRUDResponse {
  const entities = getAllEntities(type);
  if (entities.some(u => u.name === item.name)) {
    return { success: false, message: `A ${type} with this name already exists.` };
  }

  localStorage.setItem(entityMapper[type], JSON.stringify([...entities, item]));
  return { success: true, message: `The ${type} has been successfully created.` };
}

export function getEntityByName(type: IEntityType, name: string): IHabitParams | null {
  const entities = getAllEntities(type);
  return entities.find(item => item.name === name) ?? null;
}

export function updateEntityHeatmap(
  type: IEntityType,
  name: string,
  x: number,
  y: number,
  value: IHeatmapIntensityValues
): ICRUDResponse {
  const allEntities = getAllEntities(type);
  let updated = false;

  for (let i = 0; i < allEntities.length && !updated; i++) {
    if (allEntities[i].name === name) {
      allEntities[i].heatmap[x][y].intensity = value;
      updated = true;
    }
  }

  if (!updated) {
    return { success: false, message: `Couldn't find the ${type} by its name "${name}".` };
  }

  localStorage.setItem(entityMapper[type], JSON.stringify(allEntities));
  return { success: true, message: `Successully updated the habit progress.` };
}

export function deleteEntity(type: IEntityType, name: string) {
  const newHabits = getAllEntities(type).filter(item => item.name !== name);
  localStorage.setItem(entityMapper[type], JSON.stringify(newHabits));
}

export function resetEntity(type: IEntityType, name: string) {
  const allEntities = getAllEntities(type);
  let reset = false;

  for (let i = 0; i < allEntities.length && !reset; i++) {
    if (allEntities[i].name === name) {
      allEntities[i].heatmap = getInitializedHeatmap({
        size: allEntities[i].heatmap.length,
        useTitle: true,
        startTime: allEntities[i].startTime,
      });
      reset = true;
    }
  }

  if (!reset) {
    return { success: false, message: `Couldn't find a ${type} with the name "${name}".` };
  }

  localStorage.setItem(entityMapper[type], JSON.stringify(allEntities));
  return { success: true, message: `Successully reset the ${type} progress.` };
}

export function getCurrentEntitySuccessRate(item: IEntityParams | null): number {
  if (item === null) return DEFAULT_SUCCESS_RATE;

  let completed = 0;
  let failed = 0;

  for (const row of item.heatmap) {
    for (const { intensity } of row) {
      if (intensity === 9) {
        completed++;
      } else if (intensity === 0) {
        failed++;
      }
    }
  }

  return completed + failed === 0
    ? -1
    : Number((completed / (completed + failed)).toFixed(2)) * 100;
}

// FIXME: get an overall heatmap for different periods of time
export function getOverallEntityHeatmap(type: IEntityType) {
  const allEntities = getAllEntities(type);
  let [startTime, endTime] = [Infinity, -Infinity];
  const intensities: Record<IHeatmapIntensityNames, IHeatmapIntensityValues>[] = [];

  allEntities.forEach(entity => {
    startTime = Math.min(startTime, entity.startTime);
    endTime = Math.max(endTime, getDateByDayDiff(entity.startTime, entity.timePeriod, 'number'));

    const [m, n] = [entity.heatmap.length, entity.heatmap[0].length];

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        const currInd = i * n + j;

        if (currInd >= intensities.length) {
          intensities.push({
            blank: 0,
            failed: 0,
            skipped: 0,
            completed: 0,
          });
        }
      }
    }
  });

  const daysTotal = msToDays(endTime - startTime);
  const k = Math.ceil(Math.sqrt(daysTotal / 6));
  const [m, n] = [k * 2, k * 3];

  const heatmap: IHeatmapCellParams[][] = new Array(m);

  for (let i = 0; i < m; i++) {
    heatmap[i] = [];

    for (let j = 0; j < n; j++) {
      const title = getDateByDayDiff(startTime, i * n + j);
      const params = { title, intensity: -1 } as const;
      heatmap[i].push(params);
    }
  }

  return heatmap;
}
