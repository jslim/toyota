import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './Card.module.scss';

import { cards } from '@/data/cards-types';

import BaseImage from '@/components/BaseImage/BaseImage';

export type CardProps = {
  className?: string;
  cardType: string;
  image: { src: string; alt: string };
  title: string;
  text: string;
  date?: string;
  // cta props
};

const Card: FC<CardProps> = ({ className, cardType = cards.NEWS, image, title, text, date }) => {
  return (
    <div
      className={classNames('Card', css.root, className, {
        [css.product]: cardType === cards.PRODUCT,
        [css.news]: cardType === cards.NEWS,
        [css.office]: cardType === cards.OFFICE
      })}
    >
      <BaseImage {...image} className={css.image} />
      <div className={css.textWrapper}>
        <div className={css.titleWrapper}>
          {date && <span className={css.date}>{date}</span>}
          <span className={css.title}>{title}</span>
        </div>

        <p className={css.text}>{text}</p>
        {/** optional CTA here */}
      </div>
    </div>
  );
};

export default memo(Card);
