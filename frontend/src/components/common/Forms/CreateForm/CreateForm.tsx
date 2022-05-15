import { useMemo, useState, WheelEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FloatingLabel, Form as BSForm, Button } from 'react-bootstrap';

import { ENTITY_FREQUENCIES } from '../../../App/App.constants';
import { MyErrorMessage } from '../ErrorMessage';
import { ICreateFormProps, ICreateParams } from '../Forms.types';
import { HintComponent } from '../../HintComponent/HintComponent';
import { DEFAULT_SUCCESS_RATE } from '../../../../services/entity.service';

import './CreateForm.scss';

const blk = cn('CreateForm');

export const CreateForm = ({ type, handleCancel, handleSubmit }: ICreateFormProps) => {
  const { t } = useTranslation();

  const [applySR, setApplySR] = useState<boolean>(false);

  const createValidationSchema = {
    entityName: Yup.string()
      .max(20, t('The name must be 20 characters or less.'))
      .required(t('The name cannot be empty.')),
    motivationTextarea: Yup.string().max(
      80,
      t('Your motivation message must not exceed 80 characters.')
    ),
    requirementsText: Yup.string().max(
      40,
      t('The requirements message must not exceed 40 characters.')
    ),
    requirementsMinValue: Yup.number()
      .required(t('You must specify the minimum value for your requirements.'))
      .min(1, t('The minimum required value must be a positive integer.'))
      .max(999_999, t('The specified value is too big.')),
    entityFrequency: Yup.number(),
    successRate: Yup.number()
      .min(10, t('Success Rate must be at least 10%'))
      .max(100, t('Success Rate cannot be greater than 100%')),
  };

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
                    onWheel={(e: WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
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
                      onWheel={(e: WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
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
