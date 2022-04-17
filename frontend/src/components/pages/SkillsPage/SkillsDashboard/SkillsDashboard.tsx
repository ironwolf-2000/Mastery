import { cn } from '@bem-react/classname';

const blk = cn('SkillsDashboard');

export const SkillsDashboard = (props: SkillsDashboardProps) => {
  return <div className={blk()}>Skills Dashboard</div>;
};

interface SkillsDashboardProps {}
