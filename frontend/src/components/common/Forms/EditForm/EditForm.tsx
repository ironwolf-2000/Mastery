import { cn } from '@bem-react/classname';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FloatingLabel, Form as BSForm, Button } from 'react-bootstrap';

import { MyErrorMessage } from '../ErrorMessage';
import { IEditFormProps, IEditParams } from '../Forms.types';
import { HintComponent } from '../../HintComponent/HintComponent';

import './EditForm.scss';

const blk = cn('EditForm');

export const editValidationSchema = {
  name: Yup.string()
    .max(20, 'The name must be 20 characters or less.')
    .required('The name cannot be empty.'),
  motivation: Yup.string().max(80, 'Your motivation message must not exceed 80 characters.'),
  requirementsText: Yup.string().max(40, 'The requirements message must not exceed 40 characters.'),
  requirementsMinValue: Yup.number()
    .required('You must specify the minimum value for your requirements.')
    .min(1, 'The minimum required value must be a positive integer.')
    .max(999_999, 'The specified value is too big.'),
};

export const EditForm = ({ type, entity, handleCancel, handleSubmit }: IEditFormProps) => {
  const { name, motivation, requirementsText, requirementsMinValue } = entity;

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
            <BSForm className={blk('Form')} onSubmit={handleSubmit}>
              <BSForm.Group className='mb-3'>
                <BSForm.Label>Change the {type}'s name</BSForm.Label>
                <BSForm.Control
                  type='text'
                  placeholder={`The name for your ${type}`}
                  {...getFieldProps('name')}
                />
                <MyErrorMessage name='name' />
              </BSForm.Group>

              <FloatingLabel label='Identify a motivator' className={blk('FloatingLabel')}>
                <BSForm.Control
                  className={blk('Motivation')}
                  as='textarea'
                  {...getFieldProps('motivation')}
                />
              </FloatingLabel>
              <MyErrorMessage name='motivation' />

              <BSForm.Group className={blk('RequirementsSection')}>
                <BSForm.Label>Requirements</BSForm.Label>
                <HintComponent
                  tooltipMessage={`Specify the minimum conditions that must be met in order to keep the ${type}.`}
                />
                <div className={blk('RequirementsControlFields')}>
                  <BSForm.Control
                    type='text'
                    placeholder='Short description'
                    {...getFieldProps('requirementsText')}
                  />
                  <BSForm.Control
                    type='number'
                    placeholder='e.g. 24'
                    {...getFieldProps('requirementsMinValue')}
                  />
                </div>
                <MyErrorMessage name='requirementsText' />
                <MyErrorMessage name='requirementsMinValue' />
              </BSForm.Group>

              <div className={blk('FormFooter')}>
                <Button variant='secondary' onClick={handleCancel}>
                  Discard
                </Button>
                <Button variant='primary' type='submit'>
                  Save
                </Button>
              </div>
            </BSForm>
          );
        }}
      </Formik>
    </>
  );
};
