import { ReactNode } from 'react';
import { OverlayChildren } from 'react-bootstrap/esm/Overlay';

export type IHeatmapIntensityValues = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type IHeatmapCellStatus = 'new' | 'skipped' | 'normal';

export interface IHeatmapCellProps {
  x: number;
  y: number;
  title?: string;
  onClick?: (x: number, y: number) => void;
  onClickPopover?: OverlayChildren;
  bgColor: string;
  cellSize: number;
  intensity: IHeatmapIntensityValues;
  status: IHeatmapCellStatus;
  isActive: boolean;
}

export interface IHeatmapCellParams {
  intensity: IHeatmapIntensityValues;
  status: IHeatmapCellStatus;
  title?: string;
  isActive: boolean;
}

//TODO: Add comments for each day
export interface IHeatmapProps {
  className?: string;
  heatmapState: IHeatmapCellParams[][];
  onClick?: (x: number, y: number) => void;
  onClickPopover?: OverlayChildren;
  bgColor: string;
}

export interface IHeatmapRowProps {
  children: ReactNode;
}

export interface IHeatmapSquare {
  x: number;
  y: number;
  value?: string;
}

export type IHeatmapInitializerProps = { size: number } & (
  | {
      useTitle: false;
    }
  | {
      useTitle: true;
      startTime: number;
      entityFrequency: number;
    }
);
