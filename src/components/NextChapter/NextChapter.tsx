import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './NextChapter.module.scss';

import BaseImage from '@/components/BaseImage/BaseImage';
import BaseLink from '@/components/BaseLink/BaseLink';
import { Props as LinkProps } from '@/components/BaseLink/BaseLink';

export type NextChapterProps = {
  className?: string;
  // eyebrow: string;
  link: LinkProps;
  image: { src: string; alt: string };
};

const NextChapter: FC<NextChapterProps> = ({ className, image, link }) => {
  return (
    <BaseLink {...link} className={classNames('NextChapter', css.root, className)}>
      <BaseImage {...image} className={css.image} />

      <div className={css.wrapper}>
        <div className={css.textWrapper}>
          {/* <eyebrow> */}
          <div className={css.title}>{link.title}</div>
        </div>
      </div>
    </BaseLink>
  );
};

export default memo(NextChapter);
