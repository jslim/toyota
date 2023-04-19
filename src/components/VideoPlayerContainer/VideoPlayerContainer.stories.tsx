import { contentfulTestAsset } from '../ContentfulImage/ContentfulImage.stories';
import VideoPlayerContainer, { VideoPlayerContainerProps } from './VideoPlayerContainer';

export default { title: 'components/VideoPlayerContainer' };

const src = 'http://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4';

export const Default = (args: VideoPlayerContainerProps) => <VideoPlayerContainer {...args} />;

Default.args = {
  poster: contentfulTestAsset,
  video: { src }
};
