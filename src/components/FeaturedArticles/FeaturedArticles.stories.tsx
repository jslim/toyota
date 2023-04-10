import { Story } from '@storybook/react';

import FeaturedArticles, { FeaturedArticlesProps } from './FeaturedArticles';

export default { title: 'components/FeaturedArticles' };

const url = 'https://i1.wp.com/thetalkinggeek.com/wp-content/uploads/2015/09/sintel1.png?fit=1920%2C817&ssl=1';

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
      image: {
        src: url,
        alt: ''
      },
      cta: {
        href: 'https://google.com'
      }
    },
    {
      date: 'JAN 12',
      title: 'automated driving2',
      text: 'Woven Planet’s CEO James Kuffner presented at Toyota Motor.2, Woven Planet’s CEO James Kuffner presented at Toyota Motor.1',
      image: {
        src: url,
        alt: ''
      }
    },
    {
      date: 'JAN 12',
      title: 'automated driving3',
      text: 'Woven Planet’s CEO James Kuffner presented at Toyota Motor.3',
      image: {
        src: url,
        alt: ''
      }
    },
    {
      date: 'JAN 12',
      title: 'automated driving',
      text: 'Woven Planet’s CEO James Kuffner presented at Toyota Motor.4',
      image: {
        src: url,
        alt: ''
      }
    }
  ]
};

Default.argTypes = {};
