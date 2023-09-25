import classNames from 'classnames/bind';

import styles from './Previewer.module.scss';

const cx = classNames.bind(styles);

type Props = {};

function Previewer(props: Props) {
  return <div className={cx('root')}></div>;
}

export default Previewer;
