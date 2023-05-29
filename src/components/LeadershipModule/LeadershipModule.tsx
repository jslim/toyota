import { FC, memo, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import SwiperCore, { A11y, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import css from './LeadershipModule.module.scss';

import Cursor from '@/components/Cursor/Cursor';
import Eyebrow from '@/components/Eyebrow/Eyebrow';
import LeadershipCard, { LeadershipCardProps } from '@/components/LeadershipCard/LeadershipCard';

import { useLayout } from '@/hooks';

export type directorsProps = {
  list: {
    name: string;
    role: string;
  }[];
  label: string;
};

export type LeadershipModuleProps = {
  className?: string;
  eyebrow: string;
  title: string;
  slides: LeadershipCardProps[];
  directors: directorsProps;
};

SwiperCore.use([Pagination, A11y]);
const SLIDE_DURATION = 450;

const LeadershipModule: FC<LeadershipModuleProps> = ({ className, eyebrow, title, slides, directors }) => {
  const textWrapperRef = useRef<HTMLDivElement | null>(null);
  const { layout } = useLayout();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [isCarouselLocked, setIsCarouselLocked] = useState(false);

  const isDesktop = useMemo(() => {
    return !(typeof window !== 'undefined' && (layout.mobile || layout.tablet));
  }, [layout.mobile, layout.tablet]);
  const pairsArray = useMemo(() => {
    let pairs = [];
    for (let i = 0; i < slides.length; i += 2) {
      // Create a new array with the current item and the next item
      const pair = [slides[i], slides[i + 1]];
      pairs.push(pair);
    }

    return pairs;
  }, [slides]);

  const board = useMemo(() => {
    return (
      <div className={css.board}>
        <div className={css.label}>{directors.label}</div>
        <ul className={css.list}>
          {directors.list.map((item, index) => {
            return (
              <li className={css.listItem} key={index}>
                <div className={css.name}>{item.name}</div>
                <div className={css.role}>{item.role}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }, [directors.label, directors.list]);

  useEffect(() => {
    const timeline = gsap.timeline().fadeIn(textWrapperRef.current, { duration: 1, y: 50, delay: 1.75 });

    return () => {
      timeline?.kill();
    };
  }, []);

  return (
    <div className={classNames('LeadershipModule', css.root, className)} ref={sectionRef}>
      <div className={css.wrapper}>
        <Eyebrow className={css.eyebrow} text={eyebrow} />
        <div className={css.textWrapper} ref={textWrapperRef}>
          <h2 className={css.title}>{title}</h2>
          {board}
        </div>
      </div>

      <div className={css.container}>
        <div className={css.swiperWrapper} ref={containerRef}>
          {isDesktop && !isCarouselLocked && containerRef.current && <Cursor containerRef={containerRef} />}
          <Swiper
            className={css.carouselContainer}
            autoHeight={true}
            speed={SLIDE_DURATION}
            pagination={{
              el: `.${css.pagination}`,
              type: 'bullets',
              clickable: true
            }}
            slidesPerView={'auto'}
            spaceBetween={30}
            slidesOffsetAfter={180}
            breakpoints={{
              768: {
                spaceBetween: 46,
                slidesOffsetAfter: 500
              },
              1024: {
                spaceBetween: 22,
                autoHeight: false,
                slidesOffsetAfter: 0
              }
            }}
            freeMode={true}
            onLock={(_swiper) => {
              setIsCarouselLocked(true);
            }}
            onUnlock={(_swiper) => {
              setIsCarouselLocked(false);
            }}
            watchSlidesProgress={true}
          >
            {pairsArray.map((pair, i) => {
              return (
                <SwiperSlide className={css.slide} key={`slide-${i}`}>
                  {pair.map((item, i) => {
                    if (item == null) return null;
                    return <LeadershipCard {...item} key={i} className={css.card} />;
                  })}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <span className={classNames(css.pagination, { [css.isDisabled]: isCarouselLocked })} />
        {!isDesktop && board}
      </div>
    </div>
  );
};

export default memo(LeadershipModule);
