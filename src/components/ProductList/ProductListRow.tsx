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
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const itemRef = useRef() as MutableRefObject<HTMLDivElement>;

  const hasHoverEffect = typeof window !== 'undefined' && !layout.mobile && !layout.tablet && !device.touch;

  return (
    <div
      className={classNames(css.item, { [css.hoverable]: hasHoverEffect, [css.active]: isHovering })}
      ref={itemRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={css.imageCon}>
        {hasHoverEffect ? (
          <ImageDragAnim image={image} getParentRef={itemRef} handleHover={isHovering} />
        ) : (
          <div className={css.imageWrapperInner}>
            <ContentfulImage
              className={css.image}
              asset={image}
              imageSizeMobile={{ extraGutters: 0, numCols: 3 }}
              imageSizeTablet={{ extraGutters: 0, numCols: 4 }}
              imageSizeDesktop={{ extraGutters: 0, numCols: 4 }}
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
          onFocus={() => setIsHovering(true)}
          onBlur={() => setIsHovering(false)}
        />
      </div>
    </div>
  );
};

export default memo(ProductListRow);
