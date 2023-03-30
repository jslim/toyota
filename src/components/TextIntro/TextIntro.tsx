import { FC, memo, useEffect, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';

import css from './TextIntro.module.scss';

import { ButtonType } from '@/components/Cta/Cta';
import Cta from '@/components/Cta/Cta';

import SvgDownCaret from '@/components/svgs/svg-caret-down.svg';
import ToyotaBackground from '@/components/svgs/svg-toyota-background.svg';

export type TextIntroProps = {
  className?: string;
  layout: TextIntroLayout;
  data: {
    eyebrow: string;
    header: string;
    description: string;
    ctaText?: string;
    subsection?: {
      header1: string;
      description1: string;
      header2: string;
      description2: string;
    };
  };
};

export enum TextIntroLayout {
  Default = 'default',
  DefaultBackgroundImage = 'defaultBackgroundImage',
  HeaderLeft = 'headerLeft',
  SubSections = 'subSections'
}

const TextIntro: FC<TextIntroProps> = ({ className, layout, data }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const redDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(contentRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      scrollTrigger: { trigger: contentRef.current },
      ease: 'power4.out'
    });

    gsap.from(redDotRef.current, {
      duration: 1,
      x: -50,
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
          layout === TextIntroLayout.HeaderLeft ? [css.root, css.tabletColumnLayout].join(' ') : css.root,
          className
        )}
      >
        {layout === TextIntroLayout.DefaultBackgroundImage && (
          <div className={css.backgroundImageContainer}>
            <ToyotaBackground className={css.backgroundImage} />
          </div>
        )}
        <div
          className={
            layout === TextIntroLayout.HeaderLeft ? [css.leftColumn, css.tabletColumnLayout].join(' ') : css.leftColumn
          }
        >
          <div className={css.eyebrow}>
            <div ref={redDotRef} className={css.redDot}>
              •
            </div>
            <span>{data.eyebrow}</span>
          </div>
          {layout === TextIntroLayout.HeaderLeft && <div className={css.leftTitle}>{data.header}</div>}
        </div>
        <div
          className={
            layout === TextIntroLayout.SubSections || layout === TextIntroLayout.HeaderLeft
              ? [css.rightColumn, css.subSectionTabletView, css.headerLeftTabletColumnLayout].join(' ')
              : css.rightColumn
          }
          ref={contentRef}
        >
          {layout !== TextIntroLayout.HeaderLeft && <div className={css.title}>{data.header}</div>}
          <div className={css.description}>{data.description}</div>
          {layout === TextIntroLayout.HeaderLeft && (
            <div className={css.cta}>
              <Cta />
              <span className={css.ctaText}>{data.ctaText}</span>
            </div>
          )}
        </div>
      </div>
      {layout === TextIntroLayout.SubSections && (
        <div className={css.root}>
          <div className={css.leftColumn}>
            <div className={css.subtitle}>{data.subsection?.header1}</div>
            <div className={css.description}>{data.subsection?.description1}</div>
            <Cta theme={ButtonType.Icon} className={css.subtitleCta}>
              <SvgDownCaret />
            </Cta>
          </div>
          <div className={css.rightColumn}>
            <div className={css.subtitle}>{data.subsection?.header1}</div>
            <div className={css.description}>{data.subsection?.description2}</div>
            <Cta theme={ButtonType.Icon} className={css.subtitleCta}>
              <SvgDownCaret />
            </Cta>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(TextIntro);
