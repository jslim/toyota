import { Story } from '@storybook/react';

import ContentfulImage, { ContentfulImageProps } from './ContentfulImage';

export default {
  title: 'components/ContentfulImage',
  argTypes: {
    imageQuality: {
      control: {
        type: 'number',
        min: 10,
        max: 100,
        step: 10
      }
    }
  }
};

export const Default: Story<ContentfulImageProps> = (args) => <ContentfulImage {...args} />;

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
    id: '3ZmNSLau8DHprqeqa9KO3r',
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
      url: '//images.ctfassets.net/x1jx2zz0m6ly/3ZmNSLau8DHprqeqa9KO3r/099955bf09da8b2cd3751c8af5997638/what_we_build_cta.jpeg',
      details: {
        size: 195080,
        image: {
          width: 1920,
          height: 762
        }
      },
      fileName: 'what_we_build_cta.jpeg',
      contentType: 'image/jpeg'
    }
  }
};

Default.args = {
  asset,
  useSrcSet: true,
  imageQuality: 50,
  imageSizeDesktop: {
    numCols: 10,
    extraGutters: 0
  },
  imageSizeTablet: {
    numCols: 8,
    extraGutters: 0
  },
  imageSizeMobile: {
    numCols: 6,
    extraGutters: 0
  }
};
