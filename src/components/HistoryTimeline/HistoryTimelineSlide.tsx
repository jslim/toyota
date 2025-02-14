import { Dispatch, FC, memo, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';
import { ExpoScaleEase } from 'gsap/dist/EasePack';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SwiperCore from 'swiper';

import css from './HistoryTimeline.module.scss';

import { CardProps } from '@/components/Card/Card';
import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';
import Cta, { ButtonType } from '@/components/Cta/Cta';

import resize from '@/services/resize';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ExpoScaleEase);

export type SlideProps = CardProps & {
  year: string;
  inProgress?: number;
  isDraggable?: boolean;
  active?: boolean;
  slide?: HTMLElement;
  index?: number;
  imageHeight?: number;
  setImageHeight?: Dispatch<SetStateAction<number>>;
};

const HistorySlide: FC<SlideProps> = ({
  year,
  isDraggable,
  active,
  inProgress,
  slide,
  index = 0,
  imageHeight,
  setImageHeight,
  ...item
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const tl = useRef() as MutableRefObject<GSAPTimeline>;
  const tlProgressBar = useRef() as MutableRefObject<GSAPTimeline>;
  const [firstRender, setFirstRender] = useState(true);
  const [progressStep, setProgressStep] = useState<number>(0);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      index === 0 && setImageHeight && imageRef.current && setImageHeight(imageRef.current?.offsetHeight);
    };
    handleResize();

    resize.listen(handleResize);

    return () => {
      resize.dismiss(handleResize);
    };
  }, [imageRef, setImageHeight, index]);

  useEffect(() => {
    if (!firstRender) return;

    const initTL = () => {
      tlProgressBar.current = gsap
        .timeline({
          paused: true
        })
        .from([progressRef.current?.children[2]], {
          scaleX: 0,
          duration: 0.8,
          ease: 'linear'
        });
      tl.current = gsap
        .timeline({
          paused: true
        })
        .to([progressRef.current?.children[0]], {
          x: 0,
          duration: 0.66,
          ease: 'linear'
        })
        .from(
          itemRef.current,
          {
            scale: 0.7,
            duration: 0.66,
            ease: 'linear'
          },
          '-=0.66'
        )
        .from([itemRef.current?.children[1]], { duration: 0.66, opacity: 0.4, ease: 'linear' }, '-=0.66')
        .from(
          [imageRef.current?.children],
          {
            opacity: 0.2,
            duration: 0.66,
            ease: 'linear'
          },
          '-=0.66'
        );
      if (active) {
        tl.current.progress(1);
        tlProgressBar.current.progress(1);
      } else {
        tl.current.progress(0);
      }
    };
    initTL();
  }, [firstRender, active]);

  useEffect(() => {
    if (firstRender) {
      return;
    }
    let progress = parseFloat((slide as unknown as SwiperCore).progress.toFixed(2));
    // last slide progress max is less than 1, so we need to refactor progress step
    // for timeline progress to go from 0 to 1
    if (!progressStep) {
      setProgressStep(index ? progress / -index : 1);
    }
    progress = parseFloat(((1 / progressStep) * (progress - progressStep) + 1).toFixed(2));

    if (progress > 0) {
      // when swiped left/prev from active
      // animate out
      if (isDraggable) {
        tl.current.progress(1 - progress).pause();
      } else if (!active) {
        tlProgressBar.current.progress(1).pause();
        tl.current.reverse();
      }
    } else if (progress < -0.01 && progress >= -2) {
      // when swiped left/prev from not-active/next
      // animate in
      if (isDraggable) {
        tl.current.progress(1 - progress * -1).pause();
        tlProgressBar.current.progress(1 + progress).pause();
      } else {
        tlProgressBar.current.reverse();
        tl.current.reverse();
      }
    } else if (progress < -2) {
      // force all next/right side slides out of view be in progress 0
      // this way when clicked on pagination, animation will start from 0
      // delay is for swiper to move current slide out of view and then put progress 0
      setTimeout(() => {
        tl.current.progress(0).pause();
      }, 500);
    } else {
      // if clicking pagination or releasing drag, let the slide play animation naturally
      tlProgressBar.current.play();
      tl.current.play();
    }
  }, [tl, tlProgressBar, firstRender, index, progressStep, inProgress, active, isDraggable, slide]);

  return (
    <div className={css.item}>
      <div ref={itemRef}>
        <div ref={imageRef} className={css.imageWrapper}>
          <ContentfulImage
            asset={item.image}
            className={css.image}
            imageSizeDesktop={{ numCols: 7, extraGutters: 0 }}
            imageSizeTablet={{ numCols: 6, extraGutters: 0 }}
          />
        </div>
        <div className={css.textWrapper}>
          {item.title && <span className={css.eyebrow}>{item.title}</span>}
          <p className={css.text}>{item.text}</p>
          {item.cta && <Cta {...item.cta} className={css.cta} theme={ButtonType.Secondary} />}
        </div>
      </div>
      <div
        className={css.progress}
        style={{ top: imageHeight && imageHeight / 2 }}
        ref={progressRef}
        aria-hidden={true}
      >
        <span className={classNames(css.dot, css.left)} />
        <span className={classNames(css.dot, css.right)} />
        <span className={css.progressBar} />
      </div>
    </div>
  );
};

export default memo(HistorySlide);
