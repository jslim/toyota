import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './CardGrid.module.scss';

import Card, { CardProps, CardTypes } from '@/components/Card/Card';

export type CardGridProps = {
  className?: string;
  cardType?: CardTypes;
  cards?: CardProps[];
};

const CardGrid: FC<CardGridProps> = ({ className, cardType, cards }) => {
  const columns =
    cardType === CardTypes.DEFAULT || cardType === CardTypes.QUOTE ? 2 : cardType === CardTypes.NEWS ? '2-2' : 3;
  return (
    <>
      <div className={classNames('CardGrid', css.root, className, css['columns-' + columns])}>
        {cards?.map((card, i) => (
          <Card {...card} cardType={cardType} className={css.card} key={i} columns={columns === 3 ? 3 : 2} />
        ))}
      </div>
    </>
  );
};

export default memo(CardGrid);
