import { ReactNode } from 'react';

import { FilteredEntity, GlobalStringsFields, Lang, Locale } from '@/data/types';

import {
  buildAccordionGroup,
  buildAccordionItem,
  buildCallToAction,
  buildCardGallery,
  buildCardGrid,
  buildCareersList,
  buildColumnsText,
  buildDefaultPage,
  buildFeaturedArticles,
  buildFeatureList,
  buildHero,
  buildHistoryTimeline,
  buildImageBlock,
  buildLeaderPage,
  buildLeadershipModule,
  buildMediaGalleryGroup,
  buildMediaKit,
  buildNextChapter,
  buildOurLatestOverview,
  buildOurLatestPostPage,
  buildProductList,
  buildRichTextComponent,
  buildRoadmapGroup,
  buildSectionWrapper,
  buildSpacer,
  buildTabGroup,
  buildTabItem,
  buildTestPage,
  buildTextIntro,
  buildThirdPartScript,
  buildVideoPlayerSection,
  buildYoutubeIframe,
  ComponentBuilderFactory
} from './block-builders';

// Key should be the content type ID set in Contentful
const componentFactories: { [key: string]: ComponentBuilderFactory } = {
  nextChapter: buildNextChapter,
  accordionItem: buildAccordionItem,
  accordionGroup: buildAccordionGroup,
  mediaKit: buildMediaKit,
  section: buildSectionWrapper,
  tabGroup: buildTabGroup,
  tabItem: buildTabItem,
  testPage: buildTestPage,
  defaultPage: buildDefaultPage,
  cardGallery: buildCardGallery,
  cardGrid: buildCardGrid,
  careersList: buildCareersList,
  imageBlock: buildImageBlock,
  textIntro: buildTextIntro,
  roadmapGroup: buildRoadmapGroup,
  featureList: buildFeatureList,
  productList: buildProductList,
  mediaGalleryGroup: buildMediaGalleryGroup,
  youtubeEmbed: buildYoutubeIframe,
  hero: buildHero,
  richTextTest: buildRichTextComponent,
  videoPlayerSection: buildVideoPlayerSection,
  columnsText: buildColumnsText,
  spacer: buildSpacer,
  featuredArticles: buildFeaturedArticles,
  leaderPage: buildLeaderPage,
  leadershipModule: buildLeadershipModule,
  historyTimeline: buildHistoryTimeline,
  ourLatestPagePost: buildOurLatestPostPage,
  callToAction: buildCallToAction,
  ourLatestPage: buildOurLatestOverview,
  thirdPartyScript: buildThirdPartScript
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntity = (field: any) => field.id && field.contentType && field.fields;

/**
 * Walks through a FilteredEntity object and builds up component structure based on each entity's content type.
 *
 * @param entry - FilteredEntity to recursively build out
 * @returns - Component to render
 */
export const getPageBlocks = (entry: FilteredEntity, globalStrings?: GlobalStringsFields): JSX.Element | null => {
  if (entry == null) return null;
  const { contentType, fields, locale } = entry;
  if (!contentType || !componentFactories[contentType]) return null;

  const lang = locale === Locale.EN ? Lang.EN : Lang.JP;

  const {
    props,
    component: Component,
    childrenFields
  } = componentFactories[contentType](entry.fields, { lang, globalStrings });
  let Children: Array<JSX.Element | null | string | ReactNode> = [];

  /**
   * For each entity we want to iterate over their fields and do one of three things:
   *
   * 1. If the field is an Entity assume it's a direct reference field and call getPageBlocks
   * 2. If the field is an innerBlocks field pass those blocks to getPageBlocks and add to children
   * 3. If the field is marked as being a child field in the builder, push that into children
   *
   * This allows us to keep the order of the fields on the content type.
   */
  Object.keys(fields).forEach((fieldId: string) => {
    if (childrenFields?.[fieldId]) {
      // Specific fields set in the current ComponentBuilder that should be passed as children instead of a prop.
      Children.push(childrenFields[fieldId]);
    } else if (isEntity(fields[fieldId])) {
      // Single referenced field
      Children.push(getPageBlocks(fields[fieldId], globalStrings));
    } else {
      // Array of referenced children items to build recursively
      if (fieldId === 'innerBlocks' && Array.isArray(fields[fieldId])) {
        fields.innerBlocks.forEach((block: FilteredEntity) => Children.push(getPageBlocks(block, globalStrings)));
      }
    }
  });

  return (
    <Component {...props} key={(Math.random() * 1000).toFixed(3)}>
      {Children}
    </Component>
  );
};
