import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './BiographicHero.module.scss';

import SvgBiographicHeroBackground from '@/components/svgs/biographic-hero-background.svg';

import BiographicHeroImage from '../../../public/common/assets/images/biographic-hero.png';

export type BiographicHeroProps = {
  className?: string;
  title: string;
  description: string;
};

const BiographicHero: FC<BiographicHeroProps> = ({ className, title, description }) => {
  return (
    <div className={classNames('BiographicHero', css.root, className)}>
      <div className={css.backgroundContainer}>
        <SvgBiographicHeroBackground className={css.backgroundImage} />
      </div>

      <div className={css.contentContainer}>
        <div className={css.imageContainer}>
          <img src={BiographicHeroImage.src} className={css.biographyHeroImage} alt="Portrait of James Kuffner" />
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
