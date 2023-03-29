import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './FeaturedArticles.module.scss';

import { Props as LinkProps } from '@/components/BaseLink/BaseLink';
import Card, { CardProps } from '@/components/Card/Card';
import Cta, { ButtonType } from '@/components/Cta/Cta';
import Eyebrow from '@/components/Eyebrow/Eyebrow';

export type FeaturedArticlesProps = {
  className?: string;
  eyebrow: string;
  title: string;
  cta: LinkProps;
  cards: CardProps[];
};

const FeaturedArticles: FC<FeaturedArticlesProps> = ({ className, eyebrow, title, cta, cards }) => {
  return (
    <section className={classNames('FeaturedArticles', css.root, className)}>
      <Eyebrow className={css.eyebrow} text={eyebrow} />
      <div className={css.container}>
        <div className={css.wrapper}>
          <h2 className={css.title}>{title}</h2>
          <Cta className={css.cta} theme={ButtonType.Primary} {...cta} />
        </div>

        <ul className={css.cardList}>
          {cards.map((cardItem, index) => {
            return (
              <li className={css.card} key={index}>
                <Card {...cardItem} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default memo(FeaturedArticles);
