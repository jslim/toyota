import { FC, memo, ReactNode, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

import css from './ImageCascade.module.scss';

export type ImageCascadeProps = {
  className?: string;
  children: ReactNode;
  isSide?: boolean;
};

const ImageCascade: FC<ImageCascadeProps> = ({ className, children, isSide }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const imageRef = useRef<HTMLDivElement | null>(null);

  const buildPath = (height: number, width: number) => {
    const anchorOffsetX = 20;
    const anchorOffsetY = 20;
    const cornerOffset = 48;
    const desiredHeight = height;
    const desiredWidth = width;
    const offsetX = 0;

    return MorphSVGPlugin.rawPathToString([
      [
        offsetX,
        0,
        offsetX,
        0,
        offsetX,
        0,
        offsetX,
        desiredHeight - cornerOffset,
        offsetX,
        desiredHeight - cornerOffset + anchorOffsetY,
        anchorOffsetX + offsetX,
        desiredHeight,
        cornerOffset + offsetX,
        desiredHeight,
        desiredHeight,
        desiredHeight,
        desiredHeight,
        desiredHeight,
        desiredWidth - cornerOffset,
        desiredHeight,
        desiredWidth - anchorOffsetX,
        desiredHeight,
        desiredWidth,
        desiredHeight - cornerOffset + anchorOffsetY,
        desiredWidth,
        desiredHeight - cornerOffset,
        desiredWidth,
        0,
        desiredWidth,
        0,
        desiredWidth,
        0,
        desiredWidth / 2,
        0,
        desiredWidth / 2,
        0,
        offsetX,
        0
      ]
    ]);
  };

  useEffect(() => {
    const { width, height } = imageRef.current?.querySelector('img')?.getBoundingClientRect() as DOMRect;
    setDimensions({ width, height }); // setting dimensions to be used in the svg wrapper
    const targets = [buildPath(height, width), buildPath(height - 30, width), buildPath(height - 60, width)];

    gsap
      .timeline({ repeat: -1, yoyo: false })
      .to(['#start', '#first-panel'], {
        morphSVG: {
          shape: targets[0],
          type: 'linear',
          origin: '50% 100%' //or "20% 60%,35% 90%" if there are different values for the start and end shapes.
        },
        ease: 'power2',
        duration: 1.6
      })
      .to(
        '#second-panel',
        {
          morphSVG: {
            shape: targets[1],
            type: 'linear',
            origin: '50% 100%' //or "20% 60%,35% 90%" if there are different values for the start and end shapes.
          }, // needs to be mid2, slightly smaller
          ease: 'power2',
          duration: 1.6
        },
        0.5
      )
      .to(
        '#third-panel',
        {
          morphSVG: {
            shape: targets[2],
            type: 'linear',
            origin: '50% 100%' //or "20% 60%,35% 90%" if there are different values for the start and end shapes.
          }, // needs to be mid2, slightly smaller
          ease: 'power2',
          duration: 1.6
        },
        1
      );
  }, []);

  return (
    <div className={classNames('ImageCascade', css.root, className, { [css.side]: isSide })}>
      <div className={css.wrapper} style={{ width: dimensions.width, height: dimensions.height }}>
        <svg x="0px" y="0px" id="mysvg">
          <g>
            <clipPath id="clipPaththing">
              <path
                d="M0,0 C0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 400,0 400,0 400,0 400,0 400,0 400,0 400,0 400,0 400,0 400,0 200,0 200,0 0,0 0,0 0,0 0,0 "
                id="start"
              />
            </clipPath>
            <mask id="mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
              <path
                d="M100,0 C100,0 100,0 100,-48 100,-28 120,0 148,0 0,0 0,0 252,0 280,0 300,-28 300,-48 300,0 300,0 300,0 150,0 150,0 100,0"
                id="first-panel"
                fill="black"
                fillOpacity="0.4"
              />
              <path
                d="M100,0 C100,0 100,0 100,-48 100,-28 120,0 148,0 0,0 0,0 252,0 280,0 300,-28 300,-48 300,0 300,0 300,0 150,0 150,0 100,0"
                id="second-panel"
                fill="black"
                fillOpacity="0.4"
              />
              <path
                d="M100,0 C100,0 100,0 100,-48 100,-28 120,0 148,0 0,0 0,0 252,0 280,0 300,-28 300,-48 300,0 300,0 300,0 150,0 150,0 100,0 "
                id="third-panel"
                fill="black"
              />
            </mask>
            <rect x="0" y="0" width="100%" height="100%" fill="white" mask="url(#mask)"></rect>
          </g>
        </svg>
        <div className={css.container} ref={imageRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default memo(ImageCascade);
