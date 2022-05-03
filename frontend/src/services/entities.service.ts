import { IEntityType, IEntityParams, IEntityEditParams } from '../components/App/App.types';
import {
  IHeatmapCellStatus,
  IHeatmapIntensityValues,
} from '../components/common/Heatmap/Heatmap.types';
import { getInitializedHeatmap } from '../components/helpers';
import { IHabitParams } from '../components/pages/HabitsPage/Habits.types';
import { ICRUDResponse } from './services.types';
import { getCurrentUserEmail } from './user.service';

export const DEFAULT_SUCCESS_RATE = 100;
const entityMapper: Record<IEntityType, string> = {
  habit: 'habits',
  skill: 'skills',
};

export function getAllEntities(type: IEntityType): IEntityParams[] {
  return JSON.parse(localStorage.getItem(entityMapper[type]) ?? '[]');
}

export function getAllUserEntities(type: IEntityType): IEntityParams[] {
  const userEmail = getCurrentUserEmail();

  return JSON.parse(localStorage.getItem(entityMapper[type]) ?? '[]').filter(
    (el: IEntityParams) => el.userEmail === userEmail
  );
}

export function addEntity(type: IEntityType, entity: IEntityParams): ICRUDResponse {
  const userEmail = getCurrentUserEmail();
  const entities = getAllEntities(type);

  if (entities.some(u => u.userEmail === userEmail && u.name === entity.name)) {
    return { success: false, message: `A ${type} with this name already exists.` };
  }

  localStorage.setItem(entityMapper[type], JSON.stringify([...entities, entity]));
  return { success: true, message: `The ${type} has been successfully created.` };
}

export function getEntityByName(type: IEntityType, name: string): IHabitParams | null {
  const userEmail = getCurrentUserEmail();
  const entities = getAllEntities(type);

  return entities.find(el => el.userEmail === userEmail && el.name === name) ?? null;
}

export function editEntity(type: IEntityType, name: string, params: IEntityEditParams) {
  const userEmail = getCurrentUserEmail();
  const allEntities = getAllEntities(type);
  let edited = false;

  for (let i = 0; i < allEntities.length && !edited; i++) {
    const curr = allEntities[i];

    if (curr.userEmail === userEmail && curr.name === name) {
      allEntities[i] = { ...curr, ...params };
      edited = true;
    }
  }

  if (!edited) {
    return { success: false, message: `Couldn't find the ${type} by its name "${name}".` };
  }

  localStorage.setItem(entityMapper[type], JSON.stringify(allEntities));
  return { success: true, message: `The ${type} has been successfully updated.` };
}

export function updateEntityHeatmap(
  type: IEntityType,
  name: string,
  x: number,
  y: number,
  value: IHeatmapIntensityValues,
  status: IHeatmapCellStatus
): ICRUDResponse {
  const userEmail = getCurrentUserEmail();
  const allEntities = getAllEntities(type);
  let updated = false;

  for (let i = 0; i < allEntities.length && !updated; i++) {
    const curr = allEntities[i];

    if (curr.userEmail === userEmail && curr.name === name) {
      curr.heatmap[x][y].intensity = value;
      curr.heatmap[x][y].status = status;
      updated = true;
    }
  }

  if (!updated) {
    return { success: false, message: `Couldn't find the ${type} by its name "${name}".` };
  }

  localStorage.setItem(entityMapper[type], JSON.stringify(allEntities));
  return { success: true, message: `Successully updated the ${type} progress.` };
}

export function deleteEntity(type: IEntityType, name: string) {
  const userEmail = getCurrentUserEmail();
  const newEntities = getAllEntities(type).filter(
    el => el.userEmail !== userEmail || el.name !== name
  );

  localStorage.setItem(entityMapper[type], JSON.stringify(newEntities));
}

export function resetEntity(type: IEntityType, name: string) {
  const userEmail = getCurrentUserEmail();
  const allEntities = getAllEntities(type);
  let reset = false;

  for (let i = 0; i < allEntities.length && !reset; i++) {
    const curr = allEntities[i];

    if (curr.userEmail === userEmail && curr.name === name) {
      const { heatmap, startTime, entityFrequency } = curr;

      curr.heatmap = getInitializedHeatmap({
        size: heatmap.length,
        useTitle: true,
        startTime,
        entityFrequency,
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

  let [totalIntensity, totalDays] = [0, 0];

  for (const row of item.heatmap) {
    for (const cell of row) {
      totalIntensity += cell.intensity;
      totalDays += cell.status === 'normal' ? 1 : 0;
    }
  }

  return !totalDays ? 100 : Number(((totalIntensity / totalDays) * 10).toFixed(2));
}

// FIXME: get an overall heatmap for different periods of time
// export function getOverallEntityHeatmap(type: IEntityType) {
//   const allEntities = getAllUserEntities(type);
//   let [startTime, endTime] = [Infinity, -Infinity];
//   const intensities: Record<IHeatmapIntensityNames, IHeatmapIntensityValues>[] = [];

//   allEntities.forEach(entity => {
//     startTime = Math.min(startTime, entity.startTime);
//     endTime = Math.max(endTime, getDateByDayDiff(entity.startTime, entity.timePeriod, 'number'));

//     const [m, n] = [entity.heatmap.length, entity.heatmap[0].length];

//     for (let i = 0; i < m; i++) {
//       for (let j = 0; j < n; j++) {
//         const currInd = i * n + j;

//         if (currInd >= intensities.length) {
//           intensities.push({
//             blank: 0,
//             failed: 0,
//             skipped: 0,
//             completed: 0,
//           });
//         }
//       }
//     }
//   });

//   const daysTotal = msToDays(endTime - startTime);
//   const k = Math.ceil(Math.sqrt(daysTotal / 6));
//   const [m, n] = [k * 2, k * 3];

//   const heatmap: IHeatmapCellParams[][] = new Array(m);

//   for (let i = 0; i < m; i++) {
//     heatmap[i] = [];

//     for (let j = 0; j < n; j++) {
//       const title = getDateByDayDiff(startTime, i * n + j);
//       const params = { title, intensity: -1 } as const;
//       heatmap[i].push(params);
//     }
//   }

//   return heatmap;
// }
