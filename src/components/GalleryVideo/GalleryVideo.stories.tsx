import GalleryVideo, { GalleryVideoProps } from './GalleryVideo';

export default { title: 'components/GalleryVideo' };

const poster = 'https://i1.wp.com/thetalkinggeek.com/wp-content/uploads/2015/09/sintel1.png?fit=1920%2C817&ssl=1';
const src = 'http://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4';

export const Large = (args: GalleryVideoProps) => <GalleryVideo {...args} />;

Large.args = {
  slides: [
    {
      image: { src: poster, alt: '' },
      video: { src },
      title: 'Changing Lanes Lorem ipsum dolor sit amet, con sectetur adipiscing sectetur adipiscing sec'
    },
    {
      image: { src: poster, alt: '' },
      title: 'Changing Lanes'
    },
    {
      image: { src: poster, alt: '' },
      video: { src },
      title: 'Changing Lanes'
    }
  ]
};

export const Small = (args: GalleryVideoProps) => (
  <div style={{ width: '45vw' }}>
    <GalleryVideo {...args} />
  </div>
);

Small.args = {
  slides: [
    {
      image: { src: poster, alt: '' },
      video: { src }
    },
    {
      image: { src: poster, alt: '' }
    }
  ]
};
