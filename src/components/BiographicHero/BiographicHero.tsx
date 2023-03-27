import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './BiographicHero.module.scss';

import SvgBiographicHeroBackground from '@/components/svgs/biographic-hero-background.svg';

import BiographicHeroImage from '../../../public/common/assets/images/biographic-hero.png';

export type BiographicHeroProps = {
  className?: string;
};

const BiographicHero: FC<BiographicHeroProps> = ({ className }) => {
  return (
    <div className={classNames('BiographicHero', css.root, className)}>
      <div className={css.backgroundContainer}>
        <SvgBiographicHeroBackground className={css.backgroundImage} />
      </div>

      <div className={css.whiteSpace}></div>

      <div className={css.contentContainer}>
        <div className={css.imageContainer}>
          <img src={BiographicHeroImage.src} className={css.biographyHeroImage} alt="Portrait of James Kuffner" />
        </div>
        <div className={css.description}>
          <div className={css.title}>Dr. James Kuffner</div>
          <div className={css.eyebrow}>
            Chief Executive Officer <br /> Woven Planet Holdings & Executive Advisor, TRI
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BiographicHero);
