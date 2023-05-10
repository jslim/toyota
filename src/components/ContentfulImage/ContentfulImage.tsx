import { forwardRef, ImgHTMLAttributes, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import css from './ContentfulImage.module.scss';

import { desktopColumns, desktopWidth, mobileColumns, tabletColumns, tabletWidth } from '@/data/grid';
import { ContentfulImageAsset, GridSize } from '@/data/types';

import useCombinedRefs from '@/hooks/use-combined-refs';
import useIntersectionObserver from '@/hooks/use-intersection-observer';

import { useAppSelector } from '@/redux';

export interface ContentfulImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  asset: ContentfulImageAsset;
  imageQuality?: number;
  useSrcSet?: boolean;
  imageSizeMobile?: string | GridSize;
  imageSizeTablet?: string | GridSize;
  imageSizeDesktop?: string | GridSize;
  withLazyLoad?: boolean;
  withLowResSwap?: boolean;
  hasBorderRadius?: boolean;
  onLoad?: () => void;
}

const ContentfulImage = forwardRef<HTMLImageElement, ContentfulImageProps>(
  (
    {
      asset,
      className,
      useSrcSet = false,
      imageQuality = 50,
      withLazyLoad = false,
      withLowResSwap = false,
      hasBorderRadius,
      imageSizeDesktop = { numCols: 12, extraGutters: 0 },
      imageSizeTablet = { numCols: 12, extraGutters: 0 },
      imageSizeMobile = { numCols: 12, extraGutters: 0 },
      onLoad,
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

    const imageSizeMobileValue = useMemo(
      () => (typeof imageSizeMobile === 'object' ? mobileColumns(imageSizeMobile) : imageSizeMobile),
      [imageSizeMobile]
    );
    const imageSizeTabletValue = useMemo(
      () => (typeof imageSizeTablet === 'object' ? tabletColumns(imageSizeTablet) : imageSizeTablet),
      [imageSizeTablet]
    );
    const imageSizeDesktopValue = useMemo(
      () => (typeof imageSizeDesktop === 'object' ? desktopColumns(imageSizeDesktop) : imageSizeDesktop),
      [imageSizeDesktop]
    );

    useEffect(() => {
      if (loadImage) {
        onLoad && onLoad();
        return;
      }

      if (!withLazyLoad) setLoadImage(true);
      if (isIntersection) setLoadImage(true);
    }, [loadImage, withLazyLoad, isIntersection, onLoad]);

    const imageUrl = useMemo(() => asset.fields.file.url.replace('//downloads', '//images'), [asset.fields.file.url]);
    const imageWidth = useMemo(() => asset.fields.file.details.image.width, [asset.fields.file.details.image]);

    const buildSrc = useCallback(
      (width: number, quality = imageQuality) => {
        return `${imageUrl}?q=${quality}&w=${width}${isWebpSupported ? '&fm=webp' : ''}`;
      },
      [imageQuality, imageUrl, isWebpSupported]
    );

    const buildSrcSet = useCallback(
      (q: number = imageQuality) => {
        let srcSetString = '';
        const base = 320;
        const hops = Math.floor(imageWidth / base);
        const sizes = [...Array(hops)].map((_, i) => (i + 1) * base);
        sizes.forEach((size) => {
          srcSetString += `${buildSrc(size, q)} ${size}w,`;
        });

        return srcSetString;
      },
      [buildSrc, imageQuality, imageWidth]
    );

    if (!asset || !asset.fields || !asset.fields.file) return null;

    return (
      <img
        className={classNames('ContentfulImage', css.root, className, {
          [css.hasBorderRadius]: hasBorderRadius
        })}
        data-src={imageUrl}
        src={
          loadImage ? imageUrl : withLazyLoad ? buildSrc(100, 75) : withLowResSwap ? buildSrc(imageWidth, 20) : imageUrl
        }
        srcSet={useSrcSet && loadImage ? buildSrcSet() : withLowResSwap ? buildSrcSet(15) : undefined}
        alt={asset.fields.description || asset.fields.title}
        sizes={
          useSrcSet
            ? `(min-width: ${desktopWidth}) ${imageSizeDesktopValue}, (min-width: ${tabletWidth}) ${imageSizeTabletValue}, ${imageSizeMobileValue}`
            : undefined
        }
        ref={combinedRef}
        {...props}
      />
    );
  }
);

ContentfulImage.displayName = 'ContentfulImage';

export default memo(ContentfulImage);
