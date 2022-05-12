import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FloatingLabel, Form as BSForm, Button } from 'react-bootstrap';

import i18n from '../../../../i18n/config';
import { ENTITY_FREQUENCIES } from '../../../App/App.constants';
import { MyErrorMessage } from '../ErrorMessage';
import { ICreateFormProps, ICreateParams } from '../Forms.types';
import { HintComponent } from '../../HintComponent/HintComponent';
import { DEFAULT_SUCCESS_RATE } from '../../../../services/entity.service';
import { editValidationSchema } from '../EditForm/EditForm';

import './CreateForm.scss';

const blk = cn('CreateForm');

const createValidationSchema = {
  entityName: editValidationSchema.name,
  motivationTextarea: editValidationSchema.motivation,
  requirementsText: editValidationSchema.requirementsText,
  requirementsMinValue: editValidationSchema.requirementsMinValue,
  entityFrequency: Yup.number(),
  successRate: Yup.number()
    .min(10, i18n.t('Success Rate must be at least 10%'))
    .max(100, i18n.t('Success Rate cannot be greater than 100%')),
};

export const CreateForm = ({ type, handleCancel, handleSubmit }: ICreateFormProps) => {
  const { t } = useTranslation();
  const [applySR, setApplySR] = useState<boolean>(false);

  const initialValues: ICreateParams = useMemo(
    () => ({
      type,
      entityName: '',
      motivationTextarea: '',
      entityFrequency: 1,
      requirementsText: '',
      requirementsMinValue: 10,
      successRate: DEFAULT_SUCCESS_RATE,
    }),
    [type]
  );

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(createValidationSchema)}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, getFieldProps }) => {
          return (
            <BSForm className={blk()} onSubmit={handleSubmit}>
              <BSForm.Group className='mb-3'>
                <BSForm.Label>{t(`give-name-${type}`)}</BSForm.Label>
                <BSForm.Control
                  type='text'
                  placeholder={t(`name-for-${type}`)}
                  {...getFieldProps('entityName')}
                />
                <MyErrorMessage name='entityName' />
              </BSForm.Group>

              <FloatingLabel label={t('Identify a motivator')} className={blk('FloatingLabel')}>
                <BSForm.Control
                  className={blk('MotivationTextarea')}
                  as='textarea'
                  {...getFieldProps('motivationTextarea')}
                />
              </FloatingLabel>
              <MyErrorMessage name='motivationTextarea' />

              <BSForm.Group className={blk('EntityFrequencySection')}>
                <BSForm.Label>{t('Choose the frequency in days')}</BSForm.Label>
                <BSForm.Select
                  className={blk('EntityFrequencySelect')}
                  {...getFieldProps('entityFrequency')}
                >
                  {ENTITY_FREQUENCIES.map(el => (
                    <option key={el}>{el}</option>
                  ))}
                </BSForm.Select>
              </BSForm.Group>

              <BSForm.Group className={blk('RequirementsSection')}>
                <BSForm.Label>{t('Requirements')}</BSForm.Label>
                <HintComponent tooltipMessage={t(`min-conditions-for-${type}`)} />
                <div className={blk('RequirementsControlFields')}>
                  <BSForm.Control
                    type='text'
                    placeholder={t('Short description')}
                    {...getFieldProps('requirementsText')}
                  />
                  <BSForm.Control
                    type='number'
                    placeholder={t('e.g. 24')}
                    {...getFieldProps('requirementsMinValue')}
                  />
                </div>
                <MyErrorMessage name='requirementsText' />
                <MyErrorMessage name='requirementsMinValue' />
              </BSForm.Group>

              <BSForm.Group className={blk('SRSection')}>
                <BSForm.Check
                  type='checkbox'
                  label={t('Apply success rate')}
                  checked={applySR}
                  onChange={() => setApplySR(!applySR)}
                />
                <HintComponent tooltipMessage={t(`sr-tooltip-${type}`)} />
              </BSForm.Group>

              {applySR && (
                <BSForm.Group className='mt-3'>
                  <div className={blk('SRInputContainer')}>
                    <BSForm.Label>{t(`sr-determine-${type}`)}</BSForm.Label>
                    <BSForm.Control
                      className={blk('SRInputField')}
                      type='number'
                      placeholder={t('e.g. 90')}
                      {...getFieldProps('successRate')}
                    />
                  </div>
                  <MyErrorMessage name='successRate' />
                </BSForm.Group>
              )}

              <div className={blk('FormFooter')}>
                <Button variant='secondary' onClick={handleCancel}>
                  {t('Cancel')}
                </Button>
                <Button variant='primary' type='submit'>
                  {t('Create')}
                </Button>
              </div>
            </BSForm>
          );
        }}
      </Formik>
    </>
  );
};
