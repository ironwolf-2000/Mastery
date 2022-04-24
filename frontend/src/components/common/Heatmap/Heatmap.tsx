import { useMemo } from 'react';
import { cn } from '@bem-react/classname';

import { Row } from './Row';
import { Cell } from './Cell';

import './Heatmap.scss';

export const blk = cn('Heatmap');

export const Heatmap = ({ className, heatmapState, onClick, bgColor, cellSize }: IHeatmapProps) => {
  const isValidHeatmap = useMemo(() => heatmapState.every(Array.isArray), [heatmapState]);

  return isValidHeatmap ? (
    <div className={blk('', [className])}>
      {heatmapState.map((rowItems, xi) => (
        <Row key={xi}>
          {rowItems.map((val, yi) => (
            <Cell
              key={yi}
              x={xi}
              y={yi}
              onClick={onClick}
              bgColor={bgColor}
              cellSize={cellSize}
              intensity={val}
            />
          ))}
        </Row>
      ))}
    </div>
  ) : null;
};

//TODO: Add comments for each day
interface IHeatmapProps {
  className?: string;
  heatmapState: number[][];
  onClick?: (x: number, y: number) => void;
  bgColor: string;
  cellSize?: 'sm' | 'm';
}
