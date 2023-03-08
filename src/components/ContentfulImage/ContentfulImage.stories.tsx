import { Story } from '@storybook/react';

import ContentfulImage, { ContentfulImageProps } from './ContentfulImage';

export default { title: 'components/ContentfulImage' };

const asset = {
  metadata: {
    tags: []
  },
  sys: {
    space: {
      sys: {
        type: 'Link',
        linkType: 'Space',
        id: 'vaw3vktjesyf'
      }
    },
    id: '7405YErWPrnt0ST0hQ1z9a',
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
    title: 'ScreenShotImage',
    description: '',
    file: {
      url: '//images.ctfassets.net/vaw3vktjesyf/7405YErWPrnt0ST0hQ1z9a/bcd7cb4ea4be925b34d54964da7b68ab/Screen_Shot_2023-01-11_at_9.44.06_AM.png',
      details: {
        size: 937540,
        image: {
          width: 2598,
          height: 1452
        }
      },
      fileName: 'Screen Shot 2023-01-11 at 9.44.06 AM.png',
      contentType: 'image/png'
    }
  }
};

export const Default: Story<ContentfulImageProps> = (args) => <ContentfulImage {...args} />;

Default.args = {
  asset,
  imageQuality: 50,
  useSrcSet: true,
  imageSizeMobile: {
    numCols: 3,
    extraGutters: 0
  },
  imageSizeTablet: {
    numCols: 5,
    extraGutters: 0
  },
  imageSizeDesktop: {
    numCols: 10,
    extraGutters: 1
  }
};
