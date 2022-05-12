import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';
import { Form as BSForm, Button, Row, Col } from 'react-bootstrap';

import { ILanguage } from '../../../../i18n/config';
import { languageCodeToName } from '../../../../i18n/helpers';
import { IUserOptionsFormProps } from '../Forms.types';

import './UserOptionsForm.scss';

const blk = cn('UserOptionsForm');

export const UserOptionsForm = ({ user, handleCancel, handleSave }: IUserOptionsFormProps) => {
  const { t } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(user.language);

  return (
    <BSForm
      className={blk()}
      onSubmit={e => {
        e.preventDefault();
        handleSave({ language: currentLanguage });
      }}
    >
      <Row className='align-items-center'>
        <Col sm={5}>
          <BSForm.Label>{t('Application language')}</BSForm.Label>
        </Col>
        <Col xs='auto'>
          <BSForm.Select
            className={blk('LanguageSelect')}
            value={currentLanguage}
            onChange={e => setCurrentLanguage(e.target.value as ILanguage)}
          >
            {Object.entries(languageCodeToName).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </BSForm.Select>
        </Col>
      </Row>

      <div className={blk('FormFooter')}>
        <Button variant='secondary' onClick={handleCancel}>
          {t('Cancel')}
        </Button>
        <Button type='submit' variant='primary'>
          {t('Save')}
        </Button>
      </div>
    </BSForm>
  );
};
