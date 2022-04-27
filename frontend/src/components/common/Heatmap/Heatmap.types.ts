import { ReactNode } from 'react';
import { OverlayChildren } from 'react-bootstrap/esm/Overlay';

export interface IHeatmapCellProps {
  x: number;
  y: number;
  title?: string;
  onClick?: (x: number, y: number) => void;
  onClickPopover?: OverlayChildren;
  bgColor: string;
  cellSize?: 'sm' | 'm';
  intensity: number;
}

export interface IHeatmapCellParams {
  intensity: number;
  title?: string;
}

//TODO: Add comments for each day
export interface IHeatmapProps {
  className?: string;
  heatmapState: IHeatmapCellParams[][];
  onClick?: (x: number, y: number) => void;
  onClickPopover?: OverlayChildren;
  bgColor: string;
  cellSize?: 'sm' | 'm';
}

export interface IHeatmapRowProps {
  children: ReactNode;
}

export interface IHeatmapSquare {
  x: number;
  y: number;
  value?: string;
}
