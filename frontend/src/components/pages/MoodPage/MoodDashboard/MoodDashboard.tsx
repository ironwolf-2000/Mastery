import { cn } from '@bem-react/classname';

const blk = cn('MoodDashboard');

export const MoodDashboard = (props: MoodDashboardProps) => {
  return <div className={blk()}>MoodDashboard</div>;
};

interface MoodDashboardProps {}
