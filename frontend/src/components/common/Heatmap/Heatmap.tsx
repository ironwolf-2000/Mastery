import { useMemo } from 'react';
import { cn } from '@bem-react/classname';

import { Row } from './Row';
import { Cell } from './Cell';
import { IHeatmapProps } from './Heatmap.types';

import './Heatmap.scss';

export const blk = cn('Heatmap');

const cellSizeMapper = (hmSize: number) => {
  const sizeMapper = [
    [2, 2.5],
    [4, 2.25],
    [6, 2],
    [8, 1.75],
    [10, 1.5],
    [20, 1.25],
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
