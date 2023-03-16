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
};

export type Metadata = {
  tags: Array<Sys>;
};

export type EntityMap = Map<string, object>;

export type GenericEntity = {
  sys: Sys;
  metadata?: Metadata;
  fields?: GenericObject;
};

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
