import { FC, memo, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import PointerMoveService from '@/services/pointer-move';

import css from './Cursor.module.scss';

export type CursorProps = {
  className?: string;
  text: string;
  containerRef: RefObject<HTMLElement | null>;
  isDragging?: boolean;
};

const Cursor: FC<CursorProps> = ({ className, text, containerRef, isDragging }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isInside, setIsInside] = useState(false);

  const moveCircle = useCallback(
    (e: MouseEvent) => {
      if (containerRef.current === null) return;

      const relX = e.pageX - containerRef.current.offsetLeft;
      const relY = e.pageY - containerRef.current.offsetTop;

      gsap.to(cursorRef.current, {
        x: relX,
        y: relY
      });
    },
    [containerRef]
  );

  const cursorInside = () => {
    setIsInside(true);
  };

  const cursorOutside = () => {
    setIsInside(false);
  };

  useEffect(() => {
    if (isInside) {
      gsap.set(cursorRef.current, { top: 'unset', left: 'unset' });
    }
  }, [isInside]);

  useEffect(() => {
    const container = containerRef?.current;

    if (container) {
      container.addEventListener('mousemove', moveCircle);
      container.addEventListener('mouseover', cursorInside);
      container.addEventListener('mouseleave', cursorOutside);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', moveCircle);
        container.removeEventListener('mouseover', cursorInside);
        container.removeEventListener('mouseleave', cursorOutside);
      }
    };
  }, [containerRef, moveCircle]);

  useEffect(() => {
    if (isInside) {
      gsap.to(circleRef.current, {
        scale: 1,
        duration: 1,
        ease: 'ease01',
        delay: 0.084
      });
      gsap.to(textRef.current, {
        scale: 0.71,
        ease: 'ease01'
      });
    } else if (!isInside && !isDragging) {
      gsap.to(circleRef.current, {
        scale: 0,
        duration: 1,
        ease: 'ease01'
      });
      gsap.to(textRef.current, {
        scale: 1,
        duration: 1,
        ease: 'ease01'
      });
    }
  }, [isDragging, isInside]);

  useEffect(() => {
    if (isDragging) {
      gsap.to(cursorRef.current, {
        scale: 0.6,
        duration: 0.5,
        ease: 'linear'
      });
    } else {
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.5,
        ease: 'linear'
      });
    }
  }, [isDragging]);

  return (
    <div className={classNames('Cursor', css.root, className)} ref={cursorRef}>
      <div className={css.circle} ref={circleRef} />
      <div className={css.text} ref={textRef}>
        {text}
      </div>
    </div>
  );
};

export default memo(Cursor);
