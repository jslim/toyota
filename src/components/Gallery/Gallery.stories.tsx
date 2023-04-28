import { Story } from '@storybook/react';

import { Color } from '@/utils/colors';

import { contentfulTestAsset } from '../ContentfulImage/ContentfulImage.stories';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import Gallery, { GalleryProps } from './Gallery';

export default { title: 'components/Gallery' };

export const Default: Story<GalleryProps> = (args) => (
  <SectionWrapper backgroundColor={Color.DARK_GREY} eyebrow="Careers" title="Lorem Ipsum">
    <Gallery {...args} />
  </SectionWrapper>
);

const button = 'Learn more';

Default.args = {
  slides: [
    {
      title: 'Arene',
      text: 'Integer posuere erat a ante venenatis suere velit aliquet. Vestibulum id ligula porta felis euismod semper.',
      image: contentfulTestAsset,
      cta: {
        title: button,
        href: '/'
      }
    },
    {
      title: 'Ad/adas technologies',
      text: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulta felis euismod semper.',
      image: contentfulTestAsset,
      cta: {
        title: button,
        href: 'https://google.com'
      }
    },
    {
      title: 'automated mapping',
      text: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper.',
      image: contentfulTestAsset,
      cta: {
        title: button,
        href: '/'
      }
    },
    {
      title: 'automated mapping',
      text: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligufelis euismod semper.',
      image: contentfulTestAsset,
      cta: {
        title: button,
        href: 'https://google.com'
      }
    }
  ]
};

Default.argTypes = {};
