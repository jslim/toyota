import { Story } from '@storybook/react';

import Gallery, { GalleryProps } from './Gallery';

export default { title: 'components/Gallery' };

export const Default: Story<GalleryProps> = (args) => <Gallery {...args} />;

const url = 'https://i1.wp.com/thetalkinggeek.com/wp-content/uploads/2015/09/sintel1.png?fit=1920%2C817&ssl=1';
const button = 'Learn more';

Default.args = {
  slides: [
    {
      eyebrow: 'Arene',
      text: 'Integer posuere erat a ante venenatis suere velit aliquet. Vestibulum id ligula porta felis euismod semper.',
      image: {
        src: url,
        alt: ''
      },
      cta: {
        title: button,
        href: '/'
      }
    },
    {
      eyebrow: 'Ad/adas technologies',
      text: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulta felis euismod semper.',
      image: {
        src: url,
        alt: ''
      },
      cta: {
        title: button,
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
        title: button,
        href: '/'
      }
    },
    {
      eyebrow: 'automated mapping',
      text: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligufelis euismod semper.',
      image: {
        src: url,
        alt: ''
      },
      cta: {
        title: button,
        href: 'https://google.com'
      }
    }
  ]
};

Default.argTypes = {};
