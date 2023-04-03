import { FC, memo, MutableRefObject, useRef, useState } from 'react';
import classNames from 'classnames';
import { device } from '@jam3/detect';

import css from './ProductList.module.scss';
import ImageDragAnim from './ImageDragAnim';

import useLayout from '@/hooks/use-layout';

import BaseImage, { BaseImageProps } from '@/components/BaseImage/BaseImage';
import Cta, { ButtonType } from '@/components/Cta/Cta';
import { Props as LinkProps } from '@/components/BaseLink/BaseLink';

export type ProductListRowProps = {
  title: string;
  image: BaseImageProps;
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
            <BaseImage className={css.image} {...image} />
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
