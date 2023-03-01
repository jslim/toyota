import { FC, memo, useState } from 'react';
import classNames from 'classnames';

import css from './VideoPlayerContainer.module.scss';

import BaseImage from '@/components/BaseImage/BaseImage';
import { Props as VideoProps } from '@/components/VideoPlayer/VideoPlayer';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';

import PlayIcon from '@/components/svgs/play.svg';

export type VideoPlayerContainerProps = {
  className?: string;
  poster: { src: string; alt: string };
  video: VideoProps;
};

const VideoPlayerContainer: FC<VideoPlayerContainerProps> = ({ className, poster, video }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={classNames('VideoPlayerContainer', css.root, className)}>
      {isPlaying ? (
        <VideoPlayer {...video} className={css.video} autoPlay togglePlaying={() => setIsPlaying(!isPlaying)} />
      ) : (
        <div className={css.imageWrapper} onClick={() => setIsPlaying(true)}>
          <PlayIcon />
          <BaseImage {...poster} className={css.poster} />
        </div>
      )}
    </div>
  );
};

export default memo(VideoPlayerContainer);
