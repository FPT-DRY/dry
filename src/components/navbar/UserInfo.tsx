import classNames from 'classnames/bind';
import { Tooltip } from 'react-tooltip';

import styles from './navbar.module.scss';

const cx = classNames.bind(styles);

type PlacesType =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'

type UserInfoProps = {
  username: string;
  email: string;
  tooltipPosition?: 'auto' | PlacesType;
};

function UserInfo({ username, email, tooltipPosition }: UserInfoProps) {
  return (
    <div className={cx('user-info')}>
      <p className={cx('text-username')}>{username}</p>
      <span className={cx('text-email')}>{email}</span>
      <Tooltip
        anchorSelect={'.' + cx('text-email')}
        place={tooltipPosition === 'auto' ? undefined : tooltipPosition}
        variant='dark'
        delayShow={750}
        content={email}
      />
    </div>
  );
}

export default UserInfo;
