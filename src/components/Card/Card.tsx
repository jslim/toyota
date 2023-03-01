import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './Card.module.scss';

import { cards } from '@/data/cards-types';
import BaseImage from '@/components/BaseImage/BaseImage';

export type CardProps = {
  className?: string;
  cardType: string;
};

const Card: FC<CardProps> = ({ className, cardType = cards.NEWS }) => {
  const ProductCard = () => {
    return (
      <div className={css.wrapper}>
        <BaseImage></BaseImage>
        <div className={css.textWrapper}>
          <p className={css.title}></p>
          <p className={css.text}></p>
        </div>
      </div>
    );
  };

  const NewsCard = () => {
    return <div className={css.wrapper}>{'hi'}</div>;
  };

  const OfficeCard = () => {
    return <div className={css.wrapper}>{'hi'}</div>;
  };

  return (
    <div className={classNames('Card', css.root, className)}>
      {cardType === cards.PRODUCT && <ProductCard />}
      {cardType === cards.NEWS && <NewsCard />}
      {cardType === cards.OFFICE && <OfficeCard />}
    </div>
  );
};

export default memo(Card);
