import { useState, useEffect, useCallback, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Badge, Button, Container, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleMinus,
  faCircleXmark,
  faArrowLeft,
  faFloppyDisk,
  faArrowRotateLeft,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';

import {
  getEntityByName,
  deleteEntity,
  resetEntity,
  getCurrentEntitySuccessRate,
  editEntity,
} from '../../../services/entity.service';
import {
  getCurrentHeatmapCell,
  highlightCurrentHeatmapCell,
  updateEntityHeatmap,
} from '../../../services/heatmap.service';
import { IDashboardProps } from './Dashboard.types';
import { IHeatmapCellStatus, IHeatmapCellCoordinates } from '../Heatmap/Heatmap.types';
import { IDefaultModalProps } from '../Modals/Modals.types';
import { IEntityParams, IEntityType } from '../../App/App.types';
import { getFormattedDate, numberWithSpaces } from '../../../utils';
import { CreateEditModal as EditModal, DefaultModal } from '../Modals';
import { Heatmap } from '..';
import { editParamsToEntityParams } from '../../helpers';
import { IEditParams } from '../Forms/Forms.types';

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

  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [activeCellCoords, setActiveCellCoords] = useState<IHeatmapCellCoordinates | null>(null);
  const [entity, setEntity] = useState<IEntityParams | null>(null);
  const [modalParams, setModalParams] = useState<IDefaultModalProps>(defaultModalParams);
  const [requirementsValue, setRequirementsValue] = useState('');

  const currentSR = useMemo(() => getCurrentEntitySuccessRate(entity), [entity]);

  const currPeriodCellCoords = useMemo(() => {
    if (!entity) return null;

    return getCurrentHeatmapCell(entityType, entity.name);
  }, [entity, entityType]);

  const fetchEntity = useCallback(() => {
    if (encodedName == null) return null;

    const args: [IEntityType, string] = [entityType, decodeURIComponent(encodedName)];

    highlightCurrentHeatmapCell(...args);
    return getEntityByName(...args);
  }, [encodedName, entityType]);

  const handleHeatmapClick = useCallback(
    (status: IHeatmapCellStatus, currValue?: number) => {
      if (entity && activeCellCoords && currValue !== undefined) {
        updateEntityHeatmap(
          entityType,
          entity.name,
          activeCellCoords.x,
          activeCellCoords.y,
          status,
          currValue
        );
        setEntity(fetchEntity());
      }
    },
    [entity, activeCellCoords, entityType, fetchEntity]
  );

  useEffect(() => {
    const fetchedEntity = fetchEntity();

    if (!fetchedEntity) navigate('/not-found', { replace: true });
    else setEntity(fetchedEntity);
  }, [fetchEntity, navigate]);

  useEffect(() => {
    if (!entity || !currPeriodCellCoords) return;

    const [x, y] = currPeriodCellCoords;
    setRequirementsValue((entity.heatmap[x][y].currValue ?? 0).toString());
  }, [currPeriodCellCoords, entity]);

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
        {
          color: `var(--color-${entityType}s)`,
          title: 'complete',
          value: entity?.requirementsMinValue ?? undefined,
          status: 'normal',
          icon: faCircleCheck,
        } as const,
        {
          color: 'var(--bs-gray-500)',
          title: 'skip',
          value: 0,
          status: 'skipped',
          icon: faCircleMinus,
        } as const,
        {
          color: 'var(--bs-gray-500)',
          title: 'fail',
          value: 0,
          status: 'normal',
          icon: faCircleXmark,
        } as const,
      ].map(({ color, title, value, status, icon }) => (
        <FontAwesomeIcon
          key={title}
          icon={icon}
          className={blk('PopoverIcon')}
          color={color}
          title={title}
          onClick={() => handleHeatmapClick(status, value)}
        />
      ))}
    </Popover>
  );

  const handleEditEntity = (params: IEditParams) => {
    if (!entity) {
      // Entity Edit Modal can only be triggered from the entity page itself, so this 'return' should never happen.
      return;
    }

    const resp = editEntity(entityType, entity.name, editParamsToEntityParams(entity, params));

    if (resp.success) {
      setEditModalVisible(false);
      setTimeout(() => {
        if (params.name !== entity.name) {
          navigate(`/habits/${encodeURIComponent(params.name)}`, { replace: true });
        } else {
          window.location.reload();
        }
      }, 500);
    } else {
      toast.error(resp.message);
    }
  };

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
              {entity.motivation && (
                <section className={blk('InfoSubsection')}>
                  <h3 className={blk('SubsectionHeading')}>Your Motivation</h3>
                  <p className={blk('SubsectionContent')}>{entity.motivation}</p>
                </section>
              )}
              <section className={blk('InfoSubsection')}>
                <h3 className={blk('SubsectionHeading')}>
                  Required Value{' '}
                  <Badge bg='info' className='ms-1'>
                    {numberWithSpaces(entity.requirementsMinValue)}
                  </Badge>
                </h3>
                {entity.requirementsText && (
                  <p className={blk('SubsectionContent')}>{entity.requirementsText}</p>
                )}
                <div className={blk('RequirementsValueInputSection')}>
                  <input
                    className={blk('RequirementsInputField')}
                    type='text'
                    value={requirementsValue}
                    onChange={e => {
                      const val = e.target.value;
                      if (val && !/^\d+$/.test(val)) {
                        return;
                      }

                      setRequirementsValue(val.slice(0, 6));
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faArrowRotateLeft}
                    className={blk('RequirementsIcon')}
                    title='Restore to the previous value'
                    size='lg'
                    onClick={() => {
                      if (currPeriodCellCoords) {
                        const [x, y] = currPeriodCellCoords;
                        setRequirementsValue(entity.heatmap[x][y].currValue.toString());
                      }
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faFloppyDisk}
                    className={blk('RequirementsIcon')}
                    title='Save the current value'
                    size='lg'
                    onClick={() => {
                      if (currPeriodCellCoords) {
                        const [x, y] = currPeriodCellCoords;
                        const currValue = Number(requirementsValue);

                        updateEntityHeatmap(entityType, entity.name, x, y, 'normal', currValue);
                        setEntity(fetchEntity());
                      }
                    }}
                  />
                </div>
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
            <header className={blk('HeatmapSectionHeader')}>
              <h2 className={blk('SectionHeading')}>{entity.name}</h2>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className={blk('EditIcon')}
                size='lg'
                onClick={() => setEditModalVisible(true)}
              />
            </header>
            <Heatmap
              className={blk('Heatmap')}
              heatmapState={entity.heatmap}
              onClick={(x, y) => setActiveCellCoords({ x, y })}
              onClickPopover={heatmapCellPopover}
              bgColor={entityHeatmapColor}
            />
          </section>
        </Container>
        {modalParams && <DefaultModal {...modalParams} />}
        <EditModal
          entityType='habit'
          entity={entity}
          modalType='edit'
          title={`Edit a ${entityType}`}
          visible={editModalVisible}
          handleCancel={() => setEditModalVisible(false)}
          handleEdit={handleEditEntity}
        />
      </>
    )
  );
};
