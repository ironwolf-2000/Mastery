import { useState, useRef } from 'react';
import { cn } from '@bem-react/classname';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FloatingLabel, Form as BSForm, Button, Overlay, Tooltip } from 'react-bootstrap';

import { MyErrorMessage } from '../ErrorMessage';
import { ICreateFormProps, ICreateParams } from '../Forms.types';
import { DEFAULT_HABIT_SUCCESS_RATE } from '../../../../services/habits.service';

import './CreateForm.scss';

const blk = cn('CreateForm');

export const CreateForm = ({ type, handleCancel, handleSubmit }: ICreateFormProps) => {
  const [srTooltipVisible, setSRTooltipVisible] = useState<boolean>(false);
  const [useSR, setUseSR] = useState<boolean>(false);
  const target = useRef(null);

  const initialValues: ICreateParams = {
    entityName: '',
    motivationTextarea: '',
    masteryType: 'Beginner: 36 days',
    successRate: DEFAULT_HABIT_SUCCESS_RATE,
    type,
  };

  const validationSchema = Yup.object({
    entityName: Yup.string()
      .max(15, 'The name must be 15 characters or less.')
      .required('The name cannot be empty.'),
    motivationTextarea: Yup.string().min(
      20,
      'Your motivation message must be at least 20 characters long.'
    ),
    masteryType: Yup.string(),
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
                <BSForm.Label>Give your habit a name</BSForm.Label>
                <BSForm.Control
                  type='text'
                  placeholder='Habit name'
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

              <BSForm.Group className={blk('MasteryTypeSection')}>
                <BSForm.Label>Choose the mastery type</BSForm.Label>
                <BSForm.Select
                  className={blk('MasteryTypeSelect')}
                  {...getFieldProps('masteryType')}
                >
                  <option>Beginner: 36 days</option>
                  <option>Amateur: 64 days</option>
                  <option>Mastery: 100 days</option>
                </BSForm.Select>
              </BSForm.Group>

              <BSForm.Group className={blk('SRSection')}>
                <BSForm.Check
                  type='checkbox'
                  label='Use success rate'
                  checked={useSR}
                  onChange={() => setUseSR(!useSR)}
                />
                <FontAwesomeIcon
                  className={blk('SRIcon', { active: srTooltipVisible })}
                  forwardedRef={target}
                  icon={faCircleQuestion}
                  onMouseEnter={() => setSRTooltipVisible(true)}
                  onMouseLeave={() => setSRTooltipVisible(false)}
                />
                <Overlay target={target.current} show={srTooltipVisible} placement='bottom'>
                  {props => (
                    <Tooltip className={blk('SRTooltip')} {...props}>
                      Determine the percentage of successful days in case you don't want to stick to
                      the habit every day.
                    </Tooltip>
                  )}
                </Overlay>
              </BSForm.Group>

              {useSR && (
                <BSForm.Group className='mt-3'>
                  <div className={blk('SRInputContainer')}>
                    <BSForm.Label>
                      Determine what percentage of days (10% to 100%) you plan to successfully
                      complete your habit.
                    </BSForm.Label>
                    <BSForm.Control
                      className={blk('SRInputField')}
                      type='number'
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
