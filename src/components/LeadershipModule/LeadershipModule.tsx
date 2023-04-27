import { FC, memo, useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import SwiperCore, { A11y, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import css from './LeadershipModule.module.scss';

import DraggableColumns from '@/components/DraggableColumns/DraggableColumns';
import Eyebrow from '@/components/Eyebrow/Eyebrow';
import LeadershipCard, { LeadershipCardProps } from '@/components/LeadershipCard/LeadershipCard';

import { useLayout } from '@/hooks';

type directorsProps = {
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
  description: string;
  slides: LeadershipCardProps[];
  directors: directorsProps;
  dragLabel: string;
};

SwiperCore.use([Pagination, A11y]);
const SLIDE_DURATION = 450;

const LeadershipModule: FC<LeadershipModuleProps> = ({
  className,
  eyebrow,
  title,
  description,
  slides,
  dragLabel,
  directors
}) => {
  const textWrapperRef = useRef<HTMLDivElement | null>(null);
  const { layout } = useLayout();
  const isDesktop = useMemo(() => {
    return !(layout.mobile || layout.tablet);
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
    <div className={classNames('LeadershipModule', css.root, className)}>
      <div className={css.wrapper}>
        <Eyebrow className={css.eyebrow} text={eyebrow} />
        <div className={css.textWrapper} ref={textWrapperRef}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.description}>{description}</p>
          {board}
        </div>
      </div>

      {!isDesktop ? (
        <div className={css.container}>
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
            slidesOffsetAfter={600}
            breakpoints={{
              768: {
                spaceBetween: 46
              }
            }}
          >
            {pairsArray.map((pair, i) => {
              return (
                <SwiperSlide className={css.slide} key={`slide-${i}`}>
                  {pair.map((item, i) => {
                    return <LeadershipCard {...item} key={i} className={css.card} />;
                  })}
                </SwiperSlide>
              );
            })}
          </Swiper>
          <span className={css.pagination}></span>
          {board}
        </div>
      ) : (
        <DraggableColumns cards={slides} dragLabel={dragLabel} className={css.columns} />
      )}
    </div>
  );
};

export default memo(LeadershipModule);
