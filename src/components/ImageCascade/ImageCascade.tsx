// @ts-nocheck
import { FC, memo, ReactNode, useEffect, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import MorphSVGPlugin from 'gsap/dist/MorphSVGPlugin';

import css from './ImageCascade.module.scss';

import resize from '@/services/resize';

export type ImageCascadeProps = {
  className?: string;
  children: ReactNode;
  isHorizontal?: boolean;
  fill?: string;
};

type pathProps = {
  width: number;
  height: number;
  offsetX?: number;
  offsetY?: number;
  initRound?: number;
  horizontal?: boolean;
};

const buildPath = ({ width, height, offsetX = 0, offsetY = 0, initRound, horizontal = false }: pathProps) => {
  // Top edge starts at 0 so will default to offsetY
  const te = offsetY;

  // Right edge
  const re = width + offsetX;

  // Left edge start at 0 so will default to offsetX
  const le = offsetX;

  // Bottom edge
  const be = height + offsetY;

  // Anchor Offsets
  const aox = width ? 20 : 0;
  const aoy = height ? 20 : 0;

  // Corner Offsets
  let cox, coy;
  if (initRound) {
    cox = width ? initRound : 0;
    coy = height ? initRound : 0;
  } else {
    cox = width ? 48 : 0;
    coy = height ? 48 : 0;
  }

  // Midpoints for our straight "curve" anchors
  const midX = width ? width / 2 + offsetX : re;
  const midY = height ? height / 2 + offsetY : te;

  // Horizontal orientation

  if (horizontal) {
    return MorphSVGPlugin.rawPathToString([
      re,
      te,
      midX,
      te,
      midX,
      te,
      le + cox,
      te,
      le + aox,
      te,
      le,
      te + aoy,
      le,
      te + coy,
      le,
      midY,
      le,
      midY,
      le,
      be - coy,
      le,
      be - aoy,
      le + aox,
      be,
      le + cox,
      be,
      midX,
      be,
      midX,
      be,
      re,
      be,
      re,
      midY,
      re,
      midY,
      re,
      te
    ]);
  }

  return MorphSVGPlugin.rawPathToString([
    le,
    te,
    le,
    midY,
    le,
    midY,
    le,
    be - coy,
    le,
    be - aoy,
    le + aox,
    be,
    le + cox,
    be,
    midX,
    be,
    midX,
    be,
    re - cox,
    be,
    re - aox,
    be,
    re,
    be - aoy,
    re,
    be - coy,
    re,
    midY,
    re,
    midY,
    re,
    te,
    midX,
    te,
    midX,
    te,
    le,
    te
  ]);
};

const buildTargets = (width: number, height: number, offset: number, isHorizontal = false) => {
  return [
    buildPath({
      width: width, // Desired width of end shape
      height: height, // Full height of container
      horizontal: isHorizontal
    }),
    buildPath({
      width: isHorizontal ? width - offset : width,
      height: isHorizontal ? height : height - offset,
      offsetX: isHorizontal ? offset : 0, // Path coordinates start at top left so we have to translate the shape back to the right edge
      horizontal: isHorizontal
    }),
    buildPath({
      width: isHorizontal ? width - offset * 2 : width,
      height: isHorizontal ? height : height - offset * 2,
      offsetX: isHorizontal ? offset * 2 : 0,
      horizontal: isHorizontal
    })
  ];
};

const ImageCascade: FC<ImageCascadeProps> = ({ className, children, isHorizontal, fill = 'white' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<(SVGPathElement | null)[]>([]);
  const assetRef = useRef<HTMLDivElement | null>(null);
  const uniqueId = parseInt(Date.now() * Math.random()).toString();

  // eslint-disable-next-line sonarjs/cognitive-complexity
  useEffect(() => {
    let targets: string[] = [];

    const getPathSizes = () => {
      const { width, height } = assetRef.current?.getBoundingClientRect() as DOMRect;

      targets = buildTargets(width, height, 24, isHorizontal);

      const startPoint = buildPath({
        width: 0,
        height: isHorizontal ? height : 0,
        offsetX: isHorizontal ? width : width / 2, // Path coordinates start at top left so translating our start line all the way to the right
        offsetY: isHorizontal ? 0 : -height,
        initRound: 97,
        horizontal: isHorizontal
      });

      panelsRef.current.forEach((el) => {
        el?.setAttribute('d', startPoint);
      });
    };

    getPathSizes();
    // animating paths
    gsap
      .timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%'
        }
      })
      .to(
        [panelsRef.current[0], panelsRef.current[1]],
        {
          morphSVG: { shape: targets[0], type: 'linear' },
          ease: isHorizontal ? 'ease01' : 'ease02',
          duration: 1.57
        },
        isHorizontal ? 0 : 0.067
      )
      .to(
        panelsRef.current[2],
        {
          morphSVG: { shape: targets[1], type: 'linear' },
          ease: isHorizontal ? 'ease01' : 'ease02',
          duration: 1.57
        },
        0.5
      )
      .to(
        panelsRef.current[3],
        {
          morphSVG: { shape: targets[2], type: 'linear' },
          ease: isHorizontal ? 'ease01' : 'ease02',
          duration: 1.35
        },
        isHorizontal ? 0.6 : 0.8
      )
      .from(
        assetRef.current.getElementsByTagName('img'),
        {
          ease: 'ease01',
          duration: 3,
          scale: 1.28
        },
        0
      );

    const resizePath = () => {
      getPathSizes();
      gsap.set([panelsRef.current[0], panelsRef.current[1]], {
        morphSVG: { shape: targets[0], type: 'linear' }
      });
      gsap.set(panelsRef.current[2], {
        morphSVG: { shape: targets[1], type: 'linear' }
      });
      gsap.set(panelsRef.current[3], {
        morphSVG: { shape: targets[2], type: 'linear' }
      });
    };

    resize.listen(resizePath);
  }, [isHorizontal]);

  return (
    <div className={classNames('ImageCascade', css.root, className)} ref={containerRef}>
      <div className={css.wrapper}>
        <svg x="0px" y="0px" className={css.svg}>
          <g>
            <clipPath id={`path-${uniqueId}`}>
              <path
                id="start"
                ref={(el) => {
                  panelsRef.current[0] = el;
                }}
              />
            </clipPath>
            <mask id={uniqueId}>
              <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
              {Array.from({ length: 3 }).map((_, index) => (
                <path
                  id={`panel-${index}`}
                  key={index}
                  fill="black"
                  fillOpacity={index === 2 ? '1' : '0.4'}
                  ref={(el) => {
                    panelsRef.current[index + 1] = el;
                  }}
                ></path>
              ))}
            </mask>
            <rect x="0" y="0" width="100%" height="100%" fill={fill} mask={`url(#${uniqueId})`}></rect>
          </g>
        </svg>
        <div className={css.container} ref={assetRef} style={{ clipPath: `url(#path-${uniqueId})` }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default memo(ImageCascade);
