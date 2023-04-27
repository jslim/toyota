import { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';

import css from './SectionWrapper.module.scss';

import { variants } from '@/data/variants';

import Eyebrow from '@/components/Eyebrow/Eyebrow';

import { Color, getBackgroundColorClass } from '@/utils/colors';

export type SectionWrapperProps = {
  className?: string;
  eyebrow?: string;
  title?: string;
  children?: ReactNode;
  theme?: variants;
  backgroundColor?: Color;
};

const SectionWrapper: FC<SectionWrapperProps> = ({
  className,
  eyebrow,
  title,
  children,
  theme = variants.DARK,
  backgroundColor = Color.DARK_GREY
}) => {
  return (
    <div
      className={classNames(
        'SectionWrapper',
        css.root,
        className,
        css[theme],
        backgroundColor && getBackgroundColorClass(backgroundColor),
        'wrapper'
      )}
    >
      <div className={css.wrapper}>
        {eyebrow && <Eyebrow className={css.wrapperInfo} text={eyebrow} variant={theme} />}
        {title && <h2 className={css.title}>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default memo(SectionWrapper);
