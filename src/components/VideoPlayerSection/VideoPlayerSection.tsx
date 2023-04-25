import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './VideoPlayerSection.module.scss';

import ImageCascade from '@/components/ImageCascade/ImageCascade';
import VideoPlayerContainer from '@/components/VideoPlayerContainer/VideoPlayerContainer';
import { VideoPlayerContainerProps as Props } from '@/components/VideoPlayerContainer/VideoPlayerContainer';

export type VideoPlayerSectionProps = {
  className?: string;
  videoPlayerSection: Props;
  quote?: string;
  author?: string;
};

const VideoPlayerSection: FC<VideoPlayerSectionProps> = ({ className, videoPlayerSection, quote, author }) => {
  return (
    <div className={classNames('VideoPlayerSection', css.root, className)}>
      <ImageCascade isHorizontal>
        <VideoPlayerContainer {...videoPlayerSection} />
      </ImageCascade>
      <div className={css.textWrapper}>
        <p className={css.quote}>{quote}</p>
        <p className={css.author}>{author}</p>
      </div>
    </div>
  );
};

export default memo(VideoPlayerSection);
