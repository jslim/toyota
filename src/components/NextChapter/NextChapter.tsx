import { FC, memo, useState } from 'react';
import classnames from 'classnames';

import css from './NextChapter.module.scss';

import { variants } from '@/data/variants';

import BaseImage from '@/components/BaseImage/BaseImage';
import BaseLink from '@/components/BaseLink/BaseLink';
import { Props as LinkProps } from '@/components/BaseLink/BaseLink';
import Cta, { ButtonType } from '@/components/Cta/Cta';
import Eyebrow from '@/components/Eyebrow/Eyebrow';

import ArrowSvg from '@/components/svgs/svg-arrow.svg';

export type NextChapterProps = {
  className?: string;
  eyebrow: string;
  link: LinkProps;
  image: { src: string; alt: string };
};

const NextChapter: FC<NextChapterProps> = ({ className, eyebrow, image, link }) => {
  const [active, setActive] = useState(false);

  return (
    <BaseLink
      {...link}
      className={classnames('NextChapter', css.root, className)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className={css.imageWrapper}>
        <BaseImage {...image} className={css.image} />
      </div>

      <div className={css.wrapper}>
        <div className={css.textWrapper}>
          <Eyebrow className={css.eyebrow} text={eyebrow} variant={variants.DARK} />
          <div className={css.title}>{link.title}</div>
        </div>
        <Cta className={css.circle} theme={ButtonType.Primary} isWhite isActive={active} setActiveOutside={true}>
          <ArrowSvg />
        </Cta>
      </div>
    </BaseLink>
  );
};

export default memo(NextChapter);
