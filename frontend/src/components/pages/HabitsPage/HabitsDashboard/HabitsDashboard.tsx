import { cn } from '@bem-react/classname';

import './HabitsDashboard.scss';

const blk = cn('HabitsDashboard');

export const HabitsDashboard = (props: HabitsDashboardProps) => {
  return <div className={blk()}>HabitsDashboard</div>;
};

interface HabitsDashboardProps {}
