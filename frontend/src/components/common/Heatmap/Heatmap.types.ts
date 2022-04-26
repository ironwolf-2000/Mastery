import { ReactNode } from 'react';
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

export interface IRowProps {
  children: ReactNode;
}

export interface IHeatmapSquare {
  x: number;
  y: number;
  value?: string;
}

export interface ICellProps {
  x: number;
  y: number;
  onClick?: (x: number, y: number) => void;
  onClickPopover?: OverlayChildren;
  bgColor: string;
  cellSize?: 'sm' | 'm';
  intensity: number;
}
