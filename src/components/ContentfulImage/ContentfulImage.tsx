import { forwardRef, ImgHTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import css from './ContentfulImage.module.scss';

import { desktopColumns, desktopWidth, mobileColumns, tabletColumns, tabletWidth } from '@/data/grid';
import { ContentfulImageAsset, GridSize } from '@/data/types';

import useCombinedRefs from '@/hooks/use-combined-refs';
import useIntersectionObserver from '@/hooks/use-intersection-observer';

import { useAppSelector } from '@/redux';

export interface ContentfulImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  asset: ContentfulImageAsset;
  imageQuality: number;
  useSrcSet: boolean;
  imageSizeMobile: string | GridSize;
  imageSizeTablet: string | GridSize;
  imageSizeDesktop: string | GridSize;
  withLazyLoad: boolean;
  withLowResSwap: boolean;
}

const ContentfulImage = forwardRef<HTMLImageElement, ContentfulImageProps>(
  (
    {
      asset,
      className,
      useSrcSet,
      imageQuality,
      withLazyLoad,
      withLowResSwap,
      imageSizeDesktop,
      imageSizeTablet,
      imageSizeMobile,
      ...props
    },
    ref
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ) => {
    const [loadImage, setLoadImage] = useState(!(withLazyLoad || withLowResSwap));
    const rootRef = useRef<HTMLImageElement>(null);
    const combinedRef = useCombinedRefs(ref, rootRef);
    const isIntersection = useIntersectionObserver(rootRef.current);
    const isWebpSupported = useAppSelector((state) => state.isWebpSupported);

    const imageSizeMobileValue = typeof imageSizeMobile === 'object' ? mobileColumns(imageSizeMobile) : imageSizeMobile;
    const imageSizeTabletValue = typeof imageSizeTablet === 'object' ? tabletColumns(imageSizeTablet) : imageSizeTablet;
    const imageSizeDesktopValue =
      typeof imageSizeDesktop === 'object' ? desktopColumns(imageSizeDesktop) : imageSizeDesktop;

    useEffect(() => {
      if (loadImage) return;

      if (!withLazyLoad) setLoadImage(true);
      if (isIntersection) setLoadImage(true);
    }, [loadImage, withLazyLoad, isIntersection]);

    const imageUrl = asset.fields.file.url.replace('//downloads', '//images');
    const imageWidth = asset.fields.file.details.image.width;

    const buildSrc = (width: number, quality = imageQuality) => {
      return `${imageUrl}?q=${quality}&w=${width}${isWebpSupported ? '&fm=webp' : ''}`;
    };

    function buildSrcSet(q: number = imageQuality) {
      let srcSetString = '';
      const base = 320;
      const hops = Math.floor(imageWidth / base);
      const sizes = [...Array(hops)].map((_, i) => (i + 1) * base);
      sizes.forEach((size) => {
        srcSetString += `${buildSrc(size, q)} ${size}w,`;
      });

      return srcSetString;
    }

    if (!asset || !asset.fields || !asset.fields.file) return null;

    return (
      <img
        className={classNames('ContentfulImage', css.root, className)}
        data-src={imageUrl}
        src={
          loadImage ? imageUrl : withLazyLoad ? buildSrc(100, 75) : withLowResSwap ? buildSrc(imageWidth, 20) : imageUrl
        }
        srcSet={useSrcSet && loadImage ? buildSrcSet() : withLowResSwap ? buildSrcSet(15) : undefined}
        alt={asset.fields.description || asset.fields.title}
        sizes={`(min-width: ${desktopWidth}) ${imageSizeDesktopValue}, (min-width: ${tabletWidth}) ${imageSizeTabletValue}, ${imageSizeMobileValue}`}
        ref={combinedRef}
        {...props}
      />
    );
  }
);

ContentfulImage.displayName = 'ContentfulImage';

export default memo(ContentfulImage);
