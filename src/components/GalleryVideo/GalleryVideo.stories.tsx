import { contentfulTestAsset } from '../ContentfulImage/ContentfulImage.stories';
import GalleryVideo, { GalleryVideoProps } from './GalleryVideo';

export default { title: 'components/GalleryVideo' };

const src = 'http://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4';

export const Large = (args: GalleryVideoProps) => <GalleryVideo {...args} />;

Large.args = {
  slides: [
    {
      image: contentfulTestAsset,
      video: { src },
      title: 'Changing Lanes Lorem ipsum dolor sit amet, con sectetur adipiscing sectetur adipiscing sec'
    },
    {
      image: contentfulTestAsset,
      title: 'Changing Lanes'
    },
    {
      image: contentfulTestAsset,
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
      image: contentfulTestAsset,
      video: { src }
    },
    {
      image: contentfulTestAsset
    }
  ]
};
