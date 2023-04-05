import { FC, memo, useEffect, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';

import css from './TextIntro.module.scss';

import Cta from '@/components/Cta/Cta';

import ToyotaBackground from '@/components/svgs/svg-toyota-background.svg';

import Eyebrow from '../Eyebrow/Eyebrow';

export enum TextIntroLayout {
  DEFAULT = 'default',
  DEFAULT_BACKGROUND_IMAGE = 'defaultBackgroundImage',
  HEADER_LEFT = 'headerLeft'
}

export type TextIntroProps = {
  className?: string;
  layout: TextIntroLayout;
  eyebrow: string;
  header: string;
  description: string;
  ctaText?: string;
  link?: string;
};

const TextIntro: FC<TextIntroProps> = ({ className, layout, eyebrow, header, description, ctaText, link }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(contentRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      scrollTrigger: { trigger: contentRef.current },
      ease: 'power4.out'
    });
  }, []);

  return (
    <div>
      <div
        className={classNames(
          'TextIntro',
          css.root,
          { [css.tabletColumnLayout]: layout === TextIntroLayout.HEADER_LEFT },
          className
        )}
      >
        {layout === TextIntroLayout.DEFAULT_BACKGROUND_IMAGE && (
          <div className={css.backgroundImageContainer}>
            <ToyotaBackground className={css.backgroundImage} />
          </div>
        )}
        <div
          // className={classNames(css.leftColumn, { [css.tabletColumnLayout]: layout === TextIntroLayout.HEADER_LEFT })}
          className={css.leftColumn}
        >
          <Eyebrow text={eyebrow} />
          {layout === TextIntroLayout.HEADER_LEFT && <h2 className={css.leftTitle}>{header}</h2>}
        </div>
        <div
          // className={classNames(css.rightColumn, {
          //   [css.subSectionTabletView]: layout === TextIntroLayout.HEADER_LEFT,
          //   [css.headerLeftTabletColumnLayout]: layout === TextIntroLayout.HEADER_LEFT
          // })}
          className={css.rightColumn}
          ref={contentRef}
        >
          {layout !== TextIntroLayout.HEADER_LEFT && <h2 className={css.title}>{header}</h2>}
          <p className={css.description}>{description}</p>
          {link && ctaText && (
            <div className={css.cta}>
              <Cta title={ctaText} href={link} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(TextIntro);
