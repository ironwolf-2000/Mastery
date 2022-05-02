import { useState } from 'react';
import { cn } from '@bem-react/classname';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FloatingLabel, Form as BSForm, Button } from 'react-bootstrap';

import { ENTITY_FREQUENCIES } from '../../../App/App.constants';
import { MyErrorMessage } from '../ErrorMessage';
import { ICreateFormProps, ICreateParams } from '../Forms.types';
import { HintComponent } from '../../HintComponent/HintComponent';
import { DEFAULT_SUCCESS_RATE } from '../../../../services/entities.service';

import './CreateForm.scss';

const blk = cn('CreateForm');

export const CreateForm = ({ type, handleCancel, handleSubmit }: ICreateFormProps) => {
  const [applySR, setApplySR] = useState<boolean>(false);

  const initialValues: ICreateParams = {
    type,
    entityName: '',
    motivationTextarea: '',
    entityFrequency: 1,
    requirementsShortDescription: '',
    requirementsUnits: 0,
    successRate: DEFAULT_SUCCESS_RATE,
  };

  const validationSchema = Yup.object({
    entityName: Yup.string()
      .max(30, 'The name must be 15 characters or less.')
      .required('The name cannot be empty.'),
    motivationTextarea: Yup.string()
      .min(10, 'Your motivation message must be at least 10 characters long.')
      .max(80, 'Your motivation message must not exceed 80 characters.'),
    entityFrequency: Yup.number(),
    requirementsShortDescription: Yup.string().max(
      40,
      'The requirements message must not exceed 40 characters.'
    ),
    requirementsUnits: Yup.number()
      .required('You must specify the minimum value for your requirements.')
      .min(0, 'The specified value is too small.')
      .max(999_999, 'The specified value is too big.'),
    successRate: Yup.number()
      .min(10, 'Success Rate must be at least 10%')
      .max(100, 'Success Rate cannot be greater than 100%'),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, getFieldProps }) => {
          return (
            <BSForm className={blk('Form')} onSubmit={handleSubmit}>
              <BSForm.Group className='mb-3'>
                <BSForm.Label>Give your {type} a name</BSForm.Label>
                <BSForm.Control
                  type='text'
                  placeholder={`The name for your ${type}`}
                  {...getFieldProps('entityName')}
                />
                <MyErrorMessage name='entityName' />
              </BSForm.Group>

              <FloatingLabel label='Identify a motivator' className={blk('FloatingLabel')}>
                <BSForm.Control
                  className={blk('MotivationTextarea')}
                  as='textarea'
                  {...getFieldProps('motivationTextarea')}
                />
              </FloatingLabel>
              <MyErrorMessage name='motivationTextarea' />

              <BSForm.Group className={blk('EntityFrequencySection')}>
                <BSForm.Label>Choose the frequency in days</BSForm.Label>
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
                <BSForm.Label>Requirements</BSForm.Label>
                <HintComponent
                  tooltipMessage={`Specify the minimum conditions that must be met in order to keep the ${type}.`}
                />
                <div className={blk('RequirementsControlFields')}>
                  <BSForm.Control
                    type='text'
                    placeholder='Short description'
                    {...getFieldProps('requirementsShortDescription')}
                  />
                  <BSForm.Control
                    type='number'
                    placeholder='Units'
                    {...getFieldProps('requirementsUnits')}
                  />
                </div>
                <MyErrorMessage name='requirementsShortDescription' />
                <MyErrorMessage name='requirementsUnits' />
              </BSForm.Group>

              <BSForm.Group className={blk('SRSection')}>
                <BSForm.Check
                  type='checkbox'
                  label='Apply success rate'
                  checked={applySR}
                  onChange={() => setApplySR(!applySR)}
                />
                <HintComponent
                  tooltipMessage={`Determine the percentage of successful periods in case you don't want to stick to the
            ${type} 100%.`}
                />
              </BSForm.Group>

              {applySR && (
                <BSForm.Group className='mt-3'>
                  <div className={blk('SRInputContainer')}>
                    <BSForm.Label>Determine the success rate of your {type}.</BSForm.Label>
                    <BSForm.Control
                      className={blk('SRInputField')}
                      type='number'
                      placeholder='e.g. 90'
                      {...getFieldProps('successRate')}
                    />
                  </div>
                  <MyErrorMessage name='successRate' />
                </BSForm.Group>
              )}

              <div className={blk('FormFooter')}>
                <Button variant='secondary' onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant='primary' type='submit'>
                  Create
                </Button>
              </div>
            </BSForm>
          );
        }}
      </Formik>
    </>
  );
};
