/* eslint-disable sonarjs/no-duplicate-string */
import { Story } from '@storybook/react';

import { contentfulTestAsset } from '../ContentfulImage/ContentfulImage.stories';
import LeadershipModule, { LeadershipModuleProps } from './LeadershipModule';

export default { title: 'components/LeadershipModule' };

export const Default: Story<LeadershipModuleProps> = (args) => <LeadershipModule {...args} />;

Default.args = {
  eyebrow: 'Leadership',
  title: 'Cras mattis purus sit amet quam est',
  directors: {
    label: 'Board of directors',
    list: [
      { name: 'James Kuffner', role: 'Representative Director  ' },
      { name: 'Kenta Kon', role: 'Representative Director' },
      { name: 'Takanori Azuma', role: 'Director' },
      { name: 'Julie Hamp', role: 'Director, Director, Audit & Supervisory' },
      { name: 'Koji Kobayashi', role: 'Audit & Supervisory' }
    ]
  },
  slides: [
    {
      title: 'Name Person',
      description: 'Job title goes here. Lorem ipsum dolor sit amet.',
      image: contentfulTestAsset,
      cta: {
        title: 'sss',
        href: 'https://google.com'
      }
    },
    {
      title: 'Name Person 2',
      description: 'Job title here',
      image: contentfulTestAsset,
      cta: {
        title: 'he',
        href: 'https://google.com'
      }
    },
    {
      title: 'Name Person 3',
      description: 'Job title goes here3',
      image: contentfulTestAsset,
      cta: {
        title: 'buttoncito',
        href: '/'
      }
    },
    {
      title: 'Name Person 4',
      description: 'Job title 4 whatever',
      image: contentfulTestAsset,
      cta: {
        title: 'maping',
        href: 'https://google.com'
      }
    },
    {
      title: 'Name Person 5',
      description: 'Job title goes here5',
      image: contentfulTestAsset,
      cta: {
        title: 'buttoncito',
        href: '/'
      }
    },
    {
      title: 'Name Person 6',
      description: 'Job title 6',
      image: contentfulTestAsset,
      cta: {
        title: 'maping',
        href: 'https://google.com'
      }
    },
    {
      title: 'Name Person 7',
      description: 'Job title goes here7',
      image: contentfulTestAsset,
      cta: {
        title: 'buttoncito',
        href: '/'
      }
    },
    {
      title: 'Name Person 8',
      description: 'Job title 8, 8 8',
      image: contentfulTestAsset,
      cta: {
        title: 'maping',
        href: 'https://google.com'
      }
    },
    {
      title: 'Name Person 9',
      description: 'Job title 9, Job title 9, Job title 9',
      image: contentfulTestAsset,
      cta: {
        title: 'maping',
        href: 'https://google.com'
      }
    },
    {
      title: 'Name Person 10',
      description: 'Job title 10',
      image: contentfulTestAsset,
      cta: {
        title: 'maping',
        href: 'https://google.com'
      }
    },
    {
      title: 'Name Person 11',
      description: 'Job title 11',
      image: contentfulTestAsset,
      cta: {
        title: 'maping',
        href: 'https://google.com'
      }
    },
    {
      title: 'Name Person 12',
      description: 'Job title 12',
      image: contentfulTestAsset,
      cta: {
        title: 'maping',
        href: 'https://google.com'
      }
    }
  ]
};
