import cx from 'classnames';

type Props = {
  template?: 'cols' | 'rows';
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  gap?: number;
  rounded?: boolean;
  children: React.ReactNode;
};

export default function Grid({
  template = 'cols',
  sm = 2,
  md = 3,
  lg = 3,
  xl = 4,
  gap = 2,
  rounded = true,
  children,
}: Props) {
  const buildTemplateClasses = () => {
    return `grid-${template}-1 sm:grid-${template}-${sm} md:grid-${template}-${md} lg:grid-${template}-${lg} xl:grid-${template}-${xl} gap-${gap}`;
  };

  const className = cx('grid', buildTemplateClasses(), {
    'rounded-md': rounded,
  });

  return <div className={className}>{children}</div>;
}
