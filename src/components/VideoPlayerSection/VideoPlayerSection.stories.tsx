import VideoPlayerSection, { VideoPlayerSectionProps } from './VideoPlayerSection';

export default { title: 'components/VideoPlayerSection' };

const poster = 'https://i1.wp.com/thetalkinggeek.com/wp-content/uploads/2015/09/sintel1.png?fit=1920%2C817&ssl=1';
const src = 'http://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4';

export const Default = (args: VideoPlayerSectionProps) => <VideoPlayerSection {...args} />;

Default.args = {
  videoPlayerSection: {
    poster: { src: poster, alt: '' },
    video: { src }
  },
  quote: '“It’s our job to innovate and transform the way we approach software development.”',
  author: 'Name goes here'
};
