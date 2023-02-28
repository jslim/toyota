import VideoPlayerContainer, { VideoPlayerContainerProps } from './VideoPlayerContainer';

export default { title: 'components/VideoPlayerContainer' };

const poster = 'https://i1.wp.com/thetalkinggeek.com/wp-content/uploads/2015/09/sintel1.png?fit=1920%2C817&ssl=1';
const src = 'http://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4';

export const Default = (args: VideoPlayerContainerProps) => <VideoPlayerContainer {...args} />;

Default.args = {
  poster: { src: poster, alt: '' },
  video: { src }
};
