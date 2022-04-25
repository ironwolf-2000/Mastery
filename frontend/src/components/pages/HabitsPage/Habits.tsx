import { useState, useEffect } from 'react';
import { cn } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { addHabit, getAllHabits } from '../../../services/habits.service';
import { createParamsToHabitParams } from './Habits.helpers';
import { Heatmap, CreateModal } from '../../common';
import { ICreateParams } from '../../common/Forms/Forms.types';
import { IHabitParams, IHabitsProps } from './Habits.types';

import './Habits.scss';

const blk = cn('Habits');

export const Habits = ({ overallHeatmap }: IHabitsProps) => {
  const navigate = useNavigate();

  const [habits, setHabits] = useState<IHabitParams[]>([]);
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  useEffect(() => setHabits(getAllHabits()), []);

  const handleAddHabit = (params: ICreateParams) => {
    const resp = addHabit(createParamsToHabitParams(params));

    if (resp.success) {
      toast.success(resp.message);
      setHabits(getAllHabits());
      setCreateModalVisible(false);
    } else {
      toast.error(resp.message);
    }
  };

  return (
    <>
      <Container>
        <header className={blk('Header')}>
          <Button
            className={blk('AddButton')}
            variant='light'
            onClick={() => setCreateModalVisible(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          {habits.length ? (
            <div>
              {habits.map(habit => {
                const encodedName = encodeURIComponent(habit.name);

                return (
                  <Button
                    key={encodedName}
                    className={blk('HabitLink')}
                    variant='link'
                    onClick={() => navigate(`/habits/${encodedName}`)}
                  >
                    {habit.name}
                  </Button>
                );
              })}
            </div>
          ) : (
            <p>You don't have any habits in progress.</p>
          )}
        </header>

        <Heatmap heatmapState={overallHeatmap} bgColor='var(--color-rgb-habits)' cellSize='sm' />
      </Container>
      <CreateModal
        type='habit'
        title='Create a new habit'
        visible={createModalVisible}
        handleCancel={() => setCreateModalVisible(false)}
        handleCreate={handleAddHabit}
      />
      <ToastContainer autoClose={2000} position='bottom-right' />
    </>
  );
};
