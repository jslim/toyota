import { FC, memo, useEffect, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';

import css from './TextIntro.module.scss';

import { ColumnType } from '@/data/variants';
import sanitizer from '@/utils/sanitizer';

import { Props as LinkProps } from '@/components/BaseLink/BaseLink';
import Cta from '@/components/Cta/Cta';
import Eyebrow from '@/components/Eyebrow/Eyebrow';

import useIntersectionObserver from '@/hooks/use-intersection-observer';

enum DefaultLayoutType {
  DEFAULT = 'default',
  HEADER_LEFT = 'headerLeft'
}

export const TextIntroLayout = { ...DefaultLayoutType, ...ColumnType };

export type TextIntroProps = {
  className?: string;
  layout: DefaultLayoutType | ColumnType;
  eyebrow: string;
  header: string;
  subtitle?: string | string[];
  description?: string;
  ctaProps?: LinkProps;
  onVisibilityChange?: (isVisible: boolean) => void;
};

const TextIntro: FC<TextIntroProps> = ({
  className,
  layout,
  eyebrow,
  header,
  description,
  ctaProps,
  subtitle,
  onVisibilityChange
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [setNode, isIntersection] = useIntersectionObserver(false, 0, '-100px');

  useEffect(() => {
    if (onVisibilityChange) {
      setNode(contentRef.current!);
      onVisibilityChange(isIntersection);
    }
  }, [isIntersection, onVisibilityChange, setNode]);

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
    <div className={classNames('TextIntro', css.root, className, css[layout])}>
      <div
        className={classNames(css.layoutWrapper, { [css.tabletColumnLayout]: layout === TextIntroLayout.HEADER_LEFT })}
      >
        <div className={css.leftColumn}>
          <Eyebrow text={eyebrow} />
          {layout === TextIntroLayout.HEADER_LEFT && <h2 className={css.leftTitle}>{header}</h2>}
        </div>
        <div className={css.rightColumn} ref={contentRef}>
          {layout !== TextIntroLayout.HEADER_LEFT && <h2 className={css.title}>{header}</h2>}
          {subtitle && <p className={css.subtitle}>{subtitle}</p>}
          {description && (
            <p className={css.description} dangerouslySetInnerHTML={{ __html: sanitizer(description) }}></p>
          )}
          {ctaProps && (
            <div className={css.cta}>
              <Cta {...ctaProps} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(TextIntro);
