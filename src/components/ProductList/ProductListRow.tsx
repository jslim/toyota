import { FC, memo, MutableRefObject, useRef, useState } from 'react';
import classNames from 'classnames';

import css from './ProductList.module.scss';

import { ContentfulImageAsset } from '@/data/types';

import { Props as LinkProps } from '@/components/BaseLink/BaseLink';
import Cta, { ButtonType } from '@/components/Cta/Cta';

import { useAppSelector } from '@/redux';

import ImageDragAnim from './ImageDragAnim';

export type ProductListRowProps = {
  title: string;
  image: ContentfulImageAsset;
  text: string;
  cta: LinkProps;
};

const ProductListRow: FC<ProductListRowProps> = ({ title, image, text, cta }) => {
  const { learnMore } = useAppSelector((state) => state.activeGlobalStrings);
  const [isHovering, setIsHovering] = useState<boolean | null>(null);
  const itemRef = useRef() as MutableRefObject<HTMLDivElement>;

  return (
    <div
      className={classNames(css.item, { [css.active]: isHovering })}
      ref={itemRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={css.imageCon}>
        <ImageDragAnim image={image} getParentRef={itemRef} handleHover={isHovering} />
      </div>
      <div className={css.title}>{title}</div>
      <div className={css.text}>
        {text}
        <Cta
          title={learnMore}
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
