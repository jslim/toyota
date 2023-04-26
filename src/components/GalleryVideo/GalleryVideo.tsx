import { FC, memo } from 'react';
import classNames from 'classnames';
import SwiperCore, { A11y, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import css from './GalleryVideo.module.scss';

import { ContentfulImageAsset } from '@/data/types';

import { Props as VideoProps } from '@/components/VideoPlayer/VideoPlayer';
import VideoPlayerContainer, { VideoType } from '@/components/VideoPlayerContainer/VideoPlayerContainer';

import ContentfulImage from '../ContentfulImage/ContentfulImage';

SwiperCore.use([Pagination, A11y]);

const SLIDE_DURATION = 450;

export type GalleryVideoProps = {
  className?: string;
  slides: { video?: VideoProps; title?: string; image: ContentfulImageAsset }[];
};

const GalleryVideo: FC<GalleryVideoProps> = ({ className, slides }) => {
  return (
    <div className={classNames('GalleryVideo', css.root, className)}>
      <Swiper
        className={css.carouselContainer}
        autoHeight={true}
        slidesPerView={'auto'}
        speed={SLIDE_DURATION}
        pagination={{
          type: 'bullets',
          clickable: true,
          horizontalClass: css.pagination
        }}
        preventClicks={true}
        preventClicksPropagation={true}
      >
        {slides.map((item, i) => {
          return (
            <SwiperSlide className={css.slide} key={`slide-${i}`}>
              {item.video ? (
                <VideoPlayerContainer
                  video={item.video}
                  poster={item.image}
                  title={item.title}
                  theme={VideoType.Gallery}
                />
              ) : (
                <ContentfulImage asset={item.image} className={css.image} />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default memo(GalleryVideo);
