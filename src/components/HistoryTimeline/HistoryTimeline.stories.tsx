import { Story } from '@storybook/react';

import HistoryTimeline, { HistoryTimelineProps } from './HistoryTimeline';
import { contentfulTestAsset } from '../ContentfulImage/ContentfulImage.stories';

export default { title: 'components/HistoryTimeline' };

const button = 'Learn more';

export const Default: Story<HistoryTimelineProps> = (args) => (
  <div style={{ paddingTop: '90vh', width: '100%', background: 'white' }}>
    <HistoryTimeline {...args} />
  </div>
);

Default.args = {
  eyebrow: 'timeline',
  title: 'We find, develop and nurture world-class talent and partnerships.',
  slides: [
    {
      title: 'March',
      text: 'TRI-AD was established to accelerate the development and deployment of automated vehicle technology through research and production',
      image: contentfulTestAsset,
      cta: { href: '/', title: button },
      year: '2018'
    },
    {
      title: 'January 7',
      text: 'Toyota reveals plans to build a prototype “city” of the future',
      image: contentfulTestAsset,
      cta: { href: '/', title: button },
      year: '2020'
    },
    {
      title: 'January 1',
      text: "Woven Planet established to expand and improve TRI-AD's mandate",
      image: contentfulTestAsset,
      cta: { href: '/', title: button },
      year: '2021'
    },
    {
      title: 'February 23',
      text: 'The groundbreaking ceremony of Woven City.',
      image: contentfulTestAsset,
      cta: { href: '/', title: button },
      year: '2021'
    },
    {
      title: 'February 23',
      text: 'The groundbreaking ceremony of Woven City',
      image: contentfulTestAsset,
      cta: { href: '/', title: button },
      year: '2021'
    },
    {
      title: 'February 26',
      text: 'The groundbreaking ceremony of Woven City.',
      image: contentfulTestAsset,
      cta: { href: '/', title: button },
      year: '2022'
    },
    {
      title: 'February 26',
      text: 'The groundbreaking ceremony of Woven City Park',
      image: contentfulTestAsset,
      cta: { href: '/', title: button },
      year: '2022'
    },
    {
      title: 'February 28',
      text: 'The groundbreaking ceremony of Woven City',
      image: contentfulTestAsset,
      cta: { href: '/', title: button },
      year: '2023'
    },
    {
      title: 'February 28',
      text: 'The groundbreaking ceremony of Woven City Park',
      image: contentfulTestAsset,
      cta: { href: '/', title: button },
      year: '2023'
    }
  ]
};

Default.argTypes = {};
