import { IEntityType, IEntityParams, IEntityEditParams } from '../components/App/App.types';
import { getInitializedHeatmap } from '../components/helpers';
import { toTwoDecimalPlaces } from '../utils';
import { ICRUDResponse } from './services.types';
import { getCurrentUserEmail } from './user.service';

export const DEFAULT_SUCCESS_RATE = 100;
export const entityMapper: Record<IEntityType, string> = {
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

export function getEntityByName(type: IEntityType, name: string): IEntityParams | null {
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
      if (params.requirementsMinValue !== curr.requirementsMinValue) {
        const hmSize = curr.heatmap.length;

        for (let x = 0; x < hmSize; x++) {
          for (let y = 0; y < hmSize; y++) {
            curr.heatmap[x][y].targetValue = params.requirementsMinValue;
          }
        }
      }

      const { name, motivation, requirementsText, requirementsMinValue } = params;
      curr.name = name;
      curr.motivation = motivation;
      curr.requirementsText = requirementsText;
      curr.requirementsMinValue = requirementsMinValue;

      edited = true;
    }
  }

  if (!edited) {
    return { success: false, message: `Couldn't find the ${type} by its name "${name}".` };
  }

  localStorage.setItem(entityMapper[type], JSON.stringify(allEntities));
  return { success: true, message: `The ${type} has been successfully updated.` };
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
      const { heatmap, startTime, entityFrequency, requirementsMinValue } = curr;

      curr.heatmap = getInitializedHeatmap({
        heatmapType: 'tracking',
        size: heatmap.length,
        useTitle: true,
        startTime,
        entityFrequency,
        targetValue: requirementsMinValue,
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

export function getCurrentEntitySuccessRate(entity: IEntityParams | null): number {
  if (entity === null) return DEFAULT_SUCCESS_RATE;

  let [totalValue, totalDays] = [0, 0];
  const targetValue = entity.requirementsMinValue;

  for (const row of entity.heatmap) {
    for (const cell of row) {
      totalValue += cell.currValue;
      totalDays += cell.status === 'normal' ? 1 : 0;
    }
  }

  return !totalDays
    ? 100
    : toTwoDecimalPlaces(Math.min(totalValue / (targetValue * totalDays), 1) * 100);
}
