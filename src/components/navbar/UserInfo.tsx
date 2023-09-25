import classNames from 'classnames/bind';
import { Tooltip } from 'react-tooltip';

import Image, { StaticImageData } from 'next/image';
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
  | 'left-end';

type UserInfoProps = {
  username: string;
  email: string;
  icon: string | StaticImageData;
  tooltipPosition?: 'auto' | PlacesType;
};

function UserInfo({ username, email, icon, tooltipPosition }: UserInfoProps) {
  return (
    <div className={cx('user-info')}>
      <div className='grid grid-cols-3'>
        <Image
          className='col-span-1'
          src={icon}
          alt='user-icon'
          width={52}
          height={52}
        />
        <div className='col-span-2'>
          <p className={cx('text-username')}>{username}</p>
          <span className={cx('text-email')}>{email}</span>
        </div>
      </div>

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
