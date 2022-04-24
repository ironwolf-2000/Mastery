import { cn } from '@bem-react/classname';

import { Row } from './Row';
import { Cell } from './Cell';

import './Heatmap.scss';

export const blk = cn('Heatmap');

export const Heatmap = ({ heatmapState, bgColor, cellSize }: IHeatmapProps) => {
  return (
    <div className={blk()}>
      {heatmapState.map((rowItems, xi) => (
        <Row key={xi}>
          {rowItems.map((val, yi) => (
            <Cell key={yi} x={xi} y={yi} bgColor={bgColor} cellSize={cellSize} intensity={val} />
          ))}
        </Row>
      ))}
    </div>
  );
};

//TODO: Add comments for each day
interface IHeatmapProps {
  heatmapState: number[][];
  bgColor: string;
  cellSize?: 'sm' | 'm';
}
