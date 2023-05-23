import { memo, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import css from './Eyebrow.module.scss';

import { variants } from '@/data/variants';

gsap.registerPlugin(ScrollTrigger);

export type EyebrowProps = {
  className?: string;
  text: string;
  variant?: variants | string;
};

const Eyebrow = ({ className, text, variant }: EyebrowProps) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const animTL = useRef<GSAPTimeline>();

  useEffect(() => {
    animTL.current = gsap
      .timeline({ scrollTrigger: { start: 'top bottom', trigger: circleRef.current } })
      .from(circleRef.current, {
        xPercent: 80
      });
  });

  return (
    <div
      className={classNames('Eyebrow', css.root, className, {
        [css.dark]: variant === variants.DARK,
        [css.light]: variant === variants.LIGHT,
        [css.white]: variant === 'white'
      })}
    >
      <p className={css.text}>
        <span className={classNames('circle', css.circle)} ref={circleRef} />
        {text}
      </p>
    </div>
  );
};

export default memo(Eyebrow);
