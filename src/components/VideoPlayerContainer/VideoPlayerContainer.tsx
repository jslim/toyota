import { FC, memo, useState } from 'react';
import classNames from 'classnames';

import css from './VideoPlayerContainer.module.scss';

import BaseImage from '@/components/BaseImage/BaseImage';
import Cta, { ButtonType } from '@/components/Cta/Cta';
import PlayIcon from '@/components/VideoPlayer/VideoControls/svgs/play.svg';
import { Props as VideoProps } from '@/components/VideoPlayer/VideoPlayer';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';

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
          <Cta className={css.playButton} theme={ButtonType.Large} isWhite={true} aria-label={'play video'}>
            <PlayIcon />
          </Cta>

          <BaseImage {...poster} className={css.poster} />
        </div>
      )}
    </div>
  );
};

export default memo(VideoPlayerContainer);
