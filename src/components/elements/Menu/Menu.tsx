import React from 'react';
import MenuList from './MenuList';
import { MenuItemProps, MenuItemType } from './MenuItem';

interface MenuProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  menuItems: MenuItemType<React.ReactElement<MenuItemProps>>;
}

function Menu({ menuItems, children, ...componentProps }: MenuProps) {
  return (
    <>
      <div {...componentProps}>{children}</div>
      <MenuList>
        {menuItems}
      </MenuList>
    </>
  );
}

export default Menu;
