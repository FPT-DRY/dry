import Toast from '@components/elements/Toast';
import classNames from 'classnames/bind';
import { Slide } from 'react-toastify';

import styles from './AuthWrapper.module.scss';

const cx = classNames.bind(styles);

type Props = {
  children: React.ReactNode;
};

function AuthWrapper({ children }: Props) {
  return (
    <div className={cx('root')}>
      <div className={cx('container', 'absolute-center')}>{children}</div>
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

export default AuthWrapper;
