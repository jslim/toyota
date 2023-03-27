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

export type GlobalData = {
  mainNavLinks: Array<CTAContentType>;
  footerNavLinks: Array<CTAContentType>;
};

export type PageProps = {
  head: HeadProps;
  unsupported?: boolean;
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

export type FilteredEntity<T = GenericObject> = {
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

// Contentful Content Types
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
