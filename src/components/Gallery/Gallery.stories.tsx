import { Story } from '@storybook/react';

import Gallery, { GalleryProps } from './Gallery';

export default { title: 'components/Gallery' };

export const Default: Story<GalleryProps> = (args) => <Gallery {...args} />;

const url = 'https://i1.wp.com/thetalkinggeek.com/wp-content/uploads/2015/09/sintel1.png?fit=1920%2C817&ssl=1';

Default.args = {
  slides: [
    {
      eyebrow: 'Arene',
      text: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper.',
      image: {
        src: url,
        alt: ''
      },
      cta: {
        title: 'Learn more',
        href: 'https://google.com'
      }
    },
    {
      eyebrow: 'Ad/adas technologies',
      text: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper.',
      image: {
        src: url,
        alt: ''
      },
      cta: {
        title: 'Learn more',
        href: 'https://google.com'
      }
    },
    {
      eyebrow: 'automated mapping',
      text: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper.',
      image: {
        src: url,
        alt: ''
      },
      cta: {
        title: 'Learn more',
        href: 'https://google.com'
      }
    },
    {
      eyebrow: 'automated mapping',
      text: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper.',
      image: {
        src: url,
        alt: ''
      },
      cta: {
        title: 'Learn more',
        href: 'https://google.com'
      }
    }
  ]
};

Default.argTypes = {};
