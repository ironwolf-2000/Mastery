import { useState } from 'react';
import { cn } from '@bem-react/classname';
import { toast } from 'react-toastify';
import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Heatmap, CreateModal } from '../../../common';
import { addHabit } from '../../../../services/habits.service';
import { ICreateParams } from '../../../common/Forms/Forms.types';
import { createParamsToHabitParams } from '../Habits.helpers';

import './HabitsDashboard.scss';
import { IHabitsDashboardProps } from '../Habits.types';

const blk = cn('HabitsDashboard');

export const HabitsDashboard = ({
  habits,
  currHeatmapState,
  allHeatmapState,
}: IHabitsDashboardProps) => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  const handleAddHabit = (params: ICreateParams) => {
    const resp = addHabit(createParamsToHabitParams(params));

    if (resp.success) {
      toast.success(resp.message);
    } else {
      toast.error(resp.message);
    }

    setCreateModalVisible(false);
  };

  return (
    <>
      <Container className={blk()}>
        <header className={blk('Header')}>
          <Button
            className={blk('AddButton')}
            variant='light'
            onClick={() => setCreateModalVisible(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </header>
        <div className={blk('Heatmaps')}>
          <section>
            <h2 className={blk('SectionHeading')}>Current Habit</h2>
            <Heatmap heatmapState={currHeatmapState} bgColor='var(--color-rgb-habits)' />
          </section>
          <section>
            <h2 className={blk('SectionHeading')}>Your History</h2>
            <Heatmap
              heatmapState={allHeatmapState}
              bgColor='var(--color-rgb-habits)'
              cellSize='sm'
            />
          </section>
        </div>
      </Container>
      <CreateModal
        type='habit'
        title='Create a new habit'
        visible={createModalVisible}
        handleCancel={() => setCreateModalVisible(false)}
        handleCreate={handleAddHabit}
      />
    </>
  );
};
