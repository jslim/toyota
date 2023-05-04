import { FC, MutableRefObject, memo, useRef, useState } from 'react';
import classNames from 'classnames';
import { A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import css from './DraggableColumns.module.scss';

import Cursor from '../Cursor/Cursor';
import LeadershipCard, { LeadershipCardProps } from '../LeadershipCard/LeadershipCard';

export type DraggableColumnsProps = {
  className?: string;
  cards: LeadershipCardProps[];
  isDesktop?: boolean;
};

const DraggableColumns: FC<DraggableColumnsProps> = ({ cards, className, isDesktop }) => {
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
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
        modules={[A11y]}
        className={css.column}
        direction="vertical"
        slidesPerView={4}
        autoHeight={true}
        loop
        speed={500}
        centeredSlides={true}
        spaceBetween={182}
        touchEventsTarget={'container'}
        onSwiper={(swiper) => {
          swiper.on('touchMove', handleTouchStart);
          swiper.on('touchEnd', handleTouchEnd);
        }}
        touchStartPreventDefault={false}
        preventClicks={true}
        preventClicksPropagation={true}
      >
        {cards.map((item, index) => (
          <SwiperSlide
            key={index}
            className={classNames(css.item, { [css.shift]: index % 2 !== 0, [css.disable]: isGrabbing })}
          >
            <LeadershipCard {...item} className={css.leader} />
          </SwiperSlide>
        ))}
      </Swiper>
      {isDesktop && <Cursor isDragging={isGrabbing} containerRef={containerRef} />}
    </div>
  );
};

export default memo(DraggableColumns);
