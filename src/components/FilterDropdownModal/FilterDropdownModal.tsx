import { FC, memo, ReactNode, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import css from './FilterDropdownModal.module.scss';

export type FilterDropdownModalProps = {
  className?: string;
  isOpen?: boolean;
  children: ReactNode;
};

const FilterDropdownModal: FC<FilterDropdownModalProps> = ({ className, children, isOpen }) => {
  const [isCloseToRight, setIsCloseToRight] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modalEl = modalRef.current;
    if (modalEl && isOpen) {
      const modalRect = modalEl.getBoundingClientRect();
      const browserWidth = window.innerWidth;
      const modalRightOffset = browserWidth - modalRect.right;
      const isCloseToRight = modalRightOffset < 20;
      setIsCloseToRight(isCloseToRight);
    } else if (!isOpen) {
      setIsCloseToRight(false);
    }
  }, [isOpen]);

  return (
    <div
      className={classNames('FilterDropdownModal', css.root, className, {
        [css.isOpen]: isOpen,
        [css.move]: isCloseToRight
      })}
      ref={modalRef}
    >
      <div className={css.containerWrapper}>
        <div className={css.container}>{children}</div>
      </div>
    </div>
  );
};

export default memo(FilterDropdownModal);
