import { useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';
import { Container } from 'react-bootstrap';

import { IEntityOverallHeatmaps, IUserHomePageProps } from './UserHomePage.types';
import { getOverallEntityHeatmap } from '../../../services/heatmap.service';
import { Heatmap } from '../../common';

import './UserHomePage.scss';

const blk = cn('UserHomePage');

const entityTypes = ['habit', 'skill', 'preference'] as const;

export const UserHomePage = ({ user }: IUserHomePageProps) => {
  const [loading, setLoading] = useState(true);
  const [overallEntitiesHeatmap, setOverallEntitiesHeatmap] = useState<IEntityOverallHeatmaps>({});

  useEffect(() => {
    const heatmaps: IEntityOverallHeatmaps = {};
    for (const entityType of entityTypes) {
      heatmaps[entityType] = getOverallEntityHeatmap(entityType, [3, 2]);
    }

    setOverallEntitiesHeatmap(heatmaps);
    setLoading(false);
  }, []);

  return user && !loading ? (
    <Container className={blk()}>
      {Object.entries(overallEntitiesHeatmap).map(([entityType, heatmapParams]) => (
        <section key={entityType}>
          <h2 className={blk('EntityHeading')}>{entityType} heatmap</h2>
          <Heatmap heatmapState={heatmapParams} bgColor={`var(--color-rgb-${entityType}s)`} />
        </section>
      ))}
    </Container>
  ) : null;
};
