// eslint-disable-next-line simple-import-sort/imports
import { Story } from '@storybook/react';

import Card, { CardProps } from './Card';
import { CardTypes } from './Card';

export default { title: 'components/Card' };

export const Product: Story<CardProps> = (args) => <Card {...args} />;

export const News: Story<CardProps> = (args) => <Card {...args} />;

export const Office: Story<CardProps> = (args) => <Card {...args} />;

const url = 'https://i1.wp.com/thetalkinggeek.com/wp-content/uploads/2015/09/sintel1.png?fit=1920%2C817&ssl=1';

Product.args = {
  title: 'Arene',
  text: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper.',
  image: {
    src: url,
    alt: ''
  },
  cardType: CardTypes.PRODUCT_LARGE,
  cta: {
    title: 'Learn more',
    href: 'https://google.com'
  }
};
News.args = {
  date: 'JAN 12',
  title: 'automated driving',
  text: 'Woven Planet’s CEO James Kuffner presented at Toyota Motor.',
  image: {
    src: url,
    alt: ''
  },
  cardType: CardTypes.NEWS
};
Office.args = {
  title: 'Global Headquarters - Tokyo',
  text: 'Nihonbashi Muromachi Mitsui Tower,3-2-1 Nihonbashimuromachi, Chuo-ku,Tokyo, JAPAN 103-0022',
  image: {
    src: url,
    alt: ''
  },
  cardType: CardTypes.OFFICE
};
