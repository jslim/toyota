import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './BiographicHero.module.scss';

import { ContentfulImageAsset } from '@/data/types';

import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';

import SvgBiographicHeroBackground from '@/components/svgs/biographic-hero-background.svg';

export type BiographicHeroProps = {
  className?: string;
  title: string;
  description: string;
  asset: ContentfulImageAsset;
};

const BiographicHero: FC<BiographicHeroProps> = ({ className, title, description, asset }) => {
  return (
    <div className={classNames('BiographicHero', css.root, className)}>
      <div className={css.backgroundContainer}>
        <SvgBiographicHeroBackground className={css.backgroundImage} />
      </div>

      <div className={css.contentContainer}>
        <div className={css.rightMobileImage}>
          <div className={css.imageContainer}>
            <ContentfulImage className={css.biographyHeroImage} asset={asset} />
          </div>
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
