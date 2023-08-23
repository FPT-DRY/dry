import classNames from 'classnames/bind';
import React, { useState } from 'react';

import styles from './menu.module.scss';

const cx = classNames.bind(styles);

type ClickableElementProps = React.HTMLProps<HTMLElement> & {
  onClick?: (...args: any) => void;
};

interface MenuProps extends React.HTMLProps<HTMLDivElement> {
  classes?: {
    menuClassName: string;
    menuListClassName: string;
    menuItemClassName: string;
  };
  position?: 'left' | 'right';
  items: React.ReactElement[];
  children: React.ReactElement;
}

function Menu({
  classes,
  position,
  items,
  children,
  ...componentProps
}: MenuProps) {
  const [show, setShow] = useState<boolean>(false);

  const onClickHandler = () => {
    setShow((prevState) => !prevState);
  };

  const mappedPropsChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps = child.props as ClickableElementProps;
      const props: ClickableElementProps = {
        ...childProps,
        className: cx(childProps.className, 'cursor-pointer'),
        onClick: onClickHandler,
      };
      return React.cloneElement(child, props);
    }
    return child;
  });

  return (
    <div className={cx('root', classes?.menuClassName)} {...componentProps}>
      {mappedPropsChildren}
      <ul
        className={cx('menu-list', classes?.menuListClassName, {
          visible: show,
          'position-left': position === 'left',
          'position-right': position === 'right',
        })}
      >
        {items.map((item) => {
          return (
            <li className={cx('menu-item', classes?.menuItemClassName)}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
