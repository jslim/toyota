import { FC, memo, ReactNode, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';

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
  const animTL = useRef<GSAPTimeline>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    animTL.current = gsap
      .timeline({ paused: true })
      .from(ref.current, {
        autoAlpha: 0,
        duration: 0.4,
        ease: 'ease1'
      })
      .from(
        [ref.current?.children[0]],
        {
          yPercent: 100,
          pointerEvents: 'none',
          duration: 0.4,
          ease: 'ease1'
        },
        '-=0.4'
      );
    return () => LockBodyScrollService.unlock();
  }, []);

  useEffect(() => {
    if (isOpen) {
      LockBodyScrollService.lock(true);
      animTL.current?.play();
    } else {
      animTL.current?.reverse();
      LockBodyScrollService.unlock();
    }
  }, [isOpen]);

  return (
    <div className={classNames('FilterList', css.root, className)} ref={ref}>
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
