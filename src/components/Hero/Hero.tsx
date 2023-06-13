import { FC, memo, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import css from './Hero.module.scss';

import { ContentfulImageAsset } from '@/data/types';

import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';
import ImageCascade from '@/components/ImageCascade/ImageCascade';
import VideoPlayer, { Props as VideoProps } from '@/components/VideoPlayer/VideoPlayer';

import { useLayout } from '@/hooks';
import sanitizer from '@/utils/sanitizer';

import BaseLink from '../BaseLink/BaseLink';

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
  mobileImage?: ContentfulImageAsset;
  video?: VideoProps;
  theme?: HeroType;
  featured?: { date?: string; cat?: string; title?: string; href?: string };
};

const Hero: FC<HeroProps> = ({ className, title, image, mobileImage, video, theme = HeroType.Primary, featured }) => {
  const { layout } = useLayout();
  const mobile = typeof window !== 'undefined' && layout.mobile;

  const [loadImage, setLoadImage] = useState(false);
  useEffect(() => {
    if (loadImage) {
      return;
    }
    setLoadImage(true);
  }, [loadImage]);
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
          playsInline={true}
        />
      ) : (
        loadImage && (
          <ContentfulImage
            asset={mobile && mobileImage ? mobileImage : image}
            onLoad={() => setAssetLoaded(true)}
            withLazyLoad={false}
            withLowResSwap={false}
          />
        )
      ),
    [image, video, mobile, mobileImage, loadImage]
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
            <BaseLink href={featured.href}>
              <div className={css.featuredItem}>
                <div className={css.featuredTopBar}>
                  {featured.date && <span className={css.date}>{featured.date}</span>}
                  {featured.cat && <span className={css.cat}>{featured.cat}</span>}
                </div>
                <h2 className={css.featuredTitle}>{featured.title}</h2>
              </div>
            </BaseLink>
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
