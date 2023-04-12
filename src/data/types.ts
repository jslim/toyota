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

export type GlobalDataFields = {
  mainNavLinks: Array<NavLinks>;
  footerNavLinks: Array<NavLinks>;
  skipToContentText: string;
};

export type GlobalData = {
  [key in Lang]: GlobalDataFields;
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
};

export type LeaderPageContentType = {
  pageTitle: string;
  slug: string;
};

export type LegalPageContentType = {
  pageTitle: string;
  slug: string;
};

export type OurLatestPageContentType = {
  pageTitle: string;
  slug: string;
};

export type OurLatestPostPageContentType = {
  pageTitle: string;
  slug: string;
};

// Contentful Component Content Types
export type GlobalDataContentType = {
  mainNavLinks: Array<GenericEntity<CTAContentType>>;
  footerNavLinks: Array<GenericEntity<CTAContentType>>;
  skipToContentText: string;
};

export type CTAContentType = {
  linkText?: string;
  linkUrl: string;
  ariaLabel?: string;
};

export type NextChapterContentType = {
  linkUrl: string;
  eyebrowText: string;
  titleText: string;
  backgroundImage: ContentfulImageAsset;
};

export type TextBlockContentType = {
  heading?: string;
  eyebrowText?: string;
  textContent?: string;
};

export type SectionContentType = {
  displayTitle?: string;
  eyebrowText?: string;
  innerBlocks: Array<GenericEntity>;
  colorBackground?: Array<string>;
};

export type TabItemContentType = {
  tabTitle: string;
  innerBlocks: Array<GenericEntity>;
};

export type TabGroupContentType = {
  innerBlocks: Array<GenericEntity<TabGroupContentType>>;
};

export type AccordionItemContentType = {
  title: string;
  hiddenContent?: string;
};

export type AccordionGroupContentType = {
  colorBackground: Array<string>;
  title: string;
  innerBlocks: Array<GenericEntity<AccordionItemContentType>>;
};

export type MediaGalleryItemContentType = {
  title: string;
  image: ContentfulImageAsset;
  video: unknown; // TODO: Add video asset type
};

export type MediaGalleryGroupContentType = {
  title: string;
  innerBlocks: Array<GenericEntity<MediaGalleryItemContentType>>;
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
};

export type RoadmapGroupContentType = {
  title: string;
  eyebrow: string;
  items: Array<GenericEntity<RoadmapItemContentType>>;
};
