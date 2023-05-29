import { FC, memo, useMemo } from 'react';
import classNames from 'classnames';

import css from './Card.module.scss';

import { ContentfulImageAsset } from '@/data/types';

import BaseLink, { Props as LinkProps } from '@/components/BaseLink/BaseLink';
import Cta, { ButtonType } from '@/components/Cta/Cta';

import ContentfulImage from '../ContentfulImage/ContentfulImage';

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
  image: ContentfulImageAsset;
  title: string;
  text: string;
  date?: string;
  subTitle?: string;
  cta?: LinkProps;
  columns?: number;
};

const Card: FC<CardProps> = ({
  className,
  cardType = CardTypes.NEWS,
  image,
  title,
  subTitle,
  text,
  date,
  cta,
  columns
}) => {
  const innerContent = useMemo(() => {
    return (
      <>
        <ContentfulImage
          asset={image}
          className={css.image}
          imageSizeDesktop={{ numCols: 12 / (columns ?? 1), extraGutters: 0 }}
          imageSizeTablet={{ numCols: 8 / (columns ?? 1), extraGutters: 0 }}
          imageSizeMobile={{ numCols: 4 / (columns ?? 1), extraGutters: 0 }}
        />
        <div className={css.textWrapper}>
          {cardType === CardTypes.QUOTE && <p className={css.text}>{'"' + text + '"'}</p>}
          <div className={css.titleWrapper}>
            {date && <span className={css.date}>{date}</span>}
            <span className={css.title}>{title}</span>
            {cardType === CardTypes.QUOTE && subTitle && <span className={css.subTitle}>{subTitle}</span>}
          </div>

          {cardType !== CardTypes.QUOTE && <p className={css.text}>{text}</p>}

          {cardType !== CardTypes.NEWS && cta?.href && cta?.title && (
            <Cta {...cta} className={css.cta} theme={ButtonType.Secondary} isInteractable={false} />
          )}
        </div>
      </>
    );
  }, [cardType, columns, cta, date, image, subTitle, text, title]);

  if (cta?.href) {
    return (
      <BaseLink className={classNames(css.Card, className, css[cardType])} {...cta}>
        {innerContent}
      </BaseLink>
    );
  }

  return <div className={classNames(css.Card, className, css[cardType])}>{innerContent}</div>;
};

export default memo(Card);
