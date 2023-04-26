import { FC, memo } from 'react';
import classNames from 'classnames';
import SwiperCore, { A11y, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import css from './Gallery.module.scss';

import Card, { CardProps, CardTypes } from '@/components/Card/Card';

SwiperCore.use([Pagination, A11y]);

const SLIDE_DURATION = 450;

export type GalleryProps = {
  className?: string;
  slides: CardProps[];
};

const Gallery: FC<GalleryProps> = ({ className, slides }) => {
  return (
    <div className={classNames('Gallery', css.root, className)}>
      <Swiper
        className={css.carouselContainer}
        autoHeight={true}
        slidesPerView={'auto'}
        speed={SLIDE_DURATION}
        onSlideChange={(swiper) => console.log(swiper)}
        pagination={{
          type: 'bullets',
          clickable: true,
          horizontalClass: css.pagination
        }}
        preventClicks={true}
        preventClicksPropagation={false}
      >
        {slides.map((item, i) => {
          return (
            <SwiperSlide className={css.slide} key={`slide-${i}`}>
              <Card {...item} cardType={CardTypes.PRODUCT} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default memo(Gallery);
