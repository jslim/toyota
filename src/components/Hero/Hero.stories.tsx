import Hero, { HeroProps, HeroType } from './Hero';
import { getImageUrl } from '@/utils/basic-functions';

export default { title: 'components/Hero' };

const poster = getImageUrl('home-slide-2.jpg');
const src = 'http://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4';

export const Home = (args: HeroProps) => <Hero {...args} />;

Home.args = {
  title: 'MOBILITY TO LOVE.<br> SAFETY TO LIVE.',
  image: { src: poster, alt: '' },
  video: { src },
  theme: HeroType.Home
};

export const Primary = (args: HeroProps) => <Hero {...args} />;

Primary.args = {
  title: 'Integer quis urna sit amet elit gravida vel id nunc. Fusce risus nunc.',
  image: poster
};

export const Secondary = (args: HeroProps) => <Hero {...args} />;

Secondary.args = {
  title: 'Software-Defined Vehicle',
  image: poster,
  theme: HeroType.Secondary
};

export const Overview = (args: HeroProps) => <Hero {...args} />;

Overview.args = {
  title: 'News, blogs, and research.',
  image: poster,
  theme: HeroType.Overview,
  featured: {
    date: '2 days ago',
    title: 'Woven Planet’s CEO James Kuffner presented at Toyota Motor Europe’s Kenshiki event',
    cat: 'Research'
  }
};

export const Detail = (args: HeroProps) => <Hero {...args} />;

Detail.args = {
  image: poster,
  theme: HeroType.Detail
};
