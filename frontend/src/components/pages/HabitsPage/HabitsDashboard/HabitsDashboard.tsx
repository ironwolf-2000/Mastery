import { useState, useEffect, useCallback, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Button, Container, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleMinus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import { DefaultModal, Heatmap } from '../../../common';
import {
  getHabitByName,
  updateHabitProgress,
  deleteHabit,
  resetHabit,
  getCurrentHabitSuccessRate,
} from '../../../../services/habits.service';
import { IHabitParams } from '../Habits.types';
import { IHeatmapSquare } from '../../../common/Heatmap/Heatmap.types';
import { IDefaultModalProps } from '../../../common/Modals/Modals.types';
import { getFormattedDate } from '../../../../utils';

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

  const [currSquare, setCurrSquare] = useState<IHeatmapSquare | null>(null);
  const [habit, setHabit] = useState<IHabitParams | null>(null);
  const [modalParams, setModalParams] = useState<IDefaultModalProps>(defaultModalParams);

  const fetchHabit = useCallback(() => {
    if (encodedName == null) return null;

    return getHabitByName(decodeURIComponent(encodedName));
  }, [encodedName]);

  const handleHeatmapClick = useCallback(
    (val: number) => {
      if (habit && currSquare) {
        updateHabitProgress(habit.name, currSquare.x, currSquare.y, val);
        setHabit(fetchHabit());
      }
    },
    [currSquare, fetchHabit, habit]
  );

  useEffect(() => {
    const fetchedHabit = fetchHabit();

    if (!fetchedHabit) navigate('/not-found', { replace: true });
    else setHabit(fetchedHabit);
  }, [fetchHabit, navigate]);

  const currentSR = useMemo(() => getCurrentHabitSuccessRate(habit), [habit]);

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

  const heatmapCellPopover = (
    <Popover className={blk('Popover')}>
      {[
        { colorType: 'success', title: 'complete', val: 2, icon: faCircleCheck },
        { colorType: 'warning', title: 'skip', val: 1, icon: faCircleMinus },
        { colorType: 'danger', title: 'clear', val: 0, icon: faCircleXmark },
      ].map(({ colorType, title, val, icon }) => (
        <FontAwesomeIcon
          key={title}
          icon={icon}
          className={blk('PopoverIcon')}
          color={`var(--bs-${colorType})`}
          title={title}
          onClick={() => handleHeatmapClick(val)}
        />
      ))}
    </Popover>
  );

  return (
    habit && (
      <>
        <Container className={blk()}>
          <section className={blk('InfoSection')}>
            <h2 className={blk('SectionHeading')}>Habit Info</h2>
            <div className={blk('InfoSectionContent')}>
              <section className={blk('InfoSubsection')}>
                <h3 className={blk('SubsectionHeading')}>Start Date</h3>
                {getFormattedDate(habit.startTime)}
              </section>
              <section className={blk('InfoSubsection')}>
                <h3 className={blk('SubsectionHeading')}>Your Motivation</h3>
                <p className={blk('SubsectionContent')}>{habit.motivation}</p>
              </section>
              <section className={blk('InfoSubsection')}>
                <h2 className={blk('SubsectionHeading')}>Success Rate</h2>
                <div className={blk('SubsectionContent')}>
                  <span className={blk('TargetSRLabel')}>
                    Target <Badge bg='info'>{habit.successRate}</Badge>
                  </span>
                  <span>
                    Current{' '}
                    <Badge
                      bg={currentSR > -1 && currentSR < habit.successRate ? 'danger' : 'success'}
                    >
                      {currentSR === -1 ? 0 : currentSR}
                    </Badge>
                  </span>
                </div>
              </section>
            </div>
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
              onClick={(x, y) => setCurrSquare({ x, y })}
              onClickPopover={heatmapCellPopover}
              bgColor='var(--color-rgb-habits)'
            />
          </section>
        </Container>
        {modalParams && <DefaultModal {...modalParams} />}
      </>
    )
  );
};
