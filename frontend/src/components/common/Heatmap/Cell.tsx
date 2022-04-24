import React from 'react';
import { blk } from './Heatmap';

const sizeMap = {
  m: 1.5,
  sm: 1,
};

export const Cell = React.memo(({ x, y, bgColor, cellSize = 'm', intensity = 0 }: ICellProps) => {
  const style: React.CSSProperties = {
    backgroundColor: intensity ? `rgba(${bgColor}, ${intensity * 0.2})` : 'var(--bs-gray-100)',
    width: `${sizeMap[cellSize]}rem`,
    height: `${sizeMap[cellSize]}rem`,
    borderRadius: `${sizeMap[cellSize] * 0.16}rem`,
  };

  return <div className={blk('Cell')} style={style} />;
});

interface ICellProps {
  x: number;
  y: number;
  bgColor: string;
  cellSize?: 'sm' | 'm';
  intensity?: number;
}
