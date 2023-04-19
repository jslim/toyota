import { LegacyRef, MutableRefObject, forwardRef, memo, useEffect } from 'react';
import classNames from 'classnames';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import css from './Eyebrow.module.scss';

import { variants } from '@/data/variants';

gsap.registerPlugin(ScrollTrigger);

export type EyebrowProps = {
  className?: string;
  text: string;
  variant?: string;
  animInTL?: MutableRefObject<GSAPTimeline>;
};

const Eyebrow = (
  { className, text, variant = variants.LIGHT, animInTL }: EyebrowProps,
  ref: LegacyRef<HTMLDivElement>
) => {
  useEffect(() => {
    {
      if (!animInTL) return;
      const q = gsap.utils.selector(ref);
      animInTL.current = gsap.timeline({ paused: true }).from(q('.circle'), {
        xPercent: 80
      });
    }
  }, [animInTL, ref]);

  return (
    <div ref={ref} className={classNames('Eyebrow', css.root, className, { [css.dark]: variant === variants.DARK })}>
      <p className={css.text}>
        <span className={classNames('circle', css.circle)} />
        {text}
      </p>
    </div>
  );
};

export default memo(forwardRef(Eyebrow));
