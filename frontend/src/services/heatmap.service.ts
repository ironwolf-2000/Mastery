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

function generateEmptyOverallEntityHeatmap(ratio: [number, number]) {
  const [rows, cols] = [ratio[0] * 4, ratio[1] * 4];
  const overallHeatmap: IHeatmapCellParams[][] = new Array(rows);

  for (let i = 0; i < rows; i++) {
    overallHeatmap[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
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

/**
 * @param type entity type, i.e., a habit or a skill
 * @param ratio width and height coefficients for the heatmap dimensions
 * @returns the overall heatmap object
 */
export function getOverallEntityHeatmap(
  type: IEntityType,
  ratio: [number, number]
): IHeatmapCellParams[][] {
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
  const k = Math.ceil(Math.sqrt(Math.ceil(dayEntries.length / 6)));
  if (!k) return generateEmptyOverallEntityHeatmap(ratio);

  const [rows, cols] = [k * ratio[0], k * ratio[1]];
  const overallHeatmap: IHeatmapCellParams[][] = new Array(rows);

  for (let i = 0, cnt = 0, day = Number(dayEntries[0][0]); i < rows; i++) {
    overallHeatmap[i] = new Array(cols);
    for (let j = 0; j < cols; j++, cnt++, day++) {
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
