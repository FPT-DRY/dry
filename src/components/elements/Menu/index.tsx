import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';

import styles from './menu.module.scss';

const cx = classNames.bind(styles);

type ClickableElementProps = React.HTMLProps<HTMLElement> & {
  onClick?: (..._args: any) => void;
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
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);

  const inboundOnClickHandler = () => {
    setShow((prevState) => !prevState);
  };

  const outboundOnClickHandler = (evt: MouseEvent) => { 
    if (ref.current && !ref.current.contains(evt.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', outboundOnClickHandler);

    return () => {
      document.removeEventListener('click', outboundOnClickHandler);
    };
  }, []);

  const mappedPropsChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps = child.props as ClickableElementProps;
      const props: ClickableElementProps = {
        ...childProps,
        className: cx(childProps.className, 'cursor-pointer'),
        onClick: inboundOnClickHandler,
      };
      return React.cloneElement(child, props);
    }
    return child;
  });

  return (
    <div
      ref={ref}
      className={cx('root', classes?.menuClassName)}
      {...componentProps}
    >
      {mappedPropsChildren}
      <ul
        className={cx('menu-list', classes?.menuListClassName, {
          visible: show,
          'position-left': position === 'left',
          'position-right': position === 'right',
        })}
      >
        {items.map((item, idx) => {
          return (
            <li
              key={idx}
              className={cx('menu-item', classes?.menuItemClassName)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
