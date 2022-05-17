import { useMemo } from 'react';
import { cn } from '@bem-react/classname';

import { Row } from './Row';
import { Cell } from './Cell';
import { IHeatmapProps } from './Heatmap.types';

import './Heatmap.scss';

export const blk = cn('Heatmap');

const cellSizeMapper = (hmSize: number) => {
  const sizeMapper = [
    [2, 3],
    [4, 2.5],
    [6, 2.25],
    [8, 2],
    [10, 1.75],
    [20, 1.5],
  ];

  for (const [hmRows, size] of sizeMapper) {
    if (hmSize <= hmRows) {
      return size;
    }
  }

  return 1;
};

export const Heatmap = ({
  className,
  heatmapState,
  onClick,
  onClickPopover,
  bgColor,
}: IHeatmapProps) => {
  const isValidHeatmap = useMemo(() => heatmapState.every(Array.isArray), [heatmapState]);

  return isValidHeatmap ? (
    <div className={blk('', [className])}>
      {heatmapState.map((rowItems, xi) => (
        <Row key={xi}>
          {rowItems.map((cellParams, yi) => {
            const cellSize = cellSizeMapper(heatmapState.length);
            const hmParams = { onClick, onClickPopover, bgColor, cellSize };

            return <Cell key={yi} x={xi} y={yi} {...{ ...cellParams, ...hmParams }} />;
          })}
        </Row>
      ))}
    </div>
  ) : null;
};
