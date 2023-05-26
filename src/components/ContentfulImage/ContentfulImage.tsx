import { forwardRef, ImgHTMLAttributes, memo, useCallback, useEffect, useMemo, useState } from 'react';
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
      useSrcSet = true,
      imageQuality = 80,
      withLazyLoad = true,
      withLowResSwap = false,
      hasBorderRadius,
      imageSizeDesktop = { numCols: 12, extraGutters: 0 },
      imageSizeTablet = { numCols: 8, extraGutters: 0 },
      imageSizeMobile = { numCols: 4, extraGutters: 0 },
      onLoad,
      ...props
    },
    ref
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ) => {
    const [loadImage, setLoadImage] = useState(!(withLazyLoad || withLowResSwap));
    const [setNode, isIntersection] = useIntersectionObserver(true, 0, '-100px');
    const combinedRef = useCombinedRefs(ref, setNode);
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
      console.log(asset.fields.file);
    }, [asset]);

    useEffect(() => {
      if (loadImage) {
        onLoad && onLoad();
      }

      if (!withLazyLoad) setLoadImage(true);
      if (isIntersection) setLoadImage(true);
    }, [loadImage, withLazyLoad, isIntersection, onLoad]);

    const imageUrl = useMemo(() => asset?.fields?.file?.url.replace('//downloads', '//images'), [asset]);
    const imageWidth = useMemo(() => asset?.fields?.file?.details?.image?.width, [asset]);

    const buildSrc = useCallback(
      (width: number, quality = imageQuality) => {
        const dpr = typeof window === 'undefined' ? 1 : Math.min(Math.max(Math.floor(window.devicePixelRatio), 1), 2);
        return `${imageUrl}?q=${quality}&w=${Math.min(width * dpr, 4000)}${isWebpSupported ? '&fm=webp' : ''}`;
      },
      [imageQuality, imageUrl, isWebpSupported]
    );

    const buildSrcSet = useCallback(
      (q: number = imageQuality) => {
        let srcSetString = '';
        const base = 320;
        const hops = Math.floor(imageWidth / base);
        const sizes = [...Array(hops)].map((_, i) => (i + 1) * base);

        /**
         * If true asset size smaller than 1 hop, include its raw imageWidth.
         * Stops us from downsizing images if asset was uploading at same
         * dimensions as target location in component.
         */
        if (sizes.length === 1) sizes.push(imageWidth);
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
          [css.hasBorderRadius]: hasBorderRadius,
          [css.hasFilterBlur]: (withLazyLoad || withLowResSwap) && !loadImage
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
