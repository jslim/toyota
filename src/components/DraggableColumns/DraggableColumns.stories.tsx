/* eslint-disable sonarjs/no-duplicate-string */
import { Story } from '@storybook/react';

import { contentfulTestAsset } from '../ContentfulImage/ContentfulImage.stories';
import DraggableColumns, { DraggableColumnsProps } from './DraggableColumns';

export default { title: 'components/DraggableColumns' };

export const Default: Story<DraggableColumnsProps> = (args) => <DraggableColumns {...args} />;

Default.args = {
  cards: [
    {
      title: 'Name Person',
      description: 'Job title goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
      description: 'Job title 6 goes here',
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

Default.argTypes = {};
