import React from 'react';
import { blk } from './Heatmap';

export const Cell = React.memo(({ x, y, bgColor, intensity = 0 }: ICellProps) => {
  const style: React.CSSProperties = {
    backgroundColor: intensity ? `rgba(${bgColor}, ${intensity * 0.2})` : 'var(--bs-gray-100)',
  };

  return <div className={blk('Cell')} style={style} />;
});

interface ICellProps {
  x: number;
  y: number;
  bgColor: string;
  intensity?: number;
}
