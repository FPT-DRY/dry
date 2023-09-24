import cx from 'classnames';

type Props = {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  gap?: number;
  rounded?: boolean;
  children: React.ReactNode;
};

export default function Grid({
  sm = 2,
  md = 3,
  lg = 3,
  xl = 4,
  gap = 2,
  rounded = true,
  children,
}: Props) {
  const className = cx('grid', 'grid-cols-1', {
    [`sm:grid-cols-${sm}`]: true,
    [`md:grid-cols-${md}`]: true,
    [`lg:grid-cols-${lg}`]: true,
    [`xl:grid-cols-${xl}`]: true,
    [`gap-${gap}`]: true,
    'rounded-md': rounded,
  });

  return <div className={className}>{children}</div>;
}
