import { Story } from '@storybook/react';

import { contentfulTestAsset } from '../ContentfulImage/ContentfulImage.stories';
import FeaturedArticles, { FeaturedArticlesProps } from './FeaturedArticles';

export default { title: 'components/FeaturedArticles' };

export const Default: Story<FeaturedArticlesProps> = (args) => <FeaturedArticles {...args} />;

Default.args = {
  eyebrow: 'Updates',
  title: 'How we’re advancing our mission.',
  cta: { title: 'Our Latest', href: 'https://google.com' },
  cards: [
    {
      date: 'JAN 12',
      title: 'automated driving',
      text: 'Woven Planet’s CEO James Kuffner presented at Toyota Motor.1',
      image: contentfulTestAsset,
      cta: {
        href: 'https://google.com'
      }
    },
    {
      date: 'JAN 12',
      title: 'automated driving2',
      text: 'Woven Planet’s CEO James Kuffner presented at Toyota Motor.2, Woven Planet’s CEO James Kuffner presented at Toyota Motor.1',
      image: contentfulTestAsset
    },
    {
      date: 'JAN 12',
      title: 'automated driving3',
      text: 'Woven Planet’s CEO James Kuffner presented at Toyota Motor.3',
      image: contentfulTestAsset
    },
    {
      date: 'JAN 12',
      title: 'automated driving',
      text: 'Woven Planet’s CEO James Kuffner presented at Toyota Motor.4',
      image: contentfulTestAsset
    }
  ]
};

Default.argTypes = {};
