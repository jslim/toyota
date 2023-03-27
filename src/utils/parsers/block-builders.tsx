import { FC } from 'react';

import {
  AccordionGroupContentType,
  AccordionItemContentType,
  ContentfulImageAsset,
  GenericObject,
  NextChapterContentType,
  SectionContentType,
  TabGroupContentType,
  TabItemContentType
} from '@/data/types';
import { variants } from '@/data/variants';

import Accordion, { AccordionItem } from '@/components/Accordion/Accordion';
import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';
import NextChapter from '@/components/NextChapter/NextChapter';
import SectionWrapper from '@/components/SectionWrapper/SectionWrapper';
import Tabs from '@/components/Tabs/Tabs';

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
  childrenFields?: Array<JSX.Element | null | string>;
};

export type ComponentBuilderFactory = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: any,
  extraProps?: GenericObject
) => ComponentBuilder;

export const buildAccordionItem = (fields: AccordionItemContentType, extraProps?: GenericObject): ComponentBuilder => ({
  props: {
    title: fields.title,
    key: fields.title,
    ...extraProps
  },
  childrenFields: [<p key="content">{fields.hiddenContent}</p>],
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
  childrenFields: [
    <ContentfulImage
      key={fields.image.fields.title}
      asset={fields.image}
      imageSizeDesktop="100%"
      imageSizeTablet="100%"
      imageSizeMobile="100%"
    />
  ],
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
  const theme = fields.colorBackground && fields.colorBackground[0] === 'Black' ? variants.DARK : variants.LIGHT;
  return {
    props: {
      eyebrow: fields.eyebrowText,
      title: fields.displayTitle,
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
