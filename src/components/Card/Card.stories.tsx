import { Story } from '@storybook/react';

import Card, { CardProps } from './Card';

export default { title: 'components/Card' };

export const Product: Story<CardProps> = (args) => <Card {...args} />;

export const News: Story<CardProps> = (args) => <Card {...args} />;

export const Office: Story<CardProps> = (args) => <Card {...args} />;

Product.args = {};
News.args = {};
Office.args = {};
