import { FC, memo, MutableRefObject, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SwiperCore, { A11y, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { device } from '@jam3/detect';

import css from './HistoryTimeline.module.scss';
import { useLayout } from '@/hooks';

import Cursor from '../Cursor/Cursor';
import Eyebrow from '../Eyebrow/Eyebrow';
import HistoryTimelineSlide, { SlideProps } from './HistoryTimelineSlide';

SwiperCore.use([Pagination, A11y]);

gsap.registerPlugin(ScrollTrigger);

const SLIDE_DURATION = 800;
const SWIPE_RATIO = 0.5;

export type HistoryTimelineProps = {
  className?: string;
  eyebrow: string;
  title: string;
  slides: SlideProps[];
};

const HistoryTimeline: FC<HistoryTimelineProps> = ({ className, eyebrow, title, slides }) => {
  const { layout } = useLayout();
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const swiperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const titleRef = useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = useState(0);
  const [swiper, setSwiper] = useState<SwiperCore>();
  const [isDraggable, setDraggable] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);

  const hasHoverEffect = typeof window !== 'undefined' && !layout.mobile && !layout.tablet && !device.touch;

  const handleOnProgress = useCallback((swiper: SwiperCore, progress: SetStateAction<number>) => {
    setSwiper(swiper);
    setSlideProgress(progress);
  }, []);

  useEffect(() => {
    const timeline = gsap
      .timeline({
        scrollTrigger: {
          start: 'top 75%',
          trigger: ref.current
        }
      })
      .fadeIn(titleRef.current?.children, { stagger: 0.05 });

    return () => {
      timeline?.kill();
    };
  }, []);

  return (
    <div className={classNames('HistoryTimeline', css.root, className)} ref={ref}>
      <div className={css.wrapper}>
        <Eyebrow text={eyebrow} />
        <div className={css.titleWrapper} ref={titleRef}>
          <h3 className={css.title}>{title}</h3>
          <div className={css.year}>{slides[swiper?.activeIndex || 0].year}</div>
        </div>
        <div ref={swiperRef}>
          {hasHoverEffect && <Cursor className={css.cursor} containerRef={swiperRef} isDragging={isDraggable} />}
          <Swiper
            className={css.slides}
            slidesPerView={'auto'}
            speed={SLIDE_DURATION}
            watchSlidesProgress={true}
            longSwipesRatio={SWIPE_RATIO}
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            onTouchStart={() => setDraggable(true)}
            onTouchEnd={() => setDraggable(false)}
            onProgress={(swiper, progress) => handleOnProgress(swiper, progress)}
            pagination={{
              el: `.${css.pagination}`,
              type: 'bullets',
              clickable: true
            }}
            preventClicks={true}
            touchStartPreventDefault={false}
            preventClicksPropagation={true}
          >
            {slides.map((item, i) => {
              return (
                <SwiperSlide
                  className={css.slide}
                  key={`slide-${i}`}
                  onFocus={() => {
                    if (!swiper) {
                      return;
                    }
                    // on tab, slide to next/prev slide
                    swiper?.slideTo(i);
                  }}
                >
                  <HistoryTimelineSlide
                    {...item}
                    inProgress={slideProgress}
                    active={activeSlide === i}
                    isDraggable={isDraggable}
                    slide={swiper?.slides[i]}
                    index={i}
                    setImageHeight={setImageHeight}
                    imageHeight={imageHeight}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <span className={css.pagination}>{/* pagination number rendered by swiper */}</span>
      </div>
    </div>
  );
};

export default memo(HistoryTimeline);
