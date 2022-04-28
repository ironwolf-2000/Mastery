import { useState, useEffect, useCallback, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Button, Container, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleMinus,
  faCircleXmark,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

import {
  getEntityByName,
  updateEntityHeatmap,
  deleteEntity,
  resetEntity,
  getCurrentEntitySuccessRate,
} from '../../../services/entities.service';
import { IDashboardProps } from './Dashboard.types';
import { IHeatmapSquare } from '../Heatmap/Heatmap.types';
import { IDefaultModalProps } from '../Modals/Modals.types';
import { IEntityParams } from '../../App/App.types';
import { getFormattedDate } from '../../../utils';
import { DefaultModal } from '../Modals';
import { Heatmap } from '..';

import './Dashboard.scss';

const blk = cn('Dashboard');
const defaultModalParams = {
  visible: false,
  title: '',
  bodyText: '',
  handleCancel: () => undefined,
  handleConfirm: () => undefined,
};

export const Dashboard = ({
  className,
  entityType,
  redirectPath,
  entityHeatmapColor,
}: IDashboardProps) => {
  const navigate = useNavigate();
  const { encodedName } = useParams();

  const [currSquare, setCurrSquare] = useState<IHeatmapSquare | null>(null);
  const [entity, setEntity] = useState<IEntityParams | null>(null);
  const [modalParams, setModalParams] = useState<IDefaultModalProps>(defaultModalParams);

  const fetchEntity = useCallback(() => {
    if (encodedName == null) return null;

    return getEntityByName(entityType, decodeURIComponent(encodedName));
  }, [encodedName, entityType]);

  const handleHeatmapClick = useCallback(
    (val: number) => {
      if (entity && currSquare) {
        updateEntityHeatmap(entityType, entity.name, currSquare.x, currSquare.y, val);
        setEntity(fetchEntity());
      }
    },
    [entity, currSquare, entityType, fetchEntity]
  );

  useEffect(() => {
    const fetchedEntity = fetchEntity();

    if (!fetchedEntity) navigate('/not-found', { replace: true });
    else setEntity(fetchedEntity);
  }, [fetchEntity, navigate]);

  const currentSR = useMemo(() => getCurrentEntitySuccessRate(entity), [entity]);

  const getWarningModalParams = useCallback(
    (name: string) => ({
      visible: true,
      title: `Reset the ${entityType}?`,
      bodyText: 'Are you sure you want to reset all of your progress?',
      handleCancel: () => setModalParams(defaultModalParams),
      handleConfirm: () => {
        resetEntity(entityType, name);
        setModalParams(defaultModalParams);
        setEntity(fetchEntity());
      },
    }),
    [entityType, fetchEntity]
  );

  const getDangerModalParams = useCallback(
    (name: string) => ({
      visible: true,
      title: `Delete the ${entityType}?`,
      bodyText: `Are you sure you want to delete this ${entityType} and lose all of your progress?`,
      handleCancel: () => setModalParams(defaultModalParams),
      handleConfirm: () => {
        deleteEntity(entityType, name);
        setModalParams(defaultModalParams);
        setTimeout(() => window.location.replace(redirectPath), 500);
      },
    }),
    [entityType, redirectPath]
  );

  const heatmapCellPopover = (
    <Popover className={blk('Popover')}>
      {[
        { colorType: 'success', title: 'complete', val: 4, icon: faCircleCheck },
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
    entity && (
      <>
        <Container className={blk('', [className])}>
          <section className={blk('InfoSection')}>
            <header className={blk('InfoSectionHeader')}>
              <Button
                className={blk('BackButton')}
                variant='outline-secondary'
                size='sm'
                onClick={() => navigate(redirectPath)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
              <h2 className={blk('SectionHeading')}>{_.capitalize(entityType)} Info</h2>
            </header>
            <div className={blk('InfoSectionContent')}>
              <section className={blk('InfoSubsection')}>
                <h3 className={blk('SubsectionHeading')}>Start Date</h3>
                {getFormattedDate(entity.startTime)}
              </section>
              <section className={blk('InfoSubsection')}>
                <h3 className={blk('SubsectionHeading')}>Your Motivation</h3>
                <p className={blk('SubsectionContent')}>{entity.motivation}</p>
              </section>
              <section className={blk('InfoSubsection')}>
                <h2 className={blk('SubsectionHeading')}>Success Rate</h2>
                <div className={blk('SubsectionContent')}>
                  <span className={blk('TargetSRLabel')}>
                    Target <Badge bg='info'>{entity.successRate}</Badge>
                  </span>
                  <span>
                    Current{' '}
                    <Badge
                      bg={currentSR > -1 && currentSR < entity.successRate ? 'danger' : 'success'}
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
                onClick={() => setModalParams(() => getWarningModalParams(entity.name))}
              >
                Reset Progress
              </Button>
              <Button
                variant='danger'
                onClick={() => setModalParams(() => getDangerModalParams(entity.name))}
              >
                Delete the {entityType}
              </Button>
            </div>
          </section>
          <section className={blk('HeatmapSection')}>
            <h2 className={blk('SectionHeading')}>{entity.name}</h2>
            <Heatmap
              className={blk('Heatmap')}
              heatmapState={entity.heatmap}
              onClick={(x, y) => setCurrSquare({ x, y })}
              onClickPopover={heatmapCellPopover}
              bgColor={entityHeatmapColor}
            />
          </section>
        </Container>
        {modalParams && <DefaultModal {...modalParams} />}
      </>
    )
  );
};
