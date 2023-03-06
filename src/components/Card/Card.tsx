import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './Card.module.scss';

import { Cards } from '@/data/cards-types';

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

const Card: FC<CardProps> = ({ className, cardType = Cards.NEWS, image, title, text, date }) => {
  return (
    <div
      className={classNames('Card', css.root, className, {
        [css.product]: cardType === Cards.PRODUCT,
        [css.news]: cardType === Cards.NEWS,
        [css.office]: cardType === Cards.OFFICE
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
