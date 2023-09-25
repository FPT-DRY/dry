import { ConnectForm } from '@components/elements/Form';
import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';
import { memo, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Tooltip } from 'react-tooltip';
import { CSSTransition } from 'react-transition-group';

import styles from './FormControl.module.scss';

const cx = classNames.bind(styles);

type VariantsType = 'standard' | 'outline';

interface FormControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  variant?: VariantsType;
  name: string;
  labelProps?: Omit<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    'id' | 'htmlFor'
  >;
  errorProps?: React.HTMLAttributes<HTMLSpanElement>;
}

interface InputControlProps extends FormControlProps {
  formContext: ReturnType<typeof useFormContext>;
}

const InputControl = memo(
  ({
    id,
    name,
    defaultValue = '',
    labelText,
    variant = 'standard',
    formContext,
    labelProps,
    errorProps,
    ...inputProps
  }: InputControlProps) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const generatedLabelId = 'label_' + name;
    const generatedInputId = 'input_' + name;
    const error = formContext?.formState?.errors[name];

    return (
      <CSSTransition
        in={!isEmpty(error)}
        nodeRef={ref}
        timeout={{
          appear: 0,
          enter: 200,
          exit: 1000,
        }}
        classNames={{
          enterActive: 'validate',
          enterDone: 'error',
          exitActive: 'valid',
        }}
      >
        <div
          ref={ref}
          className={cx('root', {
            standard: variant === 'standard',
            outline: variant === 'outline',
          })}
        >
          <label
            {...labelProps}
            id={generatedLabelId}
            className={cx('label', labelProps?.className)}
            htmlFor={id || generatedInputId}
          >
            {labelText}
          </label>
          {formContext?.control ? (
            <Controller
              name={name}
              defaultValue={defaultValue}
              control={formContext.control}
              render={({ field: { onChange, onBlur, name, value } }) => {
                const onControlledChange = (
                  evt: React.ChangeEvent<HTMLInputElement>
                ) => {
                  onChange(evt);
                  if (inputProps.onChange) {
                    inputProps.onChange(evt);
                  }
                };
                return (
                  <input
                    {...inputProps}
                    className={cx('input')}
                    id={id || generatedInputId}
                    onChange={onControlledChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                  />
                );
              }}
            />
          ) : (
            <input
              className={cx('input')}
              id={id || generatedInputId}
              name={name}
              defaultValue={defaultValue}
              {...inputProps}
            />
          )}
          {!isEmpty(error) && error.message !== undefined && (
            <Tooltip
              {...errorProps}
              noArrow
              className={cx('error-text', errorProps?.className)}
              anchorSelect={'#' + generatedLabelId}
              place='right'
              positionStrategy='absolute'
              offset={5}
              content={error.message as string}
            />
          )}
        </div>
      </CSSTransition>
    );
  }
);

InputControl.displayName = 'Control';

function FormControl(inputProps: FormControlProps) {
  return (
    <ConnectForm>
      {(context) => <InputControl formContext={context} {...inputProps} />}
    </ConnectForm>
  );
}

export default FormControl;
