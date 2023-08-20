import classNames from 'classnames/bind';
import React from 'react';

import styles from './menu.module.scss';

const cx = classNames.bind(styles);

export interface MenuItemProps extends React.HTMLProps<HTMLLIElement> {
  onClick: React.MouseEventHandler<HTMLLIElement>;
  children?: React.ReactNode;
}

export type MenuItemType<T> = T extends React.ReactElement<infer P>
  ? P extends MenuItemProps
    ? T
    : never
  : never;

export default function MenuItem({ onClick, children }: MenuItemProps) {
  return (
    <li className={cx('MenuItem-root')} onClick={onClick}>
      {children}
    </li>
  );
}
