import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { OverlayChildren } from 'react-bootstrap/esm/Overlay';

import { blk } from './Heatmap';

const sizeMap = {
  m: 1.5,
  sm: 1,
};

export const Cell = React.memo(
  ({ x, y, onClick, bgColor, onClickPopover, cellSize = 'm', intensity = 0 }: ICellProps) => {
    const style: React.CSSProperties = {
      backgroundColor: intensity
        ? `rgba(${bgColor}, ${intensity ** 2 * 0.25})`
        : 'var(--bs-gray-100)',
      width: `${sizeMap[cellSize]}rem`,
      height: `${sizeMap[cellSize]}rem`,
      borderRadius: `${sizeMap[cellSize] * 0.16}rem`,
    };

    const contentProps = onClick ? { style, onClick: () => onClick(x, y) } : { style };
    const content = <div className={blk('Cell')} {...contentProps} />;

    return onClickPopover ? (
      <OverlayTrigger rootClose trigger='click' placement='bottom' overlay={onClickPopover}>
        {content}
      </OverlayTrigger>
    ) : (
      content
    );
  }
);

interface ICellProps {
  x: number;
  y: number;
  onClick?: (x: number, y: number) => void;
  onClickPopover?: OverlayChildren;
  bgColor: string;
  cellSize?: 'sm' | 'm';
  intensity?: number;
}
