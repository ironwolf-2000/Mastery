import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container, Overlay, Tooltip } from 'react-bootstrap';
import { faPlus, faHouse } from '@fortawesome/free-solid-svg-icons';

import { createParamsToEntityParams } from '../../helpers';
import { getAllUserEntities, addEntity } from '../../../services/entity.service';
import { getOverallEntityHeatmap } from '../../../services/heatmap.service';
import { Heatmap, CreateEditModal as CreateModal } from '../../common';
import { ICreateParams } from '../../common/Forms/Forms.types';
import { IHeatmapCellParams } from '../../common/Heatmap/Heatmap.types';
import { QuotesComponent } from '../../QuotesComponent';
import { IEntityParams } from '../../App/App.types';
import { IEntitiesPageProps } from './EntitiesPage.types';
import { ControlButton } from '../Buttons';

import './EntitiesPage.scss';

const blk = cn('EntitiesPage');

export const EntitiesPage = ({
  className,
  entityType,
  redirectPath,
  entityHeatmapColor,
}: IEntitiesPageProps) => {
  const navigate = useNavigate();

  const addButtonRef = useRef(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const [entities, setEntities] = useState<IEntityParams[]>([]);
  const [overallEntitiesHeatmap, setOverallEntitiesHeatmap] = useState<IHeatmapCellParams[][]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const updatePageElements = useCallback(() => {
    setEntities(getAllUserEntities(entityType));
    setOverallEntitiesHeatmap(getOverallEntityHeatmap(entityType, [2, 3]));
  }, [entityType]);

  useEffect(() => {
    updatePageElements();
    setLoading(false);
  }, [updatePageElements]);

  const handleAddEntity = (params: ICreateParams) => {
    const resp = addEntity(entityType, createParamsToEntityParams(params));

    if (resp.success) {
      toast.success(resp.message);
      updatePageElements();
      setCreateModalVisible(false);
    } else {
      toast.error(resp.message);
    }
  };

  const addButtonDisabled = entities.length === 7;

  return !loading ? (
    <>
      <Container className={blk('', [className])}>
        <section className={blk('ManageEntitiesSection')}>
          <header className={blk('Header')}>
            <ControlButton
              className={blk('ControlButton', { [entityType]: true })}
              icon={faHouse}
              onClick={() => navigate('/home')}
            />
            <span
              ref={addButtonRef}
              onMouseEnter={addButtonDisabled ? () => setTooltipVisible(true) : undefined}
              onMouseLeave={addButtonDisabled ? () => setTooltipVisible(false) : undefined}
            >
              <ControlButton
                className={blk('ControlButton', { [entityType]: true })}
                icon={faPlus}
                onClick={() => setCreateModalVisible(true)}
              />
            </span>
            <Overlay target={addButtonRef.current} show={tooltipVisible} placement='bottom'>
              {props => (
                <Tooltip className={blk('Tooltip')} {...props}>
                  You cannot have more than 7 {entityType}s at once.
                </Tooltip>
              )}
            </Overlay>
          </header>
          {entities.length ? (
            <>
              <div className={blk('EntityLinksBlock')}>
                {entities.map(entity => {
                  const encodedName = encodeURIComponent(entity.name);

                  return (
                    <Button
                      key={encodedName}
                      className={blk('EntityLink', { [entityType]: true })}
                      variant='outline-secondary'
                      onClick={() => navigate(`${redirectPath}/${encodedName}`)}
                    >
                      {entity.name}
                    </Button>
                  );
                })}
              </div>
              {entityType !== 'preference' && (
                <div className={blk('QuotesComponentWrapper')}>
                  <QuotesComponent entityType={entityType} />
                </div>
              )}
            </>
          ) : (
            <>
              <p className={blk('NoEntitiesLabel')}>
                You don't have any {entityType}s in progress.
              </p>
              <div className={blk('ImageContainer')}>
                <img
                  src={require('../../../assets/no-entities.webp')}
                  alt=''
                  className={blk('Image')}
                />
              </div>
            </>
          )}
        </section>
        <section className={blk('HeatmapSection')}>
          <h2 className={blk('HeatmapSectionHeading')}>Overall Progress</h2>
          <Heatmap heatmapState={overallEntitiesHeatmap} bgColor={entityHeatmapColor} />
        </section>
      </Container>
      <CreateModal
        entityType={entityType}
        modalType='create'
        title={`Create a new ${entityType}`}
        visible={createModalVisible}
        handleCancel={() => setCreateModalVisible(false)}
        handleCreate={handleAddEntity}
      />
    </>
  ) : null;
};
