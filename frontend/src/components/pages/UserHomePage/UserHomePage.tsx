import { useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';
import { Container } from 'react-bootstrap';
import _ from 'lodash';

import { IEntityOverallHeatmaps, IUserHomePageProps } from './UserHomePage.types';
import { getOverallEntityHeatmap } from '../../../services/heatmap.service';
import { getUserEntitiesCount } from '../../../services/entity.service';
import { Heatmap } from '../../common';
import { ENTITY_TYPES, IEntityType } from '../../App/App.types';

import './UserHomePage.scss';

const blk = cn('UserHomePage');
const entitiesCount = getUserEntitiesCount();

export const UserHomePage = ({ user }: IUserHomePageProps) => {
  const [loading, setLoading] = useState(true);
  const [overallEntitiesHeatmap, setOverallEntitiesHeatmap] = useState<IEntityOverallHeatmaps>({});

  useEffect(() => {
    const heatmaps: IEntityOverallHeatmaps = {};
    for (const entityType of ENTITY_TYPES) {
      heatmaps[entityType] = getOverallEntityHeatmap(entityType, [3, 2]);
    }

    setOverallEntitiesHeatmap(heatmaps);
    setLoading(false);
  }, []);

  return user && !loading ? (
    <Container className={blk()}>
      {Object.entries(overallEntitiesHeatmap).map(([entityType, heatmapParams]) => (
        <section key={entityType}>
          <h2 className={blk('EntityHeading')}>
            {_.capitalize(entityType)}s ({entitiesCount[entityType as IEntityType]})
          </h2>
          <Heatmap heatmapState={heatmapParams} bgColor={`var(--color-rgb-${entityType}s)`} />
        </section>
      ))}
    </Container>
  ) : null;
};
