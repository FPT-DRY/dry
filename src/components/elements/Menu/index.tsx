'use client';

import classNames from 'classnames/bind';
import React, {
  JSXElementConstructor,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from './menu.module.scss';

const cx = classNames.bind(styles);

type ClickableElementProps = React.HTMLProps<HTMLElement> & {
  onClick?: (..._args: any) => void;
};

interface MenuProps extends React.HTMLProps<HTMLDivElement> {
  classes?: {
    menuClassName?: string;
    menuListClassName?: string;
    menuItemClassName?: string;
  };
  position?: 'left' | 'right';
  hover?: boolean;
  menuType?: 'flex' | 'grid';
  anchor: React.ReactElement;
  items: React.ReactElement[];
}

function Menu({
  classes,
  position,
  hover,
  menuType = 'flex',
  anchor,
  items,
  ...componentProps
}: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [show, setShow] = useState<boolean>(false);

  const inboundOnClickHandler = () => {
    setShow((prevState) => !prevState);
  };

  const outboundOnClickHandler = (evt: MouseEvent) => {
    const target = evt.target as Node;
    if (!menuRef.current?.contains(target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (!hover) {
      document.addEventListener('click', outboundOnClickHandler);
    } else {
      document.removeEventListener('click', outboundOnClickHandler);
    }

    return () => {
      document.removeEventListener('click', outboundOnClickHandler);
    };
  }, [hover]);

  const getMappedPropsAnchor = () => {
    if (React.isValidElement(anchor)) {
      const childProps = anchor.props as ClickableElementProps;
      const props: ClickableElementProps = {
        ...childProps,
        className: cx(childProps.className, 'cursor-pointer', {
          active: show,
        }),
        onClick: !hover ? inboundOnClickHandler : undefined,
      };
      return React.cloneElement(anchor, props);
    }
    return anchor;
  };
  return (
    <div
      ref={menuRef}
      className={cx('root', classes?.menuClassName, { hover })}
      {...componentProps}
    >
      {getMappedPropsAnchor()}
      {hover && <div className={cx('hoverable-space')} />}
      <ul
        ref={listRef}
        className={cx(
          'menu-list',
          {
            [menuType]: true,
            visible: show,
            'position-left': position === 'left',
            'position-right': position === 'right',
          },
          classes?.menuListClassName
        )}
      >
        {items.map((item, idx) => {
          const elementType = item.type as JSXElementConstructor<any>;
          return elementType.name === 'Divider' ? (
            item
          ) : (
            <li
              key={idx}
              className={cx('menu-item', classes?.menuItemClassName)}
              onClick={inboundOnClickHandler}
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
