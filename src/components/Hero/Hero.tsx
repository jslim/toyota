import { FC, memo, useMemo } from 'react';
import classNames from 'classnames';

import css from './Hero.module.scss';

import BaseImage, { BaseImageProps } from '@/components/BaseImage/BaseImage';
import VideoPlayer, { Props as VideoProps } from '@/components/VideoPlayer/VideoPlayer';
import sanitizer from '@/utils/sanitizer';

export enum HeroType {
  Primary = 'primary',
  Secondary = 'secondary',
  Home = 'home',
  Overview = 'overview',
  Detail = 'detail'
}

export type HeroProps = {
  className?: string;
  title?: string;
  image?: BaseImageProps;
  video?: VideoProps;
  theme?: HeroType;
  featured?: { date?: string; cat?: string; title?: string };
};

const Hero: FC<HeroProps> = ({ className, title, image, video, theme = HeroType.Primary, featured }) => {
  const background = useMemo(
    () =>
      video ? (
        <>
          <VideoPlayer
            className={css.videoBg}
            {...video}
            muted={true}
            autoPlay={true}
            poster={image?.src}
            hasControls={false}
            togglePlayOnClick={false}
            hasPlayOnly={true}
          />
        </>
      ) : (
        <BaseImage {...image} />
      ),
    [image, video]
  );
  return (
    <div className={classNames('Hero', css.root, className, css[theme])}>
      {title && theme !== HeroType.Detail && (
        <div className={css.title}>
          <div dangerouslySetInnerHTML={{ __html: sanitizer(title) }} />
        </div>
      )}
      {theme === HeroType.Overview || theme === HeroType.Detail ? (
        <>
          <div className={css.overlay} />
          <div className={css.backgroundWrapper}>{background}</div>
          {featured && (
            <div className={css.featuredItem}>
              <div className={css.featuredTopBar}>
                {featured.date && <span className={css.date}>{featured.date}</span>}
                {featured.cat && <span className={css.cat}>{featured.cat}</span>}
              </div>
              <h2 className={css.featuredTitle}>{featured.title}</h2>
            </div>
          )}
        </>
      ) : (
        /* wrap background inside image cascade */ background
      )}
    </div>
  );
};

export default memo(Hero);
