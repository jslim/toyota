import { FC, memo, useState } from 'react';
import classNames from 'classnames';

import css from './VideoPlayerContainer.module.scss';

import { ContentfulImageAsset } from '@/data/types';

import Cta, { ButtonType } from '@/components/Cta/Cta';
import PlayIcon from '@/components/VideoPlayer/VideoControls/svgs/play.svg';
import { Props as VideoProps } from '@/components/VideoPlayer/VideoPlayer';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';

import ContentfulImage from '../ContentfulImage/ContentfulImage';

export enum VideoType {
  Gallery = 'gallery',
  Default = 'default'
}

export type VideoPlayerContainerProps = {
  className?: string;
  poster: ContentfulImageAsset;
  video: VideoProps;
  title?: string;
  theme?: VideoType;
};

const VideoPlayerContainer: FC<VideoPlayerContainerProps> = ({
  className,
  poster,
  title,
  video,
  theme = VideoType.Default
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={classNames('VideoPlayerContainer', css.root, className, css[theme])}>
      {isPlaying ? (
        <VideoPlayer {...video} className={css.video} autoPlay togglePlaying={() => setIsPlaying(!isPlaying)} />
      ) : (
        <div className={css.imageWrapper} onClick={() => setIsPlaying(true)}>
          <Cta className={css.playButton} theme={ButtonType.Large} isWhite={true} aria-label={'play video'}>
            <PlayIcon />
          </Cta>

          <ContentfulImage asset={poster} className={css.poster} />
          {title && <div className={css.title}>{title}</div>}
        </div>
      )}
    </div>
  );
};

export default memo(VideoPlayerContainer);
