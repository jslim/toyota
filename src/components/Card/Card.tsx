import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './Card.module.scss';

import BaseImage, { BaseImageProps } from '@/components/BaseImage/BaseImage';
import BaseLink, { Props as LinkProps } from '@/components/BaseLink/BaseLink';
import Cta, { ButtonType } from '@/components/Cta/Cta';

export enum CardTypes {
  NEWS = 'news',
  PRODUCT = 'product',
  DEFAULT = 'default',
  DEFAULTTALL = 'default-tall',
  QUOTE = 'quote',
  MILESTONE = 'milestone'
}

export type CardProps = {
  className?: string;
  cardType?: string;
  image: BaseImageProps;
  title: string;
  text: string;
  date?: string;
  subTitle?: string;
  cta?: LinkProps;
};

const Card: FC<CardProps> = ({ className, cardType = CardTypes.NEWS, image, title, subTitle, text, date, cta }) => {
  const InnerContent = () => {
    return (
      <>
        <BaseImage {...image} className={css.image} />
        <div className={css.textWrapper}>
          <div className={css.titleWrapper}>
            {date && <span className={css.date}>{date}</span>}
            <span className={css.title}>{title}</span>
            {cardType === CardTypes.QUOTE && subTitle && <span className={css.subTitle}>{subTitle}</span>}
          </div>

          <p className={css.text}>{cardType === CardTypes.QUOTE ? '"' + text + '"' : text}</p>
          {cardType !== CardTypes.NEWS && cta && (
            <Cta {...cta} className={css.cta} theme={ButtonType.Secondary} isInteractable={false} />
          )}
        </div>
      </>
    );
  };

  if (cta) {
    return (
      <BaseLink className={classNames(css.Card, className, css[cardType])} {...cta}>
        <InnerContent />
      </BaseLink>
    );
  }

  return (
    <div className={classNames(css.Card, className, css[cardType])}>
      <InnerContent />
    </div>
  );
};

export default memo(Card);
