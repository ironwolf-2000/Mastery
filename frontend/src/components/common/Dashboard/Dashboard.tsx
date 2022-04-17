import { cn } from '@bem-react/classname';

import './Dashboard.scss';

const blk = cn('Dashboard');

export const Dashboard = (props: DashboardProps) => {
  return <div className={blk()}>Dashboard</div>;
};

interface DashboardProps {}
