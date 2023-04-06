import { FC, memo, useRef, useState } from 'react';
import classNames from 'classnames';
import { A11y, Controller, Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import css from './DraggableColumns.module.scss';

import Cursor from '../Cursor/Cursor';
import LeadershipCard, { LeadershipCardProps } from '../LeadershipCard/LeadershipCard';

export type DraggableColumnsProps = {
  className?: string;
  cards: LeadershipCardProps[];
  dragLabel: string;
};

const DraggableColumns: FC<DraggableColumnsProps> = ({ cards, className, dragLabel }) => {
  const leftColumnItems = cards.slice(0, cards.length / 2);
  const rightColumnItems = cards.slice(cards.length / 2, cards.length);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstSwiperRef = useRef<SwiperClass | null>(null);
  const secondSwiperRef = useRef<SwiperClass | null>(null);
  const [firstSwiper, setFirstSwiper] = useState<SwiperClass | null>(null);
  const [secondSwiper, setSecondSwiper] = useState<SwiperClass | null>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const handleTouchStart = () => {
    setIsGrabbing(true);
  };

  const handleTouchEnd = () => {
    setIsGrabbing(false);
  };

  return (
    <div className={classNames('DraggableColumns', css.root, className)} ref={containerRef}>
      <Swiper
        modules={[Controller, A11y]}
        className={css.column}
        direction="vertical"
        slidesPerView="auto"
        autoHeight={true}
        controller={{ control: secondSwiper! }}
        onBeforeInit={(swiper) => {
          firstSwiperRef.current! = swiper;
        }}
        loop
        speed={500}
        onSwiper={(swiper) => {
          setFirstSwiper(swiper);
          swiper.on('touchStart', () => handleTouchStart());
          swiper.on('touchEnd', () => handleTouchEnd());
        }}
      >
        {leftColumnItems.map((item, index) => (
          <SwiperSlide key={index} className={css.item}>
            <LeadershipCard {...item} className={classNames(css.leader)} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[Controller, A11y]}
        className={classNames(css.column, css.right)}
        direction="vertical"
        slidesPerView="auto"
        autoHeight={true}
        controller={{ control: firstSwiper! }}
        onBeforeInit={(swiper) => {
          secondSwiperRef.current! = swiper;
        }}
        loop
        speed={500}
        onSwiper={(swiper) => {
          setSecondSwiper(swiper);
          swiper.on('touchStart', () => handleTouchStart());
          swiper.on('touchEnd', () => handleTouchEnd());
        }}
      >
        {rightColumnItems.map((item, index) => (
          <SwiperSlide key={index} className={css.item}>
            <LeadershipCard {...item} className={classNames(css.leader, css.right)} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Cursor text={dragLabel} isDragging={isGrabbing} containerRef={containerRef} />
    </div>
  );
};

export default memo(DraggableColumns);
