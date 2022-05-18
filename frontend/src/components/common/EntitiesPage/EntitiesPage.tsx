import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container, Overlay, Tooltip } from 'react-bootstrap';
import { faPlus, faHouse } from '@fortawesome/free-solid-svg-icons';

import { createParamsToEntityParams, categorizeEntitiesByStatus } from '../../helpers';
import { getAllUserEntities, addEntity } from '../../../services/entity.service';
import { getOverallEntityHeatmap } from '../../../services/heatmap.service';
import { Heatmap, FormModal as CreateModal, HintComponent } from '../../common';
import { ICreateParams } from '../../common/Forms/Forms.types';
import { IHeatmapCellParams } from '../../common/Heatmap/Heatmap.types';
import { QuotesComponent } from '../../QuotesComponent';
import { IEntityParams, IEntityStatus } from '../../App/App.types';
import { IEntitiesPageProps } from './EntitiesPage.types';
import { ControlButton } from '../Buttons';
import { LanguageContext } from '../../App';

import './EntitiesPage.scss';

const blk = cn('EntitiesPage');

export const EntitiesPage = ({
  className,
  entityType,
  redirectPath,
  entityHeatmapColor,
}: IEntitiesPageProps) => {
  const { t } = useTranslation();
  const lang = useContext(LanguageContext);

  const navigate = useNavigate();

  const addButtonRef = useRef(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const [entities, setEntities] = useState<Record<IEntityStatus, IEntityParams[]> | null>(null);
  const [overallEntitiesHeatmap, setOverallEntitiesHeatmap] = useState<IHeatmapCellParams[][]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const updatePageElements = useCallback(() => {
    setEntities(categorizeEntitiesByStatus(getAllUserEntities(entityType)));
    setOverallEntitiesHeatmap(getOverallEntityHeatmap(lang, entityType, [2, 3]));
  }, [lang, entityType]);

  useEffect(() => {
    document.title = t(`${entityType}s`);
  }, [t, entityType]);

  useEffect(() => {
    updatePageElements();
  }, [updatePageElements]);

  const handleAddEntity = (params: ICreateParams) => {
    const resp = addEntity(entityType, createParamsToEntityParams(lang, params));

    if (resp.success) {
      toast.success(resp.message);
      updatePageElements();
      setCreateModalVisible(false);
    } else {
      toast.error(resp.message);
    }
  };

  const activeCount = entities?.active.length ?? 0;

  const renderEntityLinks = useCallback(
    (status: IEntityStatus) => {
      return (
        entities && (
          <div>
            {entities[status].map(entity => {
              const encodedName = encodeURIComponent(entity.name);
              return (
                <Button
                  key={encodedName}
                  className={blk('EntityLink', { [entity.entityType]: true })}
                  variant='outline-secondary'
                  onClick={() => navigate(`${redirectPath}/${encodedName}`)}
                >
                  {entity.name}
                </Button>
              );
            })}
          </div>
        )
      );
    },
    [entities, navigate, redirectPath]
  );

  return entities ? (
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
              onMouseEnter={activeCount >= 7 ? () => setTooltipVisible(true) : undefined}
              onMouseLeave={activeCount >= 7 ? () => setTooltipVisible(false) : undefined}
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
                  {t(`upper-limit-${entityType}`)}
                </Tooltip>
              )}
            </Overlay>
          </header>
          {activeCount ? (
            <>
              <div className={blk('EntitiesByStatusSection')}>{renderEntityLinks('active')}</div>
              {entityType !== 'preference' && (
                <div className={blk('QuotesComponentWrapper')}>
                  <QuotesComponent entityType={entityType} />
                </div>
              )}
            </>
          ) : (
            <>
              <p className={blk('NoEntitiesLabel')}>{t(`none-in-progress-${entityType}`)}</p>
              <div className={blk('ImageContainer')}>
                <img
                  src={require('../../../assets/no-entities.webp')}
                  alt=''
                  className={blk('Image')}
                />
              </div>
            </>
          )}
          {entities.completed.length > 0 && (
            <section className={blk('EntitiesByStatusSection')}>
              <h2 className={blk('SubsectionHeading')}>{t(`Completed ${entityType}s`)}</h2>
              {renderEntityLinks('completed')}
            </section>
          )}
          {entities.failed.length > 0 && (
            <section className={blk('EntitiesByStatusSection')}>
              <h2 className={blk('SubsectionHeading')}>{t(`Failed ${entityType}s`)}</h2>
              {renderEntityLinks('failed')}
            </section>
          )}
        </section>
        <section className={blk('HeatmapSection')}>
          <h2 className={blk('SectionHeading')}>
            {t('Overall Progress')}
            <HintComponent tooltipMessage={t(`overall-heatmap-hint-${entityType}s`)} />
          </h2>
          <Heatmap heatmapState={overallEntitiesHeatmap} bgColor={entityHeatmapColor} />
        </section>
      </Container>
      <CreateModal
        entityType={entityType}
        modalType='create-entity'
        title={t(`create-${entityType}`)}
        visible={createModalVisible}
        handleCancel={() => setCreateModalVisible(false)}
        handleCreate={handleAddEntity}
      />
    </>
  ) : null;
};
