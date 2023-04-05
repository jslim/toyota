import { Story } from '@storybook/react';

import BiographicHero, { BiographicHeroProps } from './BiographicHero';

export default { title: 'components/BiographicHero' };

export const Default: Story<BiographicHeroProps> = (args) => <BiographicHero {...args} />;

const asset = {
  metadata: {
    tags: []
  },
  sys: {
    space: {
      sys: {
        type: 'Link',
        linkType: 'Space',
        id: 'x1jx2zz0m6ly'
      }
    },
    id: 'G7ua9WOelSJGJ4X4ybnAk',
    type: 'Asset',
    createdAt: '2023-03-03T18:41:48.320Z',
    updatedAt: '2023-03-03T18:41:48.320Z',
    environment: {
      sys: {
        id: 'master',
        type: 'Link',
        linkType: 'Environment'
      }
    },
    revision: 1,
    locale: 'en-US'
  },
  fields: {
    title: 'Dummy Title',
    description: 'Description',
    file: {
      url: 'https://images.ctfassets.net/x1jx2zz0m6ly/G7ua9WOelSJGJ4X4ybnAk/4521b7e06e3ed4ecc4ffb7a438df1c29/biographic-hero.jpg',
      details: {
        size: 170060,
        image: {
          width: 456,
          height: 612
        }
      },
      fileName: 'biographic-hero.jpg',
      contentType: 'image/jpeg'
    }
  }
};

Default.args = {
  title: 'Dr. James Kuffner',
  description: `Chief Executive Officer
  Woven Planet Holdings & 
  Executive Advisor, TRI`,
  asset,
  useSrcSet: true,
  imageQuality: 50,
  imageSizeDesktop: {
    numCols: 5,
    extraGutters: 0
  },
  imageSizeTablet: {
    numCols: 4,
    extraGutters: 0
  },
  imageSizeMobile: {
    numCols: 3,
    extraGutters: 0
  }
};

Default.argTypes = {};
