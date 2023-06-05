import { Document } from '@contentful/rich-text-types';

import { CardTypes } from '@/components/Card/Card';

import { SocialPlatform } from './variants';

export type HeadProps = {
  title: string;
  image?: string;
  keywords?: string[];
  siteName?: string;
  description?: string;
};

export type GridSize = {
  numCols: number;
  extraGutters: number;
};

export type NavLinks = CTAContentType & {
  isActive: boolean;
};

export type SocialLinks = CTAContentType & {
  platform: SocialPlatform;
};

export type Job = {
  categories: {
    department: string;
    location: string;
    team: string;
    commitment?: string;
  };
  text: string;
  applyUrl: string;
  id: string;
  workplaceType?: string;
  description?: string;
};

export type GlobalDataFields = {
  mainNavLinks: Array<NavLinks>;
  footerNavLinks: Array<NavLinks>;
  footerLegalLinks: Array<NavLinks>;
  footerSocialLinks: Array<SocialLinks>;
  footerOfficeLocations: Array<string>;
  footerCookiebotToggleLabel: string;
  companyName: string;
  homepageBannerText: string | Document;
  showHomepageBanner: boolean;
  skipToContentText: string;
  notFoundPageHeader: string;
  notFoundPageDescription: string;
  notFoundPageButton: string;
  defaultPageMetadata: HeadProps;
  toyotaGlobalLink: NavLinks;
  toyotaGlobalLogo?: ContentfulImageAsset;
  wovenCityLink: NavLinks;
  wovenCityLogo?: ContentfulImageAsset;
  wovenCapitalLink: NavLinks;
  wovenCapitalLogo?: ContentfulImageAsset;
  languageToggleEnglish: string;
  languageToggleJapanese: string;
};

export type GlobalData = {
  [key in Lang]: GlobalDataFields;
};

export type GlobalStringsFields = {
  shareText: string;
  copyLink: string;
  copyLinkSuccess: string;
  relatedNews: string;
  emailShareSubject: string;
  emailShareBody: string;
  downloadAssets: string;
  drag: string;
  learnMore: string;
  downloadAgreementTitle: string;
  downloadAgreementLabel: string;
  downloadAgreementTerms: string;
  downloadAgreementCloseLabel: string;
  downloadAgreementCallToActionTitle: string;
};

export type GlobalStrings = {
  [key in Lang]: GlobalStringsFields;
};

export type PageProps = {
  head: HeadProps;
  unsupported?: boolean;
};

export type PreviewURLParamsType = {
  spaceId: string;
  envId: string;
  entryId: string;
  previewToken: string;
};

// While annoying, we can't be sure on type signature of full response
export type GenericObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

// Contentful Types
export type Sys = {
  type?: string;
  id?: string;
  linkType?: string;
  contentType?: { ['sys']: Sys };
  locale?: Locale | string;
};

export type Metadata = {
  tags: Array<Sys>;
};

export type GenericEntity<T = GenericObject> = {
  sys: Sys;
  metadata?: Metadata;
  fields?: T;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FilteredEntity<T = any> = {
  id: string;
  contentType: string;
  fields: T;
  locale: Locale | string;
};

export type EntityMap = Map<string, FilteredEntity>;

export type Response = {
  limit: number;
  skip: number;
  sys: Sys;
  items: Array<GenericEntity>;
  includes?: {
    [key: string]: Array<GenericEntity>;
  };
};

export type ContentfulOptions = {
  removeUnresolved: boolean;
  itemEntryPoints?: Array<string>;
};

export enum Locale {
  EN = 'en-US',
  JP = 'ja-JP'
}

export enum Lang {
  EN = 'en',
  JP = 'jp'
}

export type LangLocaleMap = {
  [key in Lang]: Locale;
};

interface ParsedUrlQuery {
  [key: string]: string | string[];
}

export interface LocalizedPageParams extends ParsedUrlQuery {
  lang: Lang;
}

export interface NestedLocalizedPageParams extends LocalizedPageParams {
  [key: string]: string | Array<string>;
}

export type ContentfulImageAsset = {
  metadata: Metadata;
  sys: Sys;
  fields: {
    title: string;
    description: string;
    file: {
      fileName: string;
      url: string;
      contentType: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
    };
  };
};

export type ContentfulVideoAsset = {
  metadata: Metadata;
  sys: Sys;
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
      };
      fileName: string;
      contentType: string;
    };
  };
};

export type ContentfulMediaAsset = {
  locale?: string;
  metadata: Metadata;
  sys: Sys;
  fields: {
    title: string;
    description: string;
    file: {
      fileName: string;
      url: string;
      contentType: string;
      details: {
        size: number;
      };
    };
  };
};

export type PageType = {
  data: FilteredEntity;
};

// Contentful "Page" Content Types
export type TestsPageContentType = {
  pageTitle: string;
  nextChapter: FilteredEntity<NextChapterContentType>;
  innerBlocks: Array<FilteredEntity>;
};

export type DefaultPageContentType = {
  pageTitle: string;
  slug: string;
  innerBlocks: Array<FilteredEntity>;
  nextChapter: FilteredEntity<NextChapterContentType>;
  metadata: FilteredEntity<PageMetadataContentType>;
};

export type LeaderPageContentType = {
  leaderName: string;
  slug: string;
  role: string;
  shortRole: string;
  headshot: ContentfulImageAsset;
  leftSideBio: Document;
  rightSideBio: Document;
  featuredArticles: FilteredEntity<FeaturedArticlesContentyType>;
  metadata: FilteredEntity<PageMetadataContentType>;
};

export type LegalPageContentType = {
  pageTitle: string;
  slug: string;
};

export type ArticleDownloadAssetsContentType = {
  eyebrowText: string;
  downloadButtonText: string;
  assets: Array<ContentfulImageAsset>;
};

export type OurLatestPageContentType = {
  pageTitle: string;
  slug: string;
  featuredArticle: FilteredEntity<OurLatestPostPageContentType>;
  mediaKit: FilteredEntity<MediaKitContentType>;
  metadata: FilteredEntity<PageMetadataContentType>;
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

export type OurLatestPostPageContentType = {
  articleAssets: FilteredEntity<ArticleDownloadAssetsContentType>;
  pinnedPosts: Array<{ sys: Pick<Sys, 'id' | 'linkType' | 'contentType'> }>;
  body: Document;
  pageTitle: string;
  slug: string;
  category: 'News' | 'Blog' | 'Research';
  topic: Array<string>;
  thumbnail: ContentfulImageAsset;
  publishDate: string;
  metadata: FilteredEntity<PageMetadataContentType>;
};

// Contentful Component Content Types
export type GlobalDataContentType = {
  mainNavLinks: Array<FilteredEntity<CTAContentType>>;
  footerNavLinks: Array<FilteredEntity<CTAContentType>>;
  footerLegalLinks: Array<FilteredEntity<CTAContentType>>;
  footerSocialLinks: Array<FilteredEntity<CTAContentType>>;
  footerOfficeLocations: Array<string>;
  footerCookiebotToggleLabel: string;
  companyName: string;
  homepageBannerText: string | Document;
  showHomepageBanner: boolean;
  skipToContentText: string;
  notFoundPageHeader: string;
  notFoundPageDescription: string;
  notFoundPageButton: string;
  defaultPageMetadata: FilteredEntity<PageMetadataContentType>;
  toyotaGlobalLink: FilteredEntity<CTAContentType>;
  toyotaGlobalLogo: ContentfulImageAsset;
  wovenCityLink: FilteredEntity<CTAContentType>;
  wovenCityLogo: ContentfulImageAsset;
  wovenCapitalLink: FilteredEntity<CTAContentType>;
  wovenCapitalLogo: ContentfulImageAsset;
  languageToggleEnglish: string;
  languageToggleJapanese: string;
};

export type CTAContentType = {
  linkText?: string;
  linkUrl: string;
  ariaLabel?: string;
  linkToPage?: FilteredEntity;
  jumpToLink?: boolean;
};

export type NextChapterContentType = {
  linkUrl: string;
  eyebrowText: string;
  titleText: string;
  backgroundImage: ContentfulImageAsset;
};

export type SectionContentType = {
  displayTitle?: string;
  eyebrowText?: string;
  innerBlocks: Array<FilteredEntity>;
  colorBackground?: Array<string>;
  targetId?: string;
};

export type TabItemContentType = {
  tabTitle: string;
  innerBlocks: Array<FilteredEntity>;
};

export type TabGroupContentType = {
  innerBlocks: Array<FilteredEntity<TabGroupContentType>>;
};

export type AccordionItemContentType = {
  title: string;
  hiddenContent?: string;
};

export type AccordionGroupContentType = {
  colorBackground: Array<string>;
  title: string;
  innerBlocks: Array<FilteredEntity<AccordionItemContentType>>;
};

export type MediaKitItemContentType = {
  title: string;
  date: string;
  filesSize: string;
  asset?: ContentfulMediaAsset;
  link?: string;
};

export type MediaKitContentType = {
  innerBlocks: Array<FilteredEntity<MediaKitItemContentType>>;
};

export type MediaGalleryItemContentType = {
  title: string;
  image: ContentfulImageAsset;
  video: ContentfulVideoAsset;
};

export type MediaGalleryGroupContentType = {
  title: string;
  mediaItems: Array<FilteredEntity<MediaGalleryItemContentType>>;
};

export type YoutubeEmbedContentType = {
  embedId: string;
};

export type TextIntroContentType = {
  eyebrow: string;
  header: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
  layout: string;
};

export type RoadmapItemContentType = {
  title: string;
  text: string;
  svg: ContentfulImageAsset;
  image: ContentfulImageAsset;
};

export type RoadmapGroupContentType = {
  title: string;
  eyebrow: string;
  theme: string;
  cta: FilteredEntity<CTAContentType>;
  items: Array<FilteredEntity<RoadmapItemContentType>>;
};

export type CardContentType = {
  title: string;
  text: string;
  subTitle: string;
  cta: FilteredEntity<CTAContentType>;
  image: ContentfulImageAsset;
  date: string;
};

export type CardGalleryContentType = {
  cards: Array<FilteredEntity<CardContentType>>;
};

export type CardGridContentType = {
  title: string;
  cardType: CardTypes;
  cards: Array<FilteredEntity<CardContentType>>;
};

export type CareersListContentType = {
  title: string;
  eyebrowText: string;
  filtersLabel: string;
  searchLabel: string;
  cleanLabel: string;
  noResultsLabel: string;
  noResultsDescription: string;
};

export type FeatureListItemContentType = {
  title: string;
  text: string;
};

export type FeatureListContentType = {
  title: string;
  eyebrow: string;
  items: Array<FilteredEntity<FeatureListItemContentType>>;
};

export type ProductListRowContentType = {
  title: string;
  text: string;
  image: ContentfulImageAsset;
  ctaLink: string;
};

export type ProductListContentType = {
  title: string;
  eyebrow: string;
  productListRow: Array<FilteredEntity<ProductListRowContentType>>;
};

export type HeroFeaturedContentType = {
  date: string;
  title: string;
  cat: string;
};

export type HeroContentType = {
  title: string;
  image: ContentfulImageAsset;
  video?: ContentfulVideoAsset;
  theme: string;
  featured: FilteredEntity<OurLatestPostPageContentType>;
};

export type richTextContentType = {
  richtext: Document;
};

export type videoPlayerContainerContentType = {
  poster: ContentfulImageAsset;
  title: string;
  theme: string;
  video: ContentfulVideoAsset;
  closedCaptions: ContentfulMediaAsset;
};
export type videoPlayerSectionContentType = {
  eyebrow?: string;
  quote: string;
  author: string;
  videoPlayerSection: FilteredEntity<videoPlayerContainerContentType>;
};

export type ColumnsTextContentType = {
  leftSide: Document;
  rightSide: Document;
  eyebrow: string;
  theme: string;
};

export type spacerContentType = {
  size: string;
};

export type FeaturedArticlesContentyType = {
  eyebrow: string;
  heading: string;
  cta?: FilteredEntity<CTAContentType>;
  newsPosts: FilteredEntity<OurLatestPostPageContentType>[];
};

export type BoardMembersContentType = {
  name: string;
  roletitle: string;
};

export type LeadershipModuleContentType = {
  title: string;
  eyebrowText: string;
  description: string;
  boardOfDirectorsSectionTitle?: string;
  boardMembers: Array<FilteredEntity<BoardMembersContentType>>;
  leaders: Array<FilteredEntity<LeaderPageContentType>>;
};

export type HistoryTimelineSlideContentType = {
  title: string;
  text: string;
  cta: FilteredEntity<CTAContentType>;
  image: ContentfulImageAsset;
  year: string;
};

export type HistoryTimelineContentType = {
  eyebrowText: string;
  title: string;
  slides: Array<FilteredEntity<HistoryTimelineSlideContentType>>;
};

export type PageMetadataContentType = {
  metaTitle?: string;
  metaDescription?: string;
  metaSiteName?: string;
  metaKeywords?: Array<string>;
  metaShareImage?: FilteredEntity<ContentfulImageAsset>;
};

export type ThirdPartyScriptContentType = {
  sourceUrl?: string;
  scriptId?: string;
};
