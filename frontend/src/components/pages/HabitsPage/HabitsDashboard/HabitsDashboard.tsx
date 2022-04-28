import { cn } from '@bem-react/classname';

import './HabitsDashboard.scss';
import { Dashboard } from '../../../common/Dashboard/Dashboard';

const blk = cn('HabitsDashboard');

export const HabitsDashboard = () => {
  return (
    <Dashboard
      className={blk()}
      entityType='habit'
      redirectPath='/habits'
      entityHeatmapColor='var(--color-rgb-habits)'
    />
  );
};
