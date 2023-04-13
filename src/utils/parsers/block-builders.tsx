import { FC } from 'react';

import {
  AccordionGroupContentType,
  AccordionItemContentType,
  CardGridContentType,
  ContentfulImageAsset,
  DefaultPageContentType,
  FeatureListContentType,
  GenericObject,
  HeroContentType,
  MediaGalleryGroupContentType,
  NextChapterContentType,
  ProductListContentType,
  RoadmapGroupContentType,
  SectionContentType,
  TabGroupContentType,
  TabItemContentType,
  TestsPageContentType,
  TextBlockContentType,
  TextIntroContentType
} from '@/data/types';
import { variants } from '@/data/variants';

import Accordion, { AccordionItem } from '@/components/Accordion/Accordion';
import CardGrid from '@/components/CardGrid/CardGrid';
import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';
import FeaturesList from '@/components/FeaturesList/FeaturesList';
import GalleryVideo from '@/components/GalleryVideo/GalleryVideo';
import Hero from '@/components/Hero/Hero';
import NextChapter from '@/components/NextChapter/NextChapter';
import ProductList from '@/components/ProductList/ProductList';
import Roadmap from '@/components/Roadmap/Roadmap';
import SectionWrapper from '@/components/SectionWrapper/SectionWrapper';
import Tabs from '@/components/Tabs/Tabs';
import TextIntro, { TextIntroLayout } from '@/components/TextIntro/TextIntro';

export type ComponentBuilder = {
  /**
   * Object representing props for the component with values coming from Contentful field values.
   * This is necessary to map naming from component props to Contentful field names and modify any
   * field values to match a specific prop type.
   *
   * This may also include the `extraProps` object passed in by the builder method.
   *
   * These will be applied to the component using the spread operator.
   */
  props: {
    [key: string]: unknown;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: FC<any>;
  /**
   * Child content built from fields that should be passed as a child to the component rather than innerBlocks.
   * ex. The AccordionItem displays child content but it may be simple text and not another component.
   *
   * This can also be used for direct content type references on a field.
   * ex. A CTA content type may be referenced but we want to override the props.
   * */
  childrenFields?: { [key: string]: JSX.Element | null | string };
};

export type ComponentBuilderFactory = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: any,
  extraProps?: GenericObject
) => ComponentBuilder;

type Children = string | JSX.Element | JSX.Element[] | (() => JSX.Element);

const EmptyComponent: ({ children }: { children: Children }) => JSX.Element = ({ children }) => <>{children}</>;

export const buildTestPage = (fields: TestsPageContentType, extraProps?: GenericObject): ComponentBuilder => ({
  props: {
    ...extraProps
  },
  childrenFields: {
    pageTitle: <h1>{fields.pageTitle}</h1>
  },
  component: EmptyComponent
});

export const buildDefaultPage = (_fields: DefaultPageContentType, extraProps?: GenericObject): ComponentBuilder => ({
  props: {
    ...extraProps
  },
  component: EmptyComponent
});

export const buildAccordionItem = (fields: AccordionItemContentType, extraProps?: GenericObject): ComponentBuilder => ({
  props: {
    title: fields.title,
    key: fields.title,
    ...extraProps
  },
  childrenFields: {
    hiddenContent: <p>{fields.hiddenContent}</p>
  },
  component: AccordionItem
});

export const buildAccordionGroup = (
  fields: AccordionGroupContentType,
  extraProps?: GenericObject
): ComponentBuilder => {
  const variant = fields.colorBackground && fields.colorBackground[0] === 'Black' ? variants.DARK : variants.LIGHT;
  return {
    props: {
      variant,
      ...extraProps
    },
    component: Accordion
  };
};

export const buildContentfulImage = (fields: ContentfulImageAsset, extraProps?: GenericObject): ComponentBuilder => ({
  props: {
    asset: fields,
    ...extraProps
  },
  component: ContentfulImage
});

export const buildImageBlock = (
  fields: { image: ContentfulImageAsset },
  extraProps?: GenericObject
): ComponentBuilder => ({
  props: {
    ...extraProps
  },
  childrenFields: {
    image: (
      <ContentfulImage
        key={fields.image.fields.title}
        asset={fields.image}
        imageSizeDesktop="100%"
        imageSizeTablet="100%"
        imageSizeMobile="100%"
      />
    )
  },
  component: ({ children }) => <>{children}</>
});

export const buildNextChapter = (fields: NextChapterContentType, extraProps?: GenericObject): ComponentBuilder => ({
  props: {
    eyebrow: fields.eyebrowText,
    link: { href: fields.linkUrl, title: fields.titleText },
    image: fields.backgroundImage,
    ...extraProps
  },
  component: NextChapter
});

export const buildSectionWrapper = (fields: SectionContentType, extraProps?: GenericObject): ComponentBuilder => {
  const theme = fields.colorBackground && fields.colorBackground[0];
  return {
    props: {
      eyebrow: fields.eyebrowText,
      title: fields.displayTitle,
      backgroundColor: fields?.colorBackground ? fields.colorBackground[0] : null,
      theme,
      ...extraProps
    },
    component: SectionWrapper
  };
};

export const buildTabGroup = (_fields: TabGroupContentType, extraProps?: GenericObject): ComponentBuilder => ({
  props: {
    ...extraProps
  },
  component: Tabs
});

export const buildTabItem = (fields: TabItemContentType, extraProps?: GenericObject): ComponentBuilder => ({
  props: {
    'data-label': fields.tabTitle,
    ...extraProps
  },
  component: ({ children }) => <>{children}</>
});

// TODO: Replace with real component in EX2332-99
export const buildTextBlock = (fields: TextBlockContentType, extraProps?: GenericObject): ComponentBuilder => ({
  props: {
    textContent: fields.textContent,
    ...extraProps
  },
  component: ({ textContent }) => <p>{textContent}</p>
});

export const buildTextIntro = (fields: TextIntroContentType, extraProps?: GenericObject): ComponentBuilder => {
  const hasCta = fields.ctaLabel && fields.ctaLink && fields.layout === TextIntroLayout.HEADER_LEFT;

  return {
    props: {
      layout: fields.layout,
      eyebrow: fields.eyebrow,
      header: fields.header,
      description: fields.description,
      ctaProps: hasCta && {
        href: fields.ctaLink,
        title: fields.ctaLabel
      },
      ...extraProps
    },
    component: TextIntro
  };
};

export const buildRoadmapGroup = (fields: RoadmapGroupContentType, extraProps?: GenericObject): ComponentBuilder => {
  const items = fields.items.map((item) => ({
    title: item.fields?.title,
    text: item.fields?.text,
    svg: item.fields?.svg,
    image: item.fields?.image
  }));

  return {
    props: {
      title: fields.title,
      eyebrow: fields.eyebrow,
      items,
      theme: fields.theme,
      ...extraProps
    },
    component: Roadmap
  };
};

export const buildCardGrid = (fields: CardGridContentType, extraProps?: GenericObject): ComponentBuilder => {
  const cardType = fields?.cardType[0] || null;
  const cards = fields?.cards.map((card) => {
    return {
      cardType,
      ...card.fields
    };
  });
  return {
    props: {
      cardType,
      cards,
      ...extraProps
    },
    component: CardGrid
  };
};

export const buildFeatureList = (fields: FeatureListContentType, extraProps?: GenericObject): ComponentBuilder => {
  const items = fields.items.map((item) => ({
    title: item.fields.title,
    text: item.fields.text
  }));

  return {
    props: {
      title: fields.title,
      eyebrow: fields.eyebrow,
      items,
      ...extraProps
    },
    component: FeaturesList
  };
};

export const buildProductList = (fields: ProductListContentType, extraProps?: GenericObject): ComponentBuilder => {
  const items = fields.productListRow?.map((row) => ({
    title: row.fields?.title,
    text: row.fields?.text,
    cta: { href: row.fields?.ctaLink },
    image: row.fields?.image
  }));

  return {
    props: {
      title: fields.title,
      eyebrow: fields.eyebrow,
      items,
      ...extraProps
    },
    component: ProductList
  };
};

export const buildMediaGalleryGroup = (
  fields: MediaGalleryGroupContentType,
  extraProps?: GenericObject
): ComponentBuilder => {
  const slides = fields.mediaItems?.map(({ fields }) => {
    const videoSrc = fields?.video?.fields?.file?.url;
    return {
      title: fields?.title,
      image: fields?.image,
      video: videoSrc ? { src: videoSrc } : null
    };
  });
  return {
    props: {
      slides,
      ...extraProps
    },
    component: GalleryVideo
  };
};

export const buildHero = (fields: HeroContentType, extraProps?: GenericObject): ComponentBuilder => {
  const videoSrc = fields.video?.fields.file.url;
  const imageSrc = fields.image?.fields.file.url;
  const theme = fields.theme[0]; // TODO: currently this is type string but we need it to be type HeroType to be passed as prop

  return {
    props: {
      title: fields.title,
      image: {
        src: imageSrc
      },
      video: videoSrc
        ? {
            src: videoSrc
          }
        : undefined, // hero component will render image when no video is passed
      theme,
      ...extraProps
    },
    component: Hero
  };
};
