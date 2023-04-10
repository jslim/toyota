import { Story } from '@storybook/react';

import CardGrid, { CardGridProps } from './CardGrid';

import { productArgs, defaultArgs, defaultTallArgs, newsArgs, milestoneArgs, quoteArgs } from '../Card/Card.stories';
import { CardTypes } from '../Card/Card';

export default { title: 'components/CardGrid' };

export const Default: Story<CardGridProps & { numberOfCards: number }> = (args) => {
  let i: number = 0;
  let cardsArray = [];
  const cardType = getCardType(args.cardType);
  while (i < args.numberOfCards) {
    cardsArray.push(cardType);
    i++;
  }

  return <CardGrid {...args} cards={cardsArray} />;
};

function getCardType(cardType: CardTypes | undefined) {
  return cardType === CardTypes.PRODUCT
    ? productArgs
    : cardType === CardTypes.NEWS
    ? newsArgs
    : cardType === CardTypes.DEFAULT
    ? defaultArgs
    : cardType === CardTypes.DEFAULTTALL
    ? defaultTallArgs
    : cardType === CardTypes.QUOTE
    ? quoteArgs
    : milestoneArgs;
}

Default.args = {
  cardType: CardTypes.PRODUCT,
  numberOfCards: 2
};

Default.argTypes = {
  cardType: {
    options: CardTypes,
    control: { type: 'select' }
  },
  numberOfCards: {
    options: [2, 3, 4, 5, 6],
    control: { type: 'select' }
  }
};
