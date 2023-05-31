import { FC, memo, ReactNode, useEffect } from 'react';
import classNames from 'classnames';

import css from './FilterList.module.scss';

import LockBodyScrollService from '@/services/lock-body-scroll';

import CloseSvg from '@/components/svgs/close.svg';

export type FilterListProps = {
  className?: string;
  header?: string;
  onClose?: () => void;
  children: ReactNode;
  isOpen?: boolean;
};

const FilterList: FC<FilterListProps> = ({ className, header, children, isOpen, onClose }) => {
  useEffect(() => {
    isOpen ? LockBodyScrollService.lock() : LockBodyScrollService.unlock();
  }, [isOpen]);

  return (
    <div className={classNames('FilterList', css.root, className)}>
      <div className={css.wrapper}>
        <div className={css.titleBar}>
          <CloseSvg className={css.close} onClick={onClose} />
          {header && <div className={css.header}>{header}</div>}
        </div>
        <div className={css.contentBar}>
          <div className={css.container}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(FilterList);
