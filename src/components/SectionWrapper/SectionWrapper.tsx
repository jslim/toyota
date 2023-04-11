import { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';

import css from './SectionWrapper.module.scss';

import { variants } from '@/data/variants';

import Eyebrow from '../Eyebrow/Eyebrow';

export type SectionWrapperProps = {
  className?: string;
  eyebrow?: string;
  title?: string;
  children?: ReactNode;
  theme?: variants;
};

const SectionWrapper: FC<SectionWrapperProps> = ({ className, eyebrow, title, children, theme = variants.DARK }) => {
  return (
    <div className={classNames('SectionWrapper', css.root, className, css[theme], 'wrapper')}>
      <div className={css.wrapper}>
        {eyebrow && <Eyebrow className={css.wrapperInfo} text={eyebrow} variant={theme} />}
        {title && <h2 className={css.title}>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default memo(SectionWrapper);
