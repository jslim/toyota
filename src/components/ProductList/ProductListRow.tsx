import { FC, memo, MutableRefObject, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';

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

  useEffect(() => {
    gsap.from(itemRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      scrollTrigger: { start: 'top 85%', trigger: itemRef.current },
      ease: 'ease1'
    });
  }, []);

  return (
    <div
      className={classNames({ [css.active]: isHovering })}
      ref={itemRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={css.item}>
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
    </div>
  );
};

export default memo(ProductListRow);
