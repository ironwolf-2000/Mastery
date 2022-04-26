import { OverlayChildren } from 'react-bootstrap/esm/Overlay';

//TODO: Add comments for each day
export interface IHeatmapProps {
  className?: string;
  heatmapState: number[][];
  onClick?: (x: number, y: number) => void;
  onClickPopover?: OverlayChildren;
  bgColor: string;
  cellSize?: 'sm' | 'm';
}

export interface IHeatmapSquare {
  x: number;
  y: number;
  value?: string;
}
