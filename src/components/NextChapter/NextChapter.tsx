import { FC, memo } from 'react';
import classnames from 'classnames';

import css from './NextChapter.module.scss';

import BaseImage from '@/components/BaseImage/BaseImage';
import BaseLink from '@/components/BaseLink/BaseLink';
import { Props as LinkProps } from '@/components/BaseLink/BaseLink';

export type NextChapterProps = {
  className?: string;
  eyebrow: string;
  link: LinkProps;
  image: { src: string; alt: string };
};

const NextChapter: FC<NextChapterProps> = ({ className, image, link }) => {
  return (
    <BaseLink {...link} className={classnames('NextChapter', css.root, className)}>
      <BaseImage {...image} className={css.image} />

      <div className={css.wrapper}>
        <div className={css.textWrapper}>
          {/* <Eyebrow  /> */}
          <div className={css.title}>{link.title}</div>
        </div>

        <div className={classnames(css.circle, css.isWhite)}>{<div className={css.dot} />}</div>
      </div>
    </BaseLink>
  );
};

export default memo(NextChapter);
