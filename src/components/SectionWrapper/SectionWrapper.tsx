import { FC, memo, ReactNode, useEffect, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';

import css from './SectionWrapper.module.scss';

import Eyebrow from '@/components/Eyebrow/Eyebrow';

import { Color, getBackgroundColorClass, isDarkMode } from '@/utils/colors';

export type SectionWrapperProps = {
  className?: string;
  eyebrow?: string;
  title?: string;
  children?: ReactNode;
  backgroundColor?: Color;
  targetId?: string;
};

const SectionWrapper: FC<SectionWrapperProps> = ({
  className,
  eyebrow,
  title,
  children,
  backgroundColor = Color.DARK_GREY,
  targetId
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      scrollTrigger: { start: 'top 85%', trigger: titleRef.current },
      ease: 'ease1'
    });
  }, []);

  return (
    <div
      id={targetId}
      className={classNames(
        'SectionWrapper',
        css.root,
        className,
        css[isDarkMode(backgroundColor)],
        backgroundColor && getBackgroundColorClass(backgroundColor),
        'wrapper'
      )}
    >
      <div className={css.wrapper}>
        {eyebrow && <Eyebrow className={css.wrapperInfo} text={eyebrow} variant={isDarkMode(backgroundColor, true)} />}
        {title && (
          <h2 ref={titleRef} className={css.title}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default memo(SectionWrapper);
