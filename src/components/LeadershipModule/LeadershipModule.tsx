import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import SwiperCore, { A11y, Grid, Pagination } from 'swiper';
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';

import css from './LeadershipModule.module.scss';

import { ContentfulImageAsset } from '@/data/types';
import { variants } from '@/data/variants';

import BaseLink, { Props as LinkProps } from '@/components/BaseLink/BaseLink';
import SectionWrapper, { SectionWrapperProps } from '@/components/SectionWrapper/SectionWrapper';

import ContentfulImage from '../ContentfulImage/ContentfulImage';
import Eyebrow from '../Eyebrow/Eyebrow';
import LeadershipCard, { LeadershipCardProps } from '../LeadershipCard/LeadershipCard';

export type LeadershipModuleProps = {
  className?: string;
  eyebrow: string;
  title: string;
  description: string;
  slides: LeadershipCardProps[];
};

SwiperCore.use([Pagination, A11y]);
const SLIDE_DURATION = 450;

const LeadershipModule: FC<LeadershipModuleProps> = ({ className, eyebrow, title, description, slides }) => {
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
      <Swiper
        className={css.carouselContainer}
        autoHeight={true}
        speed={SLIDE_DURATION}
        //  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
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
    </div>
  );
};

export default memo(LeadershipModule);
