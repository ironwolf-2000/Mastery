import { ReactNode } from 'react';
import { OverlayChildren } from 'react-bootstrap/esm/Overlay';

export type IHeatmapIntensityValues = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type IHeatmapCellStatus = 'new' | 'skipped' | 'normal';

export interface IHeatmapCellParams {
  status: IHeatmapCellStatus;
  isActive: boolean;
  title?: string;
  currValue: number;
  targetValue: number;
}

export interface IHeatmapCellProps extends IHeatmapCellParams {
  x: number;
  y: number;
  onClick?: (x: number, y: number) => void;
  onClickPopover?: OverlayChildren;
  bgColor: string;
  cellSize: number;
}

export interface IHeatmapCellCoordinates {
  x: number;
  y: number;
}

export interface IHeatmapRowProps {
  children: ReactNode;
}

export interface IHeatmapProps {
  className?: string;
  heatmapState: IHeatmapCellParams[][];
  onClick?: (x: number, y: number) => void;
  onClickPopover?: OverlayChildren;
  bgColor: string;
}

export type IHeatmapInitializerProps = {
  heatmapType: 'tracking' | 'overall';
  size: number;
  targetValue: number;
} & (
  | {
      useTitle: false;
    }
  | {
      useTitle: true;
      startTime: number;
      entityFrequency: number;
    }
);
