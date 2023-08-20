import React from 'react';

export type MenuItemProps = {
  onClick: React.MouseEventHandler<HTMLLIElement>;
  children?: React.ReactNode;
};

export type MenuItemType<T> = T extends React.ReactElement<infer P>
  ? P extends MenuItemProps
    ? T
    : never
  : never;

export default function MenuItem({ onClick, children }: MenuItemProps) {
  return <li onClick={onClick}>{children}</li>;
}
