import { Story } from '@storybook/react';

import Roadmap, { RoadmapProps, RoadmapTypes } from './Roadmap';
import { getImageUrl } from '@/utils/basic-functions';

export default { title: 'components/Roadmap' };

export const Default: Story<RoadmapProps> = (args) => (
  <div style={{ margin: '300px 0 ', width: '100%' }}>
    <Roadmap {...args} />
  </div>
);

Default.args = {
  eyebrow: 'OUR ROADMAP',
  title: 'Our roadmap to an accessible future.',
  items: [
    {
      title: 'by Toyota',
      text: "We're advancing Toyota's vision for enhancing quality of life with a plan to develop the software, data, and hardware needed for human-centered mobility solutions.",
      svg: getImageUrl('toyota-icon.svg')
    },
    {
      title: 'agility',
      text: 'Our agile tech start-up mentality combined with Japanese craftsmanship leads to the ceaseless innovation needed to achieve our goals.',
      svg: getImageUrl('toyota-globe.svg')
    },
    {
      title: 'the right tools',
      text: 'From design, to development, to testing, we’re delivering the full-stack of tools and infrastructure needed for a software-first approach to mobility.',
      svg: getImageUrl('toyota-logo.svg')
    }
  ]
};

export const Home: Story<RoadmapProps> = (args) => (
  <div style={{ margin: '500px 0 ', width: '100%' }}>
    <Roadmap {...args} />
  </div>
);

Home.args = {
  eyebrow: 'OUR TOOLS',
  title: 'Developing the tools to build a more mobile and safe future.',
  cta: {
    title: 'what we build',
    href: '/'
  },
  theme: RoadmapTypes.HOME,
  items: [
    {
      title: 'Software Defined Vehicles',
      text: 'Our modern software platform Arene supports the creation, deployment, and continuous improvement of software-defined vehicles.',
      image: getImageUrl('home-slide-1.jpg')
    },
    {
      title: 'AD/ADAS technologY',
      text: 'We develop Automated Driving/Advanced Driver Assistance Systems to provide the ability to achieve truly safe and secure mobility.',
      image: getImageUrl('home-slide-2.jpg')
    },
    {
      title: 'GEO',
      text: 'Automated driving deployments and data-driven autonomy are supported by our geospatial intelligence products.',
      image: getImageUrl('home-slide-1.jpg')
    }
  ]
};
