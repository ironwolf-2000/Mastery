import { useState, useEffect, useCallback } from 'react';
import { cn } from '@bem-react/classname';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

import { DefaultModal, Heatmap } from '../../../common';
import {
  getHabitByName,
  updateHabitProgress,
  deleteHabit,
  resetHabit,
} from '../../../../services/habits.service';
import { IHabitParams } from '../Habits.types';
import { IDefaultModalProps } from '../../../common/Modals/Modals.types';

import './HabitsDashboard.scss';

const blk = cn('HabitsDashboard');
const defaultModalParams = {
  visible: false,
  title: '',
  bodyText: '',
  handleCancel: () => undefined,
  handleConfirm: () => undefined,
};

export const HabitsDashboard = () => {
  const navigate = useNavigate();
  const { encodedName } = useParams();

  const [habit, setHabit] = useState<IHabitParams | null>(null);
  const [modalParams, setModalParams] = useState<IDefaultModalProps>(defaultModalParams);

  const fetchHabit = useCallback(() => {
    if (encodedName == null) return null;

    return getHabitByName(decodeURIComponent(encodedName));
  }, [encodedName]);

  useEffect(() => {
    const fetchedHabit = fetchHabit();

    if (!fetchedHabit) navigate('/not-found', { replace: true });
    else setHabit(fetchedHabit);
  }, [fetchHabit, navigate]);

  const handleHeatmapClick = (name: string, x: number, y: number) => {
    updateHabitProgress(name, x, y, 2);
    setHabit(fetchHabit());
  };

  const getWarningModalParams = useCallback(
    (habitName: string) => ({
      visible: true,
      title: 'Reset all the habit?',
      bodyText: 'Are you sure you want to reset all of your progress?',
      handleCancel: () => setModalParams(defaultModalParams),
      handleConfirm: () => {
        resetHabit(habitName);
        setModalParams(defaultModalParams);
        setHabit(fetchHabit());
      },
    }),
    [fetchHabit]
  );

  const getDangerModalParams = useCallback(
    (habitName: string) => ({
      visible: true,
      title: 'Delete this habit?',
      bodyText: 'Are you sure you want to delete this habit and lose all of your progress?',
      handleCancel: () => setModalParams(defaultModalParams),
      handleConfirm: () => {
        deleteHabit(habitName);
        setModalParams(defaultModalParams);
        setTimeout(() => window.location.replace('/habits'), 500);
      },
    }),
    []
  );

  return (
    habit && (
      <>
        <Container className={blk()}>
          <section className={blk('SettingsSection')}>
            <div className={blk('ControlButtons')}>
              <Button
                variant='warning'
                onClick={() => setModalParams(() => getWarningModalParams(habit.name))}
              >
                Reset Progress
              </Button>
              <Button
                variant='danger'
                onClick={() => setModalParams(() => getDangerModalParams(habit.name))}
              >
                Remove Habit
              </Button>
            </div>
          </section>
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
        {modalParams && <DefaultModal {...modalParams} />}
      </>
    )
  );
};
