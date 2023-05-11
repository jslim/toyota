import { FC, memo, useState } from 'react';
import classnames from 'classnames';

import css from './NextChapter.module.scss';

import { ContentfulImageAsset } from '@/data/types';
import { variants } from '@/data/variants';

import BaseLink from '@/components/BaseLink/BaseLink';
import { Props as LinkProps } from '@/components/BaseLink/BaseLink';
import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';
import Cta, { ButtonType } from '@/components/Cta/Cta';
import Eyebrow from '@/components/Eyebrow/Eyebrow';

import ArrowSvg from '@/components/svgs/svg-arrow.svg';

export type NextChapterProps = {
  className?: string;
  eyebrow: string;
  link: LinkProps;
  image: ContentfulImageAsset;
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
        <ContentfulImage
          className={css.image}
          asset={image}
          imageQuality={50}
          useSrcSet={false}
          imageSizeMobile={{ extraGutters: 0, numCols: 12 }}
          imageSizeTablet={{ extraGutters: 0, numCols: 12 }}
          imageSizeDesktop={{ extraGutters: 0, numCols: 12 }}
          alt=""
        />
      </div>

      <div className={css.wrapper}>
        <div className={css.textWrapper}>
          <Eyebrow className={css.eyebrow} text={eyebrow} variant={variants.DARK} />
          <div className={css.title}>{link.title}</div>
        </div>
        <Cta
          className={css.circle}
          theme={ButtonType.Primary}
          isWhite
          isActive={active}
          setActiveOutside={true}
          aria-hidden={true}
        >
          <ArrowSvg />
        </Cta>
      </div>
    </BaseLink>
  );
};

export default memo(NextChapter);
