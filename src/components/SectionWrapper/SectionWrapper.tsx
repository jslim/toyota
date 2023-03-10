import { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';

import css from './SectionWrapper.module.scss';
import Eyebrow from '../Eyebrow/Eyebrow';

import { variants } from '@/data/variants';

export type SectionWrapperProps = {
  className?: string;
  eyebrow?: string;
  title?: string;
  children?: ReactNode;
};

const SectionWrapper: FC<SectionWrapperProps> = ({ className, eyebrow, title, children }) => {
  return (
    <div className={classNames('SectionWrapper', css.root, className)}>
      <div className={css.content}>
        {eyebrow && <Eyebrow className={css.wrapperInfo} text={eyebrow} variant={variants.DARK} />}
        {title && <h2 className={css.title}>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default memo(SectionWrapper);
