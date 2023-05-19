import { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';

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
        {title && <h2 className={css.title}>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default memo(SectionWrapper);
