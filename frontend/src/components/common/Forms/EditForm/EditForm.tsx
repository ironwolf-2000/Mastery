import { WheelEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FloatingLabel, Form as BSForm, Button } from 'react-bootstrap';

import { MyErrorMessage } from '../ErrorMessage';
import { IEditFormProps, IEditParams } from '../Forms.types';
import { HintComponent } from '../../HintComponent/HintComponent';

import './EditForm.scss';

const blk = cn('EditForm');

export const EditForm = ({ type, entity, handleCancel, handleSubmit }: IEditFormProps) => {
  const { name, motivation, requirementsText, requirementsMinValue } = entity;

  const { t } = useTranslation();

  const editValidationSchema = {
    name: Yup.string()
      .max(20, t('The name must be 20 characters or less.'))
      .required(t('The name cannot be empty.')),
    motivation: Yup.string().max(80, t('Your motivation message must not exceed 80 characters.')),
    requirementsText: Yup.string().max(
      40,
      t('The requirements message must not exceed 40 characters.')
    ),
    requirementsMinValue: Yup.number()
      .required(t('You must specify the minimum value for your requirements.'))
      .min(1, t('The minimum required value must be a positive integer.'))
      .max(999_999, t('The specified value is too big.')),
  };

  const initialValues: IEditParams = {
    name,
    motivation,
    requirementsText,
    requirementsMinValue,
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(editValidationSchema)}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, getFieldProps }) => {
          return (
            <BSForm className={blk()} onSubmit={handleSubmit}>
              <BSForm.Group className='mb-3'>
                <BSForm.Label>{t(`change-name-${type}`)}</BSForm.Label>
                <BSForm.Control
                  type='text'
                  placeholder={t(`name-for-${type}`)}
                  {...getFieldProps('name')}
                />
                <MyErrorMessage name='name' />
              </BSForm.Group>

              <FloatingLabel label={t('Identify a motivator')} className={blk('FloatingLabel')}>
                <BSForm.Control
                  className={blk('Motivation')}
                  as='textarea'
                  {...getFieldProps('motivation')}
                />
              </FloatingLabel>
              <MyErrorMessage name='motivation' />

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

              <div className={blk('FormFooter')}>
                <Button variant='secondary' onClick={handleCancel}>
                  {t('Cancel')}
                </Button>
                <Button variant='primary' type='submit'>
                  {t('Save')}
                </Button>
              </div>
            </BSForm>
          );
        }}
      </Formik>
    </>
  );
};
