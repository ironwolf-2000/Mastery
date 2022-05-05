import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';

import { blk } from './Heatmap';
import { IHeatmapCellProps, IHeatmapIntensityValues } from './Heatmap.types';

export const Cell = React.memo(
  ({
    x,
    y,
    onClick,
    bgColor,
    cellSize,
    onClickPopover,
    title,
    status,
    isActive,
    currValue,
    targetValue,
  }: IHeatmapCellProps) => {
    const _intensity = Math.floor((currValue * 10) / targetValue);
    const intensity =
      _intensity < 0 ? 0 : _intensity > 10 ? 10 : (_intensity as IHeatmapIntensityValues);

    const style: React.CSSProperties = {
      backgroundColor:
        status === 'normal' && intensity
          ? `rgba(${bgColor}, ${intensity * 0.1})`
          : 'var(--bs-gray-100)',
      width: `${cellSize}rem`,
      height: `${cellSize}rem`,
      borderRadius: `${cellSize * 0.16}rem`,
    };

    const contentProps: Record<string, any> = { style };

    if (onClick) contentProps.onClick = () => onClick(x, y);
    if (title) contentProps.title = title;

    const content = (
      <div
        className={blk('Cell', { skipped: status === 'skipped', active: isActive })}
        {...contentProps}
      />
    );

    return onClickPopover ? (
      <OverlayTrigger rootClose trigger='click' placement='bottom' overlay={onClickPopover}>
        {content}
      </OverlayTrigger>
    ) : (
      content
    );
  }
);
