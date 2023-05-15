import { FC, memo, useMemo, useState } from 'react';
import classNames from 'classnames';

import css from './Hero.module.scss';

import { ContentfulImageAsset } from '@/data/types';

import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';
import ImageCascade from '@/components/ImageCascade/ImageCascade';
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
  image: ContentfulImageAsset;
  video?: VideoProps;
  theme?: HeroType;
  featured?: { date?: string; cat?: string; title?: string };
};

const Hero: FC<HeroProps> = ({ className, title, image, video, theme = HeroType.Primary, featured }) => {
  const [assetLoaded, setAssetLoaded] = useState(false);

  const background = useMemo(
    () =>
      video ? (
        <VideoPlayer
          className={css.videoBg}
          {...video}
          muted={true}
          autoPlay={true}
          poster={image?.fields.file.url}
          hasControls={false}
          togglePlayOnClick={false}
          hasPlayOnly={true}
          loop={true}
          onLoad={() => setAssetLoaded(true)}
        />
      ) : (
        <ContentfulImage asset={image} onLoad={() => setAssetLoaded(true)} />
      ),
    [image, video]
  );
  return (
    <div className={classNames('Hero', css.root, className, css[theme])}>
      {title && theme !== HeroType.Detail && (
        <h1 className={css.title}>
          <div dangerouslySetInnerHTML={{ __html: sanitizer(title) }} />
        </h1>
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
        <ImageCascade className={css.cascade} assetLoaded={assetLoaded}>
          {background}
        </ImageCascade>
      )}
    </div>
  );
};

export default memo(Hero);
