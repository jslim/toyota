import { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';

import css from './FilterList.module.scss';

import CloseSvg from '@/components/svgs/close.svg';

export type FilterListProps = {
  className?: string;
  header?: string;
  onClose?: () => void;
  children: ReactNode;
};

const FilterList: FC<FilterListProps> = ({ className, header, children, onClose }) => {
  return (
    <div className={classNames('FilterList', css.root, className)}>
      <CloseSvg className={css.close} onClick={onClose} />
      {header && <div className={css.header}>{header}</div>}
      <div className={css.container}>{children}</div>
    </div>
  );
};

export default memo(FilterList);
