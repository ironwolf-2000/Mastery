import { cn } from '@bem-react/classname';

import { Row } from './Row';
import { Cell } from './Cell';

import './Heatmap.scss';

export const blk = cn('Heatmap');

export const Heatmap = ({ heatmapState, bgColor }: IHeatmapProps) => {
  return (
    <div className={blk()}>
      {heatmapState.map((rowItems, xi) => (
        <Row key={xi}>
          {rowItems.map((val, yi) => (
            <Cell key={yi} x={xi} y={yi} bgColor={bgColor} intensity={val} />
          ))}
        </Row>
      ))}
    </div>
  );
};

interface IHeatmapProps {
  heatmapState: number[][]; // opacity of each cell.
  bgColor: string;
  //TODO: Add comments for each day
}
