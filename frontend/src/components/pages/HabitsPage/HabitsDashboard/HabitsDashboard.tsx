import { cn } from '@bem-react/classname';
import { Container } from 'react-bootstrap';
import { Heatmap } from '../../../common';

import './HabitsDashboard.scss';

const blk = cn('HabitsDashboard');

export const HabitsDashboard = ({ heatmapState }: IHabitsDashboardProps) => {
  return (
    <Container className={blk()}>
      <section className={blk('Heatmap')}>
        <h2 className={blk('Heading')}>Current Habit</h2>
        <Heatmap heatmapState={heatmapState} bgColor='var(--color-rgb-habits)' />
      </section>
    </Container>
  );
};

interface IHabitsDashboardProps {
  heatmapState: number[][];
}
