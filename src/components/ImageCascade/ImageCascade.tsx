import { FC, memo, ReactNode, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';

import css from './ImageCascade.module.scss';

export type ImageCascadeProps = {
  className?: string;
  children: ReactNode;
  isSide?: boolean;
};

const ImageCascade: FC<ImageCascadeProps> = ({ className, children, isSide }) => {
  const [animate, setAnimate] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | undefined>();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainersRef = useRef<HTMLDivElement[]>([]);
  const renderedItems = [];

  const pushElement = (el: HTMLDivElement | null) => {
    if (el) imageContainersRef.current.push(el);
  };

  for (let i = 0; i < 3; i++) {
    renderedItems.push(
      <div key={i} className={css.imageContainer} ref={(el) => pushElement(el)}>
        {children}
      </div>
    );
  }

  useEffect(() => {
    timelineRef.current = gsap.timeline({ paused: true }).to(
      containerRef.current,
      {
        duration: 0.4
      },
      0
    );

    !isSide
      ? timelineRef.current.fromTo(
          imageContainersRef.current,
          {
            // clipPath: "polygon(15% 0, 90% 0, 90% 0, 15% 0)"
            clipPath: 'inset(0 10% 100% 10% round 0px 0px 40px 40px)'
          },
          {
            // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            clipPath: 'inset(0 0 0 0 round 0px 0px 40px 40px)',
            stagger: 0.3
          },
          0
        )
      : timelineRef.current.fromTo(
          imageContainersRef.current,
          {
            // clipPath: "polygon(15% 0, 90% 0, 90% 0, 15% 0)"
            clipPath: 'inset(50% 0 100% 50% round 40px 0 0 40px)'
          },
          {
            // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            clipPath: 'inset(0 0 0 0 round 40px 0 0 40px)',
            stagger: 0.3
          },
          0
        );
  }, [isSide]);

  useEffect(() => {
    if (animate) {
      timelineRef?.current?.restart();
    } else {
      timelineRef?.current?.reverse();
    }
  }, [animate]);

  return (
    <div className={classNames('ImageCascade', css.root, className, { [css.side]: isSide })}>
      <div className={css.container} ref={containerRef}>
        {renderedItems}
      </div>

      <button onClick={() => setAnimate(!animate)}>Click Me</button>
    </div>
  );
};

export default memo(ImageCascade);
