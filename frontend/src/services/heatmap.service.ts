import { IEntityType } from '../components/App/App.types';
import { IHeatmapCellParams, IHeatmapCellStatus } from '../components/common/Heatmap/Heatmap.types';
import { daysToMs, getFormattedDate, msToDays, toTwoDecimalPlaces } from '../utils';
import { entityMapper, getAllEntities, getAllUserEntities } from './entity.service';
import { ICRUDResponse } from './services.types';
import { getCurrentUserEmail } from './user.service';

export function updateEntityHeatmap(
  type: IEntityType,
  name: string,
  x: number,
  y: number,
  status: IHeatmapCellStatus,
  value: number
): ICRUDResponse {
  const userEmail = getCurrentUserEmail();
  const allEntities = getAllEntities(type);
  let updated = false;

  for (let i = 0; i < allEntities.length && !updated; i++) {
    const curr = allEntities[i];

    if (curr.userEmail === userEmail && curr.name === name && value !== undefined) {
      const hm = curr.heatmap[x][y];

      hm.status = status;
      hm.currValue = value;

      if (hm.title) {
        hm.title = hm.title.slice(0, hm.title.lastIndexOf(':')) + `: ${value}`;
      }
      updated = true;
    }
  }

  if (!updated) {
    return { success: false, message: `Couldn't find the ${type} by its name "${name}".` };
  }

  localStorage.setItem(entityMapper[type], JSON.stringify(allEntities));
  return { success: true, message: `Successully updated the ${type} progress.` };
}

export function getCurrentHeatmapCell(type: IEntityType, name: string): [number, number] | null {
  const userEmail = getCurrentUserEmail();
  const allEntities = getAllEntities(type);

  for (let i = 0; i < allEntities.length; i++) {
    const curr = allEntities[i];

    if (curr.userEmail === userEmail && curr.name === name) {
      const currDate = new Date();
      const dayDiff = msToDays(currDate.getTime() - curr.startTime);

      const cellNumber = Math.floor((dayDiff - 1) / curr.entityFrequency);
      const hmSize = curr.heatmap.length;
      const [x, y] = [Math.floor(cellNumber / hmSize), cellNumber % hmSize];

      return [x, y];
    }
  }

  return null;
}

export function highlightCurrentHeatmapCell(type: IEntityType, name: string) {
  const userEmail = getCurrentUserEmail();
  const allEntities = getAllEntities(type);

  for (let i = 0; i < allEntities.length; i++) {
    const curr = allEntities[i];

    if (curr.userEmail === userEmail && curr.name === name) {
      const currCell = getCurrentHeatmapCell(type, name);
      const hmSize = curr.heatmap.length;

      for (let i = 0; i < hmSize; i++) {
        for (let j = 0; j < hmSize; j++) {
          curr.heatmap[i][j].isActive = currCell !== null && i === currCell[0] && j === currCell[1];
        }
      }
    }
  }

  localStorage.setItem(entityMapper[type], JSON.stringify(allEntities));
}

function generateEmptyOverallEntityHeatmap(size: number) {
  const overallHeatmap: IHeatmapCellParams[][] = new Array(size);

  for (let i = 0; i < size; i++) {
    overallHeatmap[i] = new Array(size);
    for (let j = 0; j < size; j++) {
      overallHeatmap[i][j] = {
        currValue: 0,
        targetValue: Infinity,
        status: 'normal',
        isActive: false,
      };
    }
  }

  return overallHeatmap;
}

export function getOverallEntityHeatmap(type: IEntityType) {
  const allUserEntities = getAllUserEntities(type);
  const dayValues: Record<number, { curr: number; target: number }> = {};

  allUserEntities.forEach(entity => {
    const { heatmap, startTime, entityFrequency, requirementsMinValue } = entity;
    const hmSize = heatmap.length;

    for (let i = 0; i < hmSize; i++) {
      for (let j = 0; j < hmSize; j++) {
        const fromDay = msToDays(startTime + daysToMs(i * hmSize + j) * entityFrequency);
        const toDay = msToDays(startTime + daysToMs((i * hmSize + j + 1) * entityFrequency - 1));
        const hmCell = entity.heatmap[i][j];

        for (let k = fromDay; k <= toDay; k++) {
          if (!(k in dayValues)) {
            dayValues[k] = { curr: 0, target: 0 };
          }

          if (hmCell.status !== 'skipped') {
            dayValues[k].curr += toTwoDecimalPlaces(
              Math.min(hmCell.currValue, hmCell.targetValue) / entityFrequency
            );
            dayValues[k].target += toTwoDecimalPlaces(requirementsMinValue / entityFrequency);
          }
        }
      }
    }
  });

  const dayEntries = Object.entries(dayValues);
  const hmSize = Math.ceil(Math.sqrt(dayEntries.length));
  if (hmSize === 0) {
    return generateEmptyOverallEntityHeatmap(6);
  }

  const overallHeatmap: IHeatmapCellParams[][] = new Array(hmSize);

  for (let i = 0, cnt = 0, day = Number(dayEntries[0][0]); i < hmSize; i++) {
    overallHeatmap[i] = new Array(hmSize);
    for (let j = 0; j < hmSize; j++, cnt++, day++) {
      let [currValue, targetValue] = [0, Infinity];
      if (cnt < dayEntries.length) {
        [currValue, targetValue] = [dayEntries[cnt][1].curr, dayEntries[cnt][1].target];
      }

      const title = `${getFormattedDate(daysToMs(day))}: ${currValue} / ${targetValue}`;

      overallHeatmap[i][j] = {
        currValue,
        targetValue,
        title,
        status: 'normal',
        isActive: false,
      };
    }
  }

  return overallHeatmap;
}
