/* eslint-disable sonarjs/no-duplicate-string */
import { Story } from '@storybook/react';

import { contentfulTestAsset } from '../ContentfulImage/ContentfulImage.stories';
import LeadershipModule, { LeadershipModuleProps } from './LeadershipModule';

export default { title: 'components/LeadershipModule' };

export const Default: Story<LeadershipModuleProps> = (args) => <LeadershipModule {...args} />;

Default.args = {
  eyebrow: 'Leadership',
  title: 'Cras mattis purus sit amet quam est',
  description:
    'Representing a complementary array of expertise across multiple disciplines, our leaders come together from diverse backgrounds to conceive, build, test and deliver the safest and smartest mobility on the planet.',
  slides: [
    {
      title: 'Name Person',
      description: 'Job title goes here.',
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
      description: 'Job title 4',
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
      description: 'Job title 8',
      image: contentfulTestAsset,
      cta: {
        title: 'maping',
        href: 'https://google.com'
      }
    },
    {
      title: 'Name Person 9',
      description: 'Job title 9',
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
    }
  ]
};
