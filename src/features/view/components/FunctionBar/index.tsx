import { LayoutMode } from '@features/view/components/layout';
import { CategoryResponse } from '@features/view/model/Categories';
import classNames from 'classnames/bind';
import { isNumber } from 'lodash';
import Link from 'next/link';
import { BiSolidGridAlt } from 'react-icons/bi';
import { FaThList } from 'react-icons/fa';
import { HiSquare3Stack3D } from 'react-icons/hi2';

import Menu from '@components/elements/Menu';
import styles from './FunctionBar.module.scss';

const cx = classNames.bind(styles);

type Props = {
  categoryList: CategoryResponse[];
  title: string;
  mode: LayoutMode;
  page: string;
};

export default async function FunctionBar({
  categoryList,
  title,
  mode,
  page,
}: Props) {
  const buildSearchParams = (mode: LayoutMode) => {
    const newSearchParams: { [key: string]: any } = { mode };
    if (isNumber(page)) {
      newSearchParams.page = page;
    }

    return `?${new URLSearchParams(newSearchParams)}`;
  };

  return (
    <div className={cx('root')}>
      <div className={cx('list')}>
        <Menu
          classes={{
            menuClassName: cx('category-menu'),
            menuListClassName: 'grid grid-rows-4',
          }}
          anchor={<FaThList className={cx('selector')} size={24} />}
          items={categoryList.map((category) => (
            <span key={category.id}>{category.name}</span>
          ))}
        />
        <span className={cx('title')}>{title}</span>
      </div>
      <div className={cx('modes')}>
        <Link
          className={cx('mode-selector', { active: mode === 'stack' })}
          href={buildSearchParams('stack')}
        >
          <HiSquare3Stack3D size={28} />
        </Link>
        <Link
          className={cx('mode-selector', { active: mode === 'grid' })}
          href={buildSearchParams('grid')}
        >
          <BiSolidGridAlt size={32} />
        </Link>
      </div>
    </div>
  );
}
