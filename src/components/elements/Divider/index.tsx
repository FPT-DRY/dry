import React from 'react';
import classNames from 'classnames/bind';

import styles from './Divider.module.scss';

const cx = classNames.bind(styles);

type Props = {
  direction?: 'horizontal' | 'vertical';
};

function Divider({ direction = 'horizontal' }: Props) {
  return <span className={cx('root', {
    'x-axis': direction === 'horizontal',
    'y-axis': direction === 'vertical',
  })} />;
}

export default Divider;
