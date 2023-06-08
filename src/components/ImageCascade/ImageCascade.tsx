import { FC, memo, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import MorphSVGPlugin from 'gsap/dist/MorphSVGPlugin';

import css from './ImageCascade.module.scss';

import resize from '@/services/resize';
import { useLayout } from '@/hooks';

export type ImageCascadeProps = {
  className?: string;
  children: ReactNode;
  isHorizontal?: boolean;
  fill?: string;
  assetLoaded?: boolean;
};

type pathProps = {
  width: number;
  height: number;
  offsetX?: number;
  offsetY?: number;
  initRound?: number;
  horizontal?: boolean;
  divider?: number;
};

const buildPath = ({
  width,
  height,
  offsetX = 0,
  offsetY = 0,
  initRound,
  horizontal = false,
  divider = 1
}: pathProps) => {
  // Top edge starts at 0 so will default to offsetY
  const te = offsetY;

  // Right edge
  const re = width + offsetX;

  // Left edge start at 0 so will default to offsetX
  const le = offsetX;

  // Bottom edge
  const be = height + offsetY;

  // Anchor Offsets
  const aox = width ? 20 / divider : 0;
  const aoy = height ? 20 / divider : 0;

  // Corner Offsets
  let cox, coy;
  if (initRound) {
    cox = width ? initRound : 0;
    coy = height ? initRound : 0;
  } else {
    cox = width ? 48 / divider : 0;
    coy = height ? 48 / divider : 0;
  }

  // Midpoints for our straight "curve" anchors
  const midX = width ? width / 2 + offsetX : re;
  const midY = height ? height / 2 + offsetY : te;

  // Horizontal orientation

  if (horizontal) {
    return MorphSVGPlugin.rawPathToString([
      [
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
      ]
    ]);
  }

  return MorphSVGPlugin.rawPathToString([
    [
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
    ]
  ]);
};

const buildTargets = (width: number, height: number, offset: number, isHorizontal = false, divider = 1) => {
  return [
    buildPath({
      width: width, // Desired width of end shape
      height: height, // Full height of container
      horizontal: isHorizontal,
      divider
    }),
    buildPath({
      width: isHorizontal ? width - offset : width,
      height: isHorizontal ? height : height - offset,
      offsetX: isHorizontal ? offset : 0, // Path coordinates start at top left so we have to translate the shape back to the right edge
      horizontal: isHorizontal,
      divider
    }),
    buildPath({
      width: isHorizontal ? width - offset * 2 : width,
      height: isHorizontal ? height : height - offset * 2,
      offsetX: isHorizontal ? offset * 2 : 0,
      horizontal: isHorizontal,
      divider
    })
  ];
};

const ImageCascade: FC<ImageCascadeProps> = ({
  className,
  children,
  isHorizontal = false,
  fill = 'white',
  assetLoaded
}) => {
  const { layout } = useLayout();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<(SVGPathElement | null)[]>([]);
  const assetRef = useRef<HTMLDivElement>(null);
  const uniqueId = useMemo(() => Math.round(Date.now() * Math.random()).toString(), []);
  const [firstRender, setFirstRender] = useState(true);
  const [targets, setTargets] = useState<Array<string>>([]);
  const isMobile = useMemo(() => {
    return layout.mobile || (layout.tablet && isHorizontal);
  }, [layout.mobile, layout.tablet, isHorizontal]);

  /**
   * Path generation
   */
  const getPathSizes = useCallback(() => {
    const { width, height } = assetRef.current?.getBoundingClientRect() as DOMRect;
    setTargets(buildTargets(width, height, isMobile ? 12 : 24, isHorizontal, isMobile ? 2 : 1));

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
  }, [isHorizontal, isMobile]);

  /**
   * Effect for when we want to generate new target paths.
   */
  useEffect(() => {
    if (!assetLoaded) return;

    if (!targets.length) getPathSizes();

    const resizePath = () => {
      getPathSizes();
    };

    if (!firstRender) {
      resize.listen(resizePath);
    }

    return () => {
      resize.dismiss(resizePath);
    };
  }, [assetLoaded, isMobile, targets, getPathSizes, firstRender]);

  /**
   * Effect for animating and updating paths
   */
  useEffect(() => {
    if (!targets.length) return;

    let tl: GSAPTimeline;

    // Animating on initial render
    if (firstRender) {
      tl = gsap
        .timeline({
          onComplete: () => setFirstRender(false),
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
          0.4
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
          assetRef.current?.getElementsByTagName('img') ?? null,
          {
            ease: 'ease01',
            duration: 3,
            scale: 1.28
          },
          0
        );
    } else {
      // If not initial effect then just set to end point
      gsap.set([panelsRef.current[0], panelsRef.current[1]], {
        morphSVG: { shape: targets[0], type: 'linear' }
      });
      gsap.set(panelsRef.current[2], {
        morphSVG: { shape: targets[1], type: 'linear' }
      });
      gsap.set(panelsRef.current[3], {
        morphSVG: { shape: targets[2], type: 'linear' }
      });
    }

    return () => {
      tl?.clear();
    };
  }, [firstRender, isHorizontal, isMobile, targets]);

  return (
    <div
      className={classNames('ImageCascade', css.root, className, { [css.isHorizontal]: isHorizontal })}
      ref={containerRef}
    >
      <div className={css.wrapper}>
        {assetLoaded && (
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
        )}
        <div className={css.container} ref={assetRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default memo(ImageCascade);
