import { contentfulTestAsset } from '../ContentfulImage/ContentfulImage.stories';
import Hero, { HeroProps, HeroType } from './Hero';

export default { title: 'components/Hero' };

const src = 'http://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4';

export const Home = (args: HeroProps) => <Hero {...args} />;

Home.args = {
  title: 'MOBILITY TO LOVE.<br> SAFETY TO LIVE.',
  image: contentfulTestAsset,
  video: { src },
  theme: HeroType.Home
};

export const Primary = (args: HeroProps) => <Hero {...args} />;

Primary.args = {
  title: 'Integer quis urna sit amet elit gravida vel id nunc. Fusce risus nunc.',
  image: contentfulTestAsset
};

export const Secondary = (args: HeroProps) => <Hero {...args} />;

Secondary.args = {
  title: 'Software-Defined Vehicle',
  image: contentfulTestAsset,
  theme: HeroType.Secondary
};

export const Overview = (args: HeroProps) => <Hero {...args} />;

Overview.args = {
  title: 'News, blogs, and research.',
  image: contentfulTestAsset,
  theme: HeroType.Overview,
  featured: {
    date: '2 days ago',
    title: 'Woven Planet’s CEO James Kuffner presented at Toyota Motor Europe’s Kenshiki event',
    cat: 'Research'
  }
};

export const Detail = (args: HeroProps) => <Hero {...args} />;

Detail.args = {
  image: contentfulTestAsset,
  theme: HeroType.Detail
};
