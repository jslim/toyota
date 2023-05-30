import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './BiographicHero.module.scss';

import { ContentfulImageAsset } from '@/data/types';

import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';

export type BiographicHeroProps = {
  className?: string;
  title: string;
  description: string;
  asset: ContentfulImageAsset;
};

const BiographicHero: FC<BiographicHeroProps> = ({ className, title, description, asset }) => {
  return (
    <div className={classNames('BiographicHero', css.root, className)}>
      <div className={css.overlay}></div>

      <div className={css.contentContainer}>
        <div className={css.rightMobileImage}>
          <div className={css.imageContainer}>
            <ContentfulImage
              className={css.biographyHeroImage}
              asset={asset}
              hasBorderRadius
              imageSizeDesktop={{ numCols: 5, extraGutters: 0 }}
              imageSizeTablet={{ numCols: 4, extraGutters: 0 }}
              imageSizeMobile={{ numCols: 3, extraGutters: 0 }}
            />
          </div>
        </div>
        <div className={css.description}>
          <h1 className={css.title}>{title}</h1>
          <div className={css.eyebrow}>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(BiographicHero);
