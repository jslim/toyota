import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './BiographicHero.module.scss';

import { ContentfulImageAsset, GridSize } from '@/data/types';

import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';

import SvgBiographicHeroBackground from '@/components/svgs/biographic-hero-background.svg';

export type BiographicHeroProps = {
  className?: string;
  title: string;
  description: string;
  asset: ContentfulImageAsset;
  imageQuality: number;
  useSrcSet: boolean;
  imageSizeMobile: string | GridSize;
  imageSizeTablet: string | GridSize;
  imageSizeDesktop: string | GridSize;
  withLazyLoad: boolean;
  withLowResSwap: boolean;
};

const BiographicHero: FC<BiographicHeroProps> = ({
  className,
  title,
  description,
  asset,
  withLazyLoad,
  withLowResSwap
}) => {
  return (
    <div className={classNames('BiographicHero', css.root, className)}>
      <div className={css.backgroundContainer}>
        <SvgBiographicHeroBackground className={css.backgroundImage} />
      </div>

      <div className={css.contentContainer}>
        <div className={css.imageContainer}>
          <ContentfulImage
            asset={asset}
            useSrcSet={true}
            imageQuality={50}
            imageSizeDesktop={'5'}
            imageSizeTablet={'4'}
            imageSizeMobile={'3'}
            withLazyLoad={withLazyLoad}
            withLowResSwap={withLowResSwap}
          />
        </div>
        <div className={css.description}>
          <div className={css.title}>{title}</div>
          <div className={css.eyebrow}>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(BiographicHero);
