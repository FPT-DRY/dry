import classNames from 'classnames/bind';
import { useId } from 'react';

import styles from './FormControl.module.scss';

const cx = classNames.bind(styles);

type VariantsType = 'standard' | 'outline';

type FormControlProps = {
  id?: string;
  inputName: string;
  labelText: string;
  inputType?: 'text' | 'email' | 'phone' | 'password';
  placeholder?: string;
  variant?: VariantsType;
  autoComplete?: 'on' | 'off';
};

function FormControl({
  id,
  inputName,
  labelText,
  inputType = 'text',
  placeholder,
  variant = 'standard',
  autoComplete = 'on',
}: FormControlProps) {
  const generatedId = useId();

  return (
    <div
      className={cx('root', {
        outline: variant === 'outline',
      })}
    >
      <label className={cx('label')} htmlFor={id || generatedId}>
        {labelText}
      </label>
      <input
        className={cx('input')}
        id={id || generatedId}
        name={inputName}
        type={inputType}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </div>
  );
}

export default FormControl;
