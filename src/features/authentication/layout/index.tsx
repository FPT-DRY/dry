import Toast from '@components/elements/Toast';
import classNames from 'classnames/bind';
import { Slide } from 'react-toastify';

import styles from './AuthLayout.module.scss';

const cx = classNames.bind(styles);

type Props = {
  size?: 'md' | 'lg';
  children: React.ReactNode;
};

function AuthLayout({ size, children }: Props) {
  return (
    <div className={cx('root')}>
      <div
        className={cx('container', 'absolute-center', {
          lg: size === 'lg',
        })}
      >
        {children}
      </div>
      <Toast
        className={cx('toast')}
        position='top-center'
        theme='dark'
        transition={Slide}
        autoClose={3000}
      />
    </div>
  );
}

export default AuthLayout;
