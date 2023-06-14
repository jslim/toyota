import { FC, ReactNode, memo } from 'react';
import classNames from 'classnames';
import SwiperCore, { A11y, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import css from './Gallery.module.scss';

import Card, { CardProps, CardTypes } from '@/components/Card/Card';
import useIntersectionObserver from '@/hooks/use-intersection-observer';

SwiperCore.use([Pagination, A11y]);

const SLIDE_DURATION = 450;

export type GalleryProps = {
  className?: string;
  slides: CardProps[];
};

const CardWrap: FC<{ children: ReactNode }> = ({ children }) => {
  const [setNode, isIntersection] = useIntersectionObserver(false, 1, '100% 0px 100% 0px');
  return (
    <div
      className={classNames(css.cardWrapper, { [css.isActive]: isIntersection })}
      ref={(node: HTMLDivElement) => setNode(node)}
    >
      {children}
    </div>
  );
};

const Gallery: FC<GalleryProps> = ({ className, slides }) => {
  return (
    <div className={classNames('Gallery', css.root, className)}>
      <Swiper
        className={css.carouselContainer}
        slidesPerView={'auto'}
        speed={SLIDE_DURATION}
        pagination={{
          el: `.${css.pagination}`,
          type: 'bullets',
          clickable: true
        }}
        preventClicks={true}
        preventClicksPropagation={false}
      >
        {slides.map((item, i) => {
          return (
            <SwiperSlide className={css.slide} key={`slide-${i}`}>
              <CardWrap>
                <Card {...item} cardType={CardTypes.PRODUCT} />
              </CardWrap>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <span className={css.pagination}>{/* pagination number rendered by swiper */}</span>
    </div>
  );
};

export default memo(Gallery);
