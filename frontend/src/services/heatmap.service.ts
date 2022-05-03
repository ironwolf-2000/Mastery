import { IEntityType } from '../components/App/App.types';
import {
  IHeatmapIntensityValues,
  IHeatmapCellStatus,
} from '../components/common/Heatmap/Heatmap.types';
import { msToDays } from '../utils';
import { entityMapper, getAllEntities } from './entity.service';
import { ICRUDResponse } from './services.types';
import { getCurrentUserEmail } from './user.service';

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

export function setCurrentHeatmapCell(type: IEntityType, name: string) {
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

      for (let x0 = 0; x0 < hmSize; x0++) {
        for (let y0 = 0; y0 < hmSize; y0++) {
          curr.heatmap[x0][y0].isActive = x0 === x && y0 === y;
        }
      }
    }
  }

  localStorage.setItem(entityMapper[type], JSON.stringify(allEntities));
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
