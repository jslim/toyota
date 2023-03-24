import { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';

import css from './FilterDropdownModal.module.scss';

import CloseSvg from '@/components/svgs/close.svg';

export type FilterDropdownModalProps = {
  className?: string;
  header?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const FilterDropdownModal: FC<FilterDropdownModalProps> = ({ className, header, isOpen, children, onClose }) => {
  return (
    <div className={classNames('FilterDropdownModal', css.root, className, { [css.open]: isOpen })}>
      <CloseSvg className={css.close} onClick={() => onClose} />
      {header && <div className={css.header}>{header}</div>}
      <div className={css.container}>{children}</div>
    </div>
  );
};

export default memo(FilterDropdownModal);
