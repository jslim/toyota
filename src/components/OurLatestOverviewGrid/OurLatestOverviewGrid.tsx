import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import css from './OurLatestOverviewGrid.module.scss';

import { FilteredEntity, GenericEntity, GenericObject, Lang, OurLatestPostPageContentType } from '@/data/types';

import { CardProps, CardTypes } from '@/components/Card/Card';
import CardGrid from '@/components/CardGrid/CardGrid';
import Cta from '@/components/Cta/Cta';
import OurLatestOverviewFilters, {
  OurLatestFilterButtons
} from '@/components/OurLatestOverviewFilters/OurLatestOverviewFilters';
import SectionWrapper from '@/components/SectionWrapper/SectionWrapper';

import { Color } from '@/utils/colors';
import { buildNewsCard } from '@/utils/parsers/block-builders';
import resolveResponse, { makeFilteredEntity } from '@/utils/parsers/response-parser-util';

import { useAppSelector } from '@/redux';

/* eslint-disable */
// @ts-ignore: populated during prebuild
import postDataEn from '@/json/our-latest-posts-en.json';
// @ts-ignore: populated during prebuild
import postDataJP from '@/json/our-latest-posts-jp.json';
/* eslint-enable */

export type TopicFilters = {
  [key: string]: {
    count: number;
  };
};

export type OurLatestOverviewGridProps = {
  topicsLabel: string;
  categoriesLabel: string;
  sectionTitle: string;
  filtersLabel: string;
  allLabel: string;
  newsLabel: string;
  blogLabel: string;
  researchLabel: string;
  loadMoreLabel: string;
};

const postsEn = resolveResponse(postDataEn);
const postsJP = resolveResponse(postDataJP);

const POSTS_PER_PAGE = 6;

const generateCardProps = (unfilteredCards: Array<GenericEntity<GenericObject>>) => {
  return unfilteredCards?.map((card) => {
    return makeFilteredEntity(card) as FilteredEntity<OurLatestPostPageContentType>;
  });
};

const OurLatestOverviewGrid: FC<OurLatestOverviewGridProps> = ({
  topicsLabel,
  categoriesLabel,
  sectionTitle,
  filtersLabel,
  allLabel,
  newsLabel,
  blogLabel,
  researchLabel,
  loadMoreLabel
}) => {
  const [page, setPage] = useState(1);
  const [cardCount, setCardCount] = useState(0);
  const router = useRouter();
  const activeLang = useAppSelector((state) => state.activeLang);
  const [allCards, setAllCards] = useState<Array<FilteredEntity<OurLatestPostPageContentType>>>([]);
  const [filteredCards, setFilteredCards] = useState<Array<CardProps>>(
    activeLang === Lang.EN
      ? generateCardProps(postsEn).map((el) => buildNewsCard(el.fields, { lang: activeLang }).props as CardProps)
      : generateCardProps(postsJP).map((el) => buildNewsCard(el.fields, { lang: activeLang }).props as CardProps)
  );
  const [topics, setTopics] = useState<Array<OurLatestFilterButtons>>([]);

  const handleOnClick = useCallback(() => {
    setPage((page) => (page * POSTS_PER_PAGE < filteredCards.length ? page + 1 : page));
  }, [setPage, filteredCards]);

  useEffect(() => {
    setAllCards(activeLang === Lang.EN ? generateCardProps(postsEn) : generateCardProps(postsJP));
  }, [activeLang, setAllCards]);

  useEffect(() => {
    let tempCards: Array<CardProps> = [];
    let tempCardCount = 0;
    const filters: TopicFilters = {};

    const category = router?.query?.category;
    const topics = router?.query?.topic;

    allCards.forEach((card) => {
      // If we card isn't in active category escape early
      if (category && card.fields.category !== category) return false;

      // Increase card count for any card within same category
      tempCardCount++;

      card?.fields?.topic?.forEach((topic) => {
        if (!filters[topic]) {
          filters[topic] = { count: 1 };
        } else {
          filters[topic].count++;
        }
      });

      // Exit early if there's a topic set and the card doesn't match it
      if (
        topics &&
        (card.fields?.topic?.indexOf(Array.isArray(topics) ? topics[0] : topics) === -1 || card.fields.topic == null)
      ) {
        return false;
      }

      const props = buildNewsCard(card.fields, { lang: activeLang }).props as CardProps;
      tempCards.push(props);

      setCardCount(tempCardCount);
    });

    // Ensure we're ordering by the custom publish date and not when the post was created
    tempCards.sort((a, b) => {
      const first = new Date(a.date!).getTime();
      const second = new Date(b.date!).getTime();
      return second - first;
    });

    setFilteredCards(tempCards);
    setTopics(Object.keys(filters).map((el) => ({ title: el, articleCount: filters[el].count, category: 'topic' })));
  }, [allCards, activeLang, router]);

  const categories: Array<OurLatestFilterButtons> = [
    { displayTitle: newsLabel, title: 'News', category: 'category' },
    { displayTitle: blogLabel, title: 'Blog', category: 'category' },
    { displayTitle: researchLabel, title: 'Research', category: 'category' }
  ];

  return (
    <SectionWrapper backgroundColor={Color.WHITE} title={sectionTitle}>
      <OurLatestOverviewFilters
        categoryTitle={categoriesLabel}
        categories={categories}
        categoryQuery="category" // don't localize
        topicTitle={topicsLabel}
        topics={topics}
        topicQuery="topic" // don't localize
        totalCards={cardCount}
        filtersLabel={filtersLabel}
        allLabel={allLabel}
      />
      <CardGrid cardType={CardTypes.NEWS} cards={filteredCards.filter((_el, i) => i < page * POSTS_PER_PAGE)} />
      {page * POSTS_PER_PAGE <= filteredCards.length && (
        <Cta
          className={css.loadMore}
          title={loadMoreLabel}
          onClick={() => handleOnClick()}
          isDisabled={page * POSTS_PER_PAGE >= filteredCards.length}
        />
      )}
    </SectionWrapper>
  );
};

export default memo(OurLatestOverviewGrid);
