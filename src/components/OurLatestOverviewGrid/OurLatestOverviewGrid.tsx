import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { FilteredEntity, GenericEntity, GenericObject, Lang, OurLatestPostPageContentType } from '@/data/types';

import { CardProps, CardTypes } from '@/components/Card/Card';
import CardGrid from '@/components/CardGrid/CardGrid';
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
};

const postsEn = resolveResponse(postDataEn);
const postsJP = resolveResponse(postDataJP);

const OurLatestOverviewGrid: FC<OurLatestOverviewGridProps> = ({
  topicsLabel,
  categoriesLabel,
  sectionTitle,
  filtersLabel,
  allLabel,
  newsLabel,
  blogLabel,
  researchLabel
}) => {
  const router = useRouter();
  const activeLang = useAppSelector((state) => state.activeLang);
  const [allCards, setAllCards] = useState<Array<FilteredEntity<OurLatestPostPageContentType>>>([]);
  const [filteredCards, setFilteredCards] = useState<Array<CardProps>>([]);
  const [topics, setTopics] = useState<Array<OurLatestFilterButtons>>([]);

  const generateCardProps = useCallback((unfilteredCards: Array<GenericEntity<GenericObject>>) => {
    setAllCards(
      unfilteredCards?.map((card) => {
        return makeFilteredEntity(card) as FilteredEntity<OurLatestPostPageContentType>;
      })
    );
  }, []);

  useEffect(() => {
    if (allCards?.length !== 0) return;
    activeLang === Lang.EN ? generateCardProps(postsEn) : generateCardProps(postsJP);
  }, [activeLang, setAllCards, allCards, generateCardProps]);

  useEffect(() => {
    let tempCards: Array<CardProps> = [];
    const filters: TopicFilters = {};

    allCards.forEach((card) => {
      const category = router?.query?.category;
      const topics = router?.query?.topic;

      // If we card isn't in active category escape early
      if (category && card.fields.category !== category) return false;

      card?.fields?.topic?.forEach((topic) => {
        if (!filters[topic]) {
          filters[topic] = { count: 1 };
        } else {
          filters[topic].count++;
        }
      });

      // if there's a topic set, ensure we're matching it and update active cards
      if (!(topics && card.fields?.topic?.indexOf(topics[0]) === -1)) {
        const props = buildNewsCard(card.fields, { lang: activeLang }).props as CardProps;
        tempCards.push(props);
      }
    });

    setFilteredCards(tempCards);
    setTopics(Object.keys(filters).map((el) => ({ title: el, articleCount: filters[el].count, category: 'topic' })));
  }, [allCards, activeLang, router]);

  const categories = [
    { title: newsLabel, category: 'category' },
    { title: blogLabel, category: 'category' },
    { title: researchLabel, category: 'category' }
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
        totalCards={filteredCards?.length || 0}
        filtersLabel={filtersLabel}
        allLabel={allLabel}
      />
      <CardGrid cardType={CardTypes.NEWS} cards={filteredCards} />
    </SectionWrapper>
  );
};

export default memo(OurLatestOverviewGrid);
