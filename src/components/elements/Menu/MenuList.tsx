import React from 'react';
import { MenuItemProps, MenuItemType } from './MenuItem';

type Props = {
  children: MenuItemType<React.ReactElement<MenuItemProps>>;
};

function MenuList({ children }: Props) {
  return <ul>{children}</ul>;
}

export default MenuList;
