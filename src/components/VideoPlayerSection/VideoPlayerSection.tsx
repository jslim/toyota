import { FC, memo, useState } from 'react';
import classNames from 'classnames';

import css from './VideoPlayerSection.module.scss';

import ImageCascade from '@/components/ImageCascade/ImageCascade';
import VideoPlayerContainer, {
  VideoPlayerContainerProps as Props
} from '@/components/VideoPlayerContainer/VideoPlayerContainer';

export type VideoPlayerSectionProps = {
  className?: string;
  videoPlayerSection: Props;
  quote?: string;
  author?: string;
};

const VideoPlayerSection: FC<VideoPlayerSectionProps> = ({ className, videoPlayerSection, quote, author }) => {
  const [assetLoaded, setAssetLoaded] = useState(false);
  return (
    <div className={classNames('VideoPlayerSection', css.root, className)}>
      <ImageCascade isHorizontal assetLoaded={assetLoaded}>
        <VideoPlayerContainer {...videoPlayerSection} onLoad={() => setAssetLoaded(true)} />
      </ImageCascade>
      <div className={css.textWrapper}>
        <p className={css.quote}>{quote}</p>
        <p className={css.author}>{author}</p>
      </div>
    </div>
  );
};

export default memo(VideoPlayerSection);
