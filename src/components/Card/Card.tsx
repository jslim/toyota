import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './Card.module.scss';

import BaseImage from '@/components/BaseImage/BaseImage';
import { Props as LinkProps } from '@/components/BaseLink/BaseLink';
import Cta, { ButtonType } from '@/components/Cta/Cta';

export enum CardTypes {
  NEWS = 'news',
  PRODUCT_LARGE = 'product',
  OFFICE = 'office'
}

export type CardProps = {
  className?: string;
  cardType: string;
  image: { src: string; alt: string };
  title: string;
  text: string;
  date?: string;
  cta?: LinkProps;
};

const Card: FC<CardProps> = ({ className, cardType = CardTypes.NEWS, image, title, text, date, cta }) => {
  return (
    <div
      className={classNames('Card', css.root, className, {
        [css.product]: cardType === CardTypes.PRODUCT_LARGE,
        [css.news]: cardType === CardTypes.NEWS,
        [css.office]: cardType === CardTypes.OFFICE
      })}
    >
      <BaseImage {...image} className={css.image} />
      <div className={css.textWrapper}>
        <div className={css.titleWrapper}>
          {date && <span className={css.date}>{date}</span>}
          <span className={css.title}>{title}</span>
        </div>

        <p className={css.text}>{text}</p>

        {cardType === CardTypes.PRODUCT_LARGE && <Cta theme={ButtonType.Secondary} {...cta} />}
      </div>
    </div>
  );
};

export default memo(Card);
