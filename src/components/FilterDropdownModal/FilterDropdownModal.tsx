import { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';

import css from './FilterDropdownModal.module.scss';

export type FilterDropdownModalProps = {
  className?: string;
  isOpen?: boolean;
  children: ReactNode;
};

const FilterDropdownModal: FC<FilterDropdownModalProps> = ({ className, children, isOpen }) => {
  return (
    <div className={classNames('FilterDropdownModal', css.root, className, { [css.isOpen]: isOpen })}>
      <div className={css.containerWrapper}>
        <div className={css.container}>{children}</div>
      </div>
    </div>
  );
};

export default memo(FilterDropdownModal);
