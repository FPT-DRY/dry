import classNames from 'classnames/bind';
import React from 'react';

import styles from './menu.module.scss';

const cx = classNames.bind(styles);

interface MenuListProps extends React.HTMLProps<HTMLUListElement> {
  show: boolean;
  children: React.ReactNode;
}

function MenuList({ show, children, ...componentProps }: MenuListProps) {
  return (
    <ul className={cx('MenuList-root', { visible: show })} {...componentProps}>
      {children}
    </ul>
  );
}

export default MenuList;
