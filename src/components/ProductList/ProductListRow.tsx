import { FC, memo, MutableRefObject, useRef, useState } from 'react';
import { device } from '@jam3/detect';
import classNames from 'classnames';

import css from './ProductList.module.scss';

import { ContentfulImageAsset } from '@/data/types';

import { Props as LinkProps } from '@/components/BaseLink/BaseLink';
import Cta, { ButtonType } from '@/components/Cta/Cta';

import useLayout from '@/hooks/use-layout';

import ContentfulImage from '../ContentfulImage/ContentfulImage';
import ImageDragAnim from './ImageDragAnim';

export type ProductListRowProps = {
  title: string;
  image: ContentfulImageAsset;
  text: string;
  cta: LinkProps;
};

const ctaText = 'Learn More';

const ProductListRow: FC<ProductListRowProps> = ({ title, image, text, cta }) => {
  const { layout } = useLayout();
  const [showImage, setShowImage] = useState<boolean>(false);
  const itemRef = useRef() as MutableRefObject<HTMLDivElement>;

  const hasHoverEffect = typeof window !== 'undefined' && !layout.mobile && !layout.tablet && !device.touch;

  return (
    <div
      className={classNames(css.item, { [css.hoverable]: hasHoverEffect, [css.active]: showImage })}
      ref={itemRef}
      onMouseEnter={() => setShowImage(true)}
      onMouseLeave={() => setShowImage(false)}
    >
      <div className={css.imageCon}>
        {hasHoverEffect ? (
          <ImageDragAnim image={image} getParentRef={itemRef} handleShowImage={showImage} />
        ) : (
          <div className={css.imageWrapperInner}>
            <ContentfulImage
              className={css.image}
              asset={image}
              useSrcSet={false}
              imageSizeMobile={{ extraGutters: 0, numCols: 4 }}
              imageSizeTablet={{ extraGutters: 0, numCols: 8 }}
              imageSizeDesktop={{ extraGutters: 0, numCols: 12 }}
            />
          </div>
        )}
      </div>
      <div className={css.title}>{title}</div>
      <div className={css.text}>
        {text}
        <Cta
          title={ctaText}
          href={cta?.href}
          theme={ButtonType.Secondary}
          isWhite={true}
          className={css.cta}
          onFocus={() => setShowImage(true)}
          onBlur={() => setShowImage(false)}
        />
      </div>
    </div>
  );
};

export default memo(ProductListRow);
