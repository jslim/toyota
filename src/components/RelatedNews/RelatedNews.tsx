import { FC, memo, useEffect, useState } from 'react';

import { FilteredEntity, GenericEntity, Lang, Sys } from '@/data/types';

import { CardProps } from '@/components/Card/Card';
import FeaturedArticles from '@/components/FeaturedArticles/FeaturedArticles';

import { buildNewsCard } from '@/utils/parsers/block-builders';
import resolveResponse, { makeFilteredEntity } from '@/utils/parsers/response-parser-util';

import { useAppSelector } from '@/redux';

/* eslint-disable */
// @ts-ignore: populated during prebuild
import postDataEn from '@/json/our-latest-posts-en.json';
// @ts-ignore: populated during prebuild
import postDataJp from '@/json/our-latest-posts-jp.json';
/* eslint-enable */

export type RelatedNewsProps = {
  pinnedPosts: Array<{ sys: Pick<Sys, 'type' | 'linkType' | 'id'> }>;
  category: string;
  topics: Array<string>;
};
const RelatedNews: FC<RelatedNewsProps> = ({ pinnedPosts }) => {
  const { relatedNews } = useAppSelector((state) => state.activeGlobalStrings);
  const activeLang = useAppSelector((state) => state.activeLang);
  const [cards, setCards] = useState<Array<CardProps>>([]);
  const [postData, setPostData] = useState<Array<GenericEntity> | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resolvedData: any = activeLang === Lang.EN ? postDataEn : postDataJp;

    setPostData(resolveResponse(resolvedData));
  }, [activeLang]);

  useEffect(() => {
    let tempCards: Array<CardProps> = [];

    const updateCards = () => {
      if (!pinnedPosts || !postData) return;
      const pinnedCards: Array<FilteredEntity> = postData
        .filter((el) => pinnedPosts.some((post) => post?.sys?.id === el.sys?.id))
        .map((el) => makeFilteredEntity(el));

      // 2. Build out cards
      // Default to user-specified posts
      for (let i = 0; i < Math.min(pinnedCards.length, 3); i++) {
        tempCards.push(buildNewsCard(pinnedCards[i].fields, { lang: activeLang }).props as CardProps);
      }
    };

    updateCards();

    setCards(tempCards);
  }, [pinnedPosts, activeLang, postData]);

  return cards.length > 0 ? <FeaturedArticles cards={cards} title={relatedNews} /> : null;
};

export default memo(RelatedNews);
