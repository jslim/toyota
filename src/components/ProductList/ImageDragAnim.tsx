import { FC, memo, MutableRefObject, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';

import css from './ProductList.module.scss';

import { ContentfulImageAsset } from '@/data/types';

import ContentfulImage from '../ContentfulImage/ContentfulImage';

export type ImageDragProps = {
  className?: string;
  getParentRef: MutableRefObject<HTMLDivElement>;
  image: ContentfulImageAsset;
  handleShowImage: Boolean;
};

const EASE = 'power3.out';

const ImageDrag: FC<ImageDragProps> = ({ className, image, getParentRef, handleShowImage }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperInnerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    handleShowImage ? showImage() : hideImage();
  }, [handleShowImage]);

  const showImage = () => {
    gsap.to(wrapperInnerRef.current, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.6,
      ease: EASE
    });

    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.6,
      ease: EASE
    });
  };

  const hideImage = () => {
    gsap.to(wrapperInnerRef.current, {
      scale: 0.5,
      duration: 0.6,
      autoAlpha: 0,
      ease: EASE
    });
    gsap.to(imageRef.current, {
      scale: 1.5,
      duration: 0.6,
      ease: EASE
    });
  };

  useEffect(() => {
    if (!handleShowImage) return;
    const hoverRef = getParentRef.current;
    const parentBounds = hoverRef.getBoundingClientRect();
    let oldx = 0;
    let oldy = 0;
    let dirX = 1;
    let dirY = 1;
    const offset = 50;
    const rotateMult = 0.15;

    const detectDirection = (e: MouseEvent) => {
      dirX = e.pageX < oldx ? -1 : 1;
      dirY = e.pageY < oldy ? -1 : 1;

      oldx = e.pageX;
      oldy = e.pageY;
      return { x: dirX, y: dirY };
    };

    const updateImagePos = (e: MouseEvent) => {
      const dir = detectDirection(e);
      const speed = Math.abs(e.movementX);
      const rotation = dir.x < 0 ? -speed * rotateMult : speed * rotateMult;
      const moveX = ((e.clientX - parentBounds.left) / parentBounds.width) * offset - offset / 2;
      const moveY = ((e.clientY - parentBounds.top) / parentBounds.height) * offset - offset / 2;

      //   move image based on mousemove
      gsap.to(wrapperRef.current, {
        duration: 1,
        overwrite: 'auto',
        x: moveX,
        y: moveY,
        rotationZ: rotation,
        ease: 'sine.out'
      });
    };

    document.addEventListener('mousemove', updateImagePos);

    return () => {
      document.removeEventListener('mousemove', updateImagePos);
    };
  }, [wrapperRef, getParentRef, handleShowImage]);

  return (
    <div className={classNames(css.imageWrapper, className)} ref={wrapperRef}>
      <div className={css.imageWrapperInner} ref={wrapperInnerRef}>
        <ContentfulImage
          className={css.image}
          asset={image}
          ref={imageRef}
          imageSizeMobile={{ extraGutters: 0, numCols: 3 }}
          imageSizeTablet={{ extraGutters: 0, numCols: 3 }}
          imageSizeDesktop={{ extraGutters: 0, numCols: 4 }}
        />
      </div>
    </div>
  );
};

export default memo(ImageDrag);
