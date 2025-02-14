// eslint-disable-next-line simple-import-sort/imports
import { Story } from '@storybook/react';

import Card, { CardProps, CardTypes } from './Card';

import { contentfulTestAsset } from '../ContentfulImage/ContentfulImage.stories';

export default { eyebrow: 'components/Card' };

export const Product: Story<CardProps> = (args) => <Card {...args} />;

export const News: Story<CardProps> = (args) => <Card {...args} />;

export const Default: Story<CardProps> = (args) => <Card {...args} />;

export const DefaultTall: Story<CardProps> = (args) => <Card {...args} />;

export const Quote: Story<CardProps> = (args) => <Card {...args} />;

export const Milestone: Story<CardProps> = (args) => <Card {...args} />;

const ctaText = 'Learn more';

export const productArgs = {
  title: 'Arene',
  text: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper.',
  image: contentfulTestAsset,
  cardType: CardTypes.PRODUCT,
  cta: {
    title: ctaText,
    href: '/'
  }
};
export const newsArgs = {
  date: 'JAN 12',
  title: 'automated driving',
  text: 'Woven Planet’s CEO James Kuffner presented at Toyota Motor.',
  image: contentfulTestAsset,
  cardType: CardTypes.NEWS,
  cta: {
    href: '/'
  }
};
export const defaultArgs = {
  title: 'Global Headquarters - Tokyo',
  text: 'Nihonbashi Muromachi Mitsui Tower,3-2-1 Nihonbashimuromachi, Chuo-ku,Tokyo, JAPAN 103-0022',
  image: contentfulTestAsset,
  cardType: CardTypes.DEFAULT
};

export const defaultTallArgs = {
  title: 'Trust',
  text: 'We prioritise building safety into everything we make to create ever-improving forms of mobility that everyone can enjoy and trust.',
  image: contentfulTestAsset,
  cta: {
    title: ctaText,
    href: 'https://google.com'
  },
  cardType: CardTypes.DEFAULTTALL
};

export const quoteArgs = {
  title: 'Meridith Armstrong',
  subTitle: 'Project Manager, Maas Automated Driving Core',
  text: 'The technology I’m working to develop at Woven Planet will save lives and improve the ease of mobility for everyone.',
  image: contentfulTestAsset,
  cardType: CardTypes.QUOTE
};

export const milestoneArgs = {
  title: '8 Billion Miles',
  text: 'Our software simulates billions of driving scenarios.',
  image: contentfulTestAsset,
  cardType: CardTypes.MILESTONE
};

Product.args = productArgs;
News.args = newsArgs;
Default.args = defaultArgs;
DefaultTall.args = defaultTallArgs;
Milestone.args = milestoneArgs;
Quote.args = quoteArgs;
