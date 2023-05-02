import { FC, memo, MutableRefObject, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';

import css from './Cursor.module.scss';

export type CursorProps = {
  className?: string;
  containerRef: MutableRefObject<HTMLElement>;
  isDragging?: boolean;
};

const text = 'Drag';

const Cursor: FC<CursorProps> = ({ className, containerRef, isDragging }) => {
  const cursorRef = useRef() as MutableRefObject<HTMLDivElement>;
  const circleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isInside, setIsInside] = useState(false);
  const [isOnLink, setOnlink] = useState(false);
  const [initPos, setInitPos] = useState<{ left: number; top: number } | null>(null);

  const cursorInside = () => {
    setIsInside(true);
  };

  const cursorOutside = () => {
    setIsInside(false);
  };
  useEffect(() => {
    const handleInitPos = () => {
      const cursorBounds = cursorRef.current?.getBoundingClientRect();
      gsap.set(cursorRef.current, { y: containerRef.current?.clientHeight / 2, opacity: 1 });
      setInitPos({
        top: containerRef.current?.clientHeight / 2 || 0,
        left: cursorBounds.x - containerRef.current?.getBoundingClientRect().left + cursorBounds.width / 2 || 0
      });
    };
    handleInitPos();
  }, [cursorRef, containerRef]);

  useEffect(() => {
    if (!isInside && initPos) {
      gsap.to(cursorRef.current, {
        duration: 1,
        y: initPos.top,
        x: initPos.left
      });
    }
  }, [isInside, initPos]);

  useEffect(() => {
    const container = containerRef.current;

    const moveCircle = (e: MouseEvent) => {
      if (containerRef.current === null) return;
      // check if hover is a link and remove red cursor
      if (
        (e.target as Element).tagName.toLowerCase() === 'a' ||
        (e.target as Element).parentElement?.tagName.toLowerCase() === 'a'
      ) {
        setOnlink(true);
      } else {
        setOnlink(false);
      }
      const containerBounds = containerRef.current?.getBoundingClientRect();
      gsap.to(cursorRef.current, {
        duration: 0.4,
        ease: 'sine.out',
        x: e.clientX - containerBounds.left,
        y: e.clientY - containerBounds.top
      });
    };
    if (container) {
      container.addEventListener('mousemove', moveCircle);
      container.addEventListener('mouseenter', cursorInside);
      container.addEventListener('mouseleave', cursorOutside);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', moveCircle);
        container.removeEventListener('mouseenter', cursorInside);
        container.removeEventListener('mouseleave', cursorOutside);
      }
    };
  }, [containerRef]);

  useEffect(() => {
    if (isInside) {
      gsap.to(cursorRef.current, {
        scale: 0.8,
        duration: 0.5,
        ease: 'linear'
      });
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
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.5,
        ease: 'linear'
      });
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
        scale: 0.8,
        duration: 0.5,
        ease: 'linear'
      });
    }
  }, [isDragging]);

  useEffect(() => {
    isOnLink ? gsap.to(cursorRef.current, { scale: 0 }) : gsap.to(cursorRef.current, { scale: 1 });
  }, [isOnLink]);

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
