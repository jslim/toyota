import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './Card.module.scss';

import BaseImage from '@/components/BaseImage/BaseImage';
import BaseLink, { Props as LinkProps } from '@/components/BaseLink/BaseLink';
import Cta, { ButtonType } from '@/components/Cta/Cta';

export enum CardTypes {
  NEWS = 'news',
  PRODUCT = 'product',
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
  const InnerContent = () => {
    return (
      <>
        <BaseImage {...image} className={css.image} />
        <div className={css.textWrapper}>
          <div className={css.titleWrapper}>
            {date && <span className={css.date}>{date}</span>}
            <span className={css.title}>{title}</span>
          </div>

          <p className={css.text}>{text}</p>
          {cardType === CardTypes.PRODUCT && <Cta className={css.cta} theme={ButtonType.Secondary} {...cta} />}
        </div>
      </>
    );
  };

  if (cardType === CardTypes.NEWS) {
    return (
      <BaseLink className={classNames('Card', css.root, className, css.news)} {...cta}>
        <InnerContent />
      </BaseLink>
    );
  }

  return (
    <div
      className={classNames('Card', css.root, className, {
        [css.product]: cardType === CardTypes.PRODUCT,
        [css.office]: cardType === CardTypes.OFFICE
      })}
    >
      <InnerContent />
    </div>
  );
};

export default memo(Card);
