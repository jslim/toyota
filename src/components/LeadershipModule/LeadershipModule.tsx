import { FC, memo } from 'react';
import classNames from 'classnames';
import SwiperCore, { A11y, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import css from './LeadershipModule.module.scss';

import DraggableColumns from '@/components/DraggableColumns/DraggableColumns';
import Eyebrow from '@/components/Eyebrow/Eyebrow';
import LeadershipCard, { LeadershipCardProps } from '@/components/LeadershipCard/LeadershipCard';

import getLayout from '@/utils/layout';

export type LeadershipModuleProps = {
  className?: string;
  eyebrow: string;
  title: string;
  description: string;
  slides: LeadershipCardProps[];
  dragLabel: string;
};

SwiperCore.use([Pagination, A11y]);
const SLIDE_DURATION = 450;

const LeadershipModule: FC<LeadershipModuleProps> = ({ className, eyebrow, title, description, slides, dragLabel }) => {
  const layout = getLayout;
  const pairsArray = [];
  for (let i = 0; i < slides.length; i += 2) {
    // Create a new array with the current item and the next item
    const pair = [slides[i], slides[i + 1]];
    pairsArray.push(pair);
  }

  return (
    <div className={classNames('LeadershipModule', css.root, className)}>
      <div className={css.wrapper}>
        <Eyebrow className={css.eyebrow} text={eyebrow} />
        <div className={css.textWrapper}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.description}>{description}</p>
        </div>
      </div>

      {layout.mobile || layout.tablet ? (
        <>
          <Swiper
            className={css.carouselContainer}
            autoHeight={true}
            speed={SLIDE_DURATION}
            pagination={{
              el: `.${css.pagination}`,
              type: 'bullets',
              clickable: true
            }}
            centeredSlides={true}
            slidesPerView={'auto'}
            spaceBetween={24}
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
                    return <LeadershipCard {...item} key={i} />;
                  })}
                </SwiperSlide>
              );
            })}
          </Swiper>
          <span className={css.pagination}></span>
        </>
      ) : (
        <DraggableColumns cards={slides} dragLabel={dragLabel} className={css.columns} />
      )}
    </div>
  );
};

export default memo(LeadershipModule);
