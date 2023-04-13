import { contentfulTestAsset } from '../ContentfulImage/ContentfulImage.stories';
import VideoPlayerSection, { VideoPlayerSectionProps } from './VideoPlayerSection';

export default { title: 'components/VideoPlayerSection' };

const src = 'http://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4';

export const Default = (args: VideoPlayerSectionProps) => <VideoPlayerSection {...args} />;

Default.args = {
  videoPlayerSection: {
    poster: contentfulTestAsset,
    video: { src }
  },
  quote: '“It’s our job to innovate and transform the way we approach software development.”',
  author: 'Name goes here'
};
