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
    const timeline = gsap
      .timeline({
        scrollTrigger: {
          start: 'top 50%',
          trigger: sectionRef.current
        }
      })
      .fadeIn(textWrapperRef.current, { duration: 1, y: 50 })
      .from(containerRef.current, { x: '100%', ease: 'ease2', duration: 1, opacity: 0 }, '-=0.3');

    return () => {
      timeline?.kill();
    };
  }, []);

  return (
    <div className={classNames('LeadershipModule', css.root, className)} ref={sectionRef}>
      <div className={css.container}>
        <div className={css.wrapper}>
          <Eyebrow className={css.eyebrow} text={eyebrow} />
          <div className={css.textWrapper} ref={textWrapperRef}>
            <h2 className={css.title}>{title}</h2>
            {board}
          </div>
        </div>
        <div className={css.swiperWrapper}>
          <div ref={containerRef}>
            {isDesktop && !isCarouselLocked && containerRef.current && <Cursor containerRef={containerRef} />}
            <Swiper
              className={css.carouselContainer}
              autoHeight={false}
              speed={SLIDE_DURATION}
              pagination={{
                el: `.${css.pagination}`,
                type: 'bullets',
                clickable: true
              }}
              slidesPerView={'auto'}
              spaceBetween={30}
              breakpoints={{
                768: {
                  spaceBetween: 46
                },
                1024: {
                  spaceBetween: 22
                }
              }}
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
                      return (
                        <div className={css.cardColumn} key={i}>
                          <LeadershipCard {...item} className={css.card} />
                        </div>
                      );
                    })}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <span className={classNames(css.pagination, { [css.isDisabled]: isCarouselLocked })} />
        </div>
        {!isDesktop && board}
      </div>
    </div>
  );
};

export default memo(LeadershipModule);
