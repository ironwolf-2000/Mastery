import { useState, useEffect, useCallback } from 'react';
import { cn } from '@bem-react/classname';
import { Navigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Container } from 'react-bootstrap';

import { Heatmap } from '../../../common';
import { getHabitByName, updateHabitProgress } from '../../../../services/habits.service';
import { IHabitParams } from '../Habits.types';

import './HabitsDashboard.scss';

const blk = cn('HabitsDashboard');

export const HabitsDashboard = () => {
  const { encodedName } = useParams();
  const [habit, setHabit] = useState<IHabitParams | null>(null);

  const updateHabit = useCallback(() => {
    if (encodedName == null) return;

    const fetchedHabit = getHabitByName(decodeURIComponent(encodedName));
    if (!fetchedHabit) {
      toast.error('Failed to update habit data.');
    } else {
      setHabit(fetchedHabit);
    }
  }, [encodedName]);

  useEffect(() => updateHabit(), [updateHabit]);

  const handleHeatmapClick = (name: string, x: number, y: number) => {
    updateHabitProgress(name, x, y, 2);
    updateHabit();
  };

  return habit ? (
    <>
      <Container className={blk()}>
        <section className={blk('SettingsSection')}>Some settings</section>
        <section className={blk('HeatmapSection')}>
          <h2 className={blk('SectionHeading')}>{habit.name}</h2>
          <Heatmap
            className={blk('Heatmap')}
            heatmapState={habit.heatmap}
            onClick={(x, y) => handleHeatmapClick(habit.name, x, y)}
            bgColor='var(--color-rgb-habits)'
          />
        </section>
      </Container>
      <ToastContainer autoClose={2000} position='bottom-right' />
    </>
  ) : (
    <Navigate to='/not-found' replace />
  );
};
