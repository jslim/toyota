import { FC, ReactNode } from 'react';

import {
  AccordionGroupContentType,
  AccordionItemContentType,
  CardGalleryContentType,
  CardGridContentType,
  CareersListContentType,
  ColumnsTextContentType,
  ContentfulImageAsset,
  CTAContentType,
  DefaultPageContentType,
  FeaturedArticlesContentyType,
  FeatureListContentType,
  GenericObject,
  HeroContentType,
  HistoryTimelineContentType,
  LeaderPageContentType,
  LeadershipModuleContentType,
  MediaGalleryGroupContentType,
  MediaKitContentType,
  NextChapterContentType,
  OurLatestPostPageContentType,
  ProductListContentType,
  richTextContentType,
  RoadmapGroupContentType,
  SectionContentType,
  spacerContentType,
  TabGroupContentType,
  TabItemContentType,
  TestsPageContentType,
  TextBlockContentType,
  TextIntroContentType,
  videoPlayerSectionContentType
} from '@/data/types';
import { variants } from '@/data/variants';

import Accordion, { AccordionItem } from '@/components/Accordion/Accordion';
import BiographicHero from '@/components/BiographicHero/BiographicHero';
import { CardTypes } from '@/components/Card/Card';
import CardGrid from '@/components/CardGrid/CardGrid';
import CareersList from '@/components/CareersList/CareersList';
import ColumnsText from '@/components/ColumnsText/ColumnsText';
import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';
import Cta, { ButtonType } from '@/components/Cta/Cta';
import FeaturedArticles from '@/components/FeaturedArticles/FeaturedArticles';
import FeaturesList from '@/components/FeaturesList/FeaturesList';
import Gallery from '@/components/Gallery/Gallery';
import GalleryVideo from '@/components/GalleryVideo/GalleryVideo';
import Hero from '@/components/Hero/Hero';
import HistoryTimeline from '@/components/HistoryTimeline/HistoryTimeline';
import { SlideProps } from '@/components/HistoryTimeline/HistoryTimelineSlide';
import { LeadershipCardProps } from '@/components/LeadershipCard/LeadershipCard';
import LeadershipModule, { directorsProps } from '@/components/LeadershipModule/LeadershipModule';
import MediaKit from '@/components/MediaKit/MediaKit';
import NextChapter from '@/components/NextChapter/NextChapter';
import ProductList from '@/components/ProductList/ProductList';
import RichtextWrapper from '@/components/RichtextWrapper/RichtextWrapper';
import Roadmap from '@/components/Roadmap/Roadmap';
import SectionWrapper from '@/components/SectionWrapper/SectionWrapper';
import Spacer, { Sizes } from '@/components/Spacer/Spacer';
import Tabs from '@/components/Tabs/Tabs';
import TextIntro from '@/components/TextIntro/TextIntro';
import VideoPlayerSection from '@/components/VideoPlayerSection/VideoPlayerSection';

import ChevronDownSvg from '@/components/svgs/svg-chevron-down.svg';

import { Color } from '../colors';
import { parseContentfulRichText } from './rich-text-parser';

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
  childrenFields?: { [key: string]: JSX.Element | ReactNode | null | string };
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
    pageTitle: <h1 style={{ height: 0, position: 'relative', zIndex: '1' }}>{fields.pageTitle}</h1>
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
        useSrcSet
        hasBorderRadius
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
      targetId: fields?.targetId,
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
  const hasCta = fields.ctaLabel && fields.ctaLink;

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
  const cta = fields?.cta?.fields?.linkUrl && {
    title: fields?.cta?.fields?.linkText,
    href: fields?.cta?.fields?.linkUrl,
    'aria-label': fields?.cta?.fields?.ariaLabel
  };
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
      cta,
      ...extraProps
    },
    component: Roadmap
  };
};

export const buildCardGallery = (fields: CardGalleryContentType, extraProps?: GenericObject): ComponentBuilder => {
  const slides = fields?.cards.map((card) => {
    const cta = card?.fields?.cta?.fields?.linkUrl && {
      title: card?.fields?.cta?.fields?.linkText,
      href: card?.fields?.cta?.fields?.linkUrl,
      'aria-label': card?.fields?.cta?.fields?.ariaLabel
    };
    return {
      cardType: CardTypes.PRODUCT,
      ...card.fields,
      cta
    };
  });
  return {
    props: {
      slides,
      ...extraProps
    },
    component: Gallery
  };
};

export const buildCardGrid = (fields: CardGridContentType, extraProps?: GenericObject): ComponentBuilder => {
  const cardType = fields?.cardType[0] || null;
  const cards = fields?.cards.map((card) => {
    const cta = card?.fields?.cta?.fields?.linkUrl && {
      title: card?.fields?.cta?.fields?.linkText,
      href: card?.fields?.cta?.fields?.linkUrl,
      'aria-label': card?.fields?.cta?.fields?.ariaLabel
    };
    return {
      cardType,
      ...card.fields,
      cta
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

export const buildCareersList = (fields: CareersListContentType, extraProps?: GenericObject): ComponentBuilder => {
  return {
    props: {
      title: fields?.title,
      eyebrow: fields?.eyebrowText,
      filtersLabel: fields?.filtersLabel,
      searchLabel: fields?.searchLabel,
      cleanLabel: fields?.cleanLabel,
      noResultsLabel: fields?.noResultsLabel,
      noResultsDescription: fields?.noResultsDescription,
      ...extraProps
    },
    component: CareersList
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
  const videoSrc = fields?.video?.fields?.file.url;
  const postDate = new Date(fields?.featured?.fields?.date);
  const month = postDate.toLocaleString('default', { month: 'short', timeZone: 'UTC' }).toUpperCase();
  const day = postDate.getUTCDate();
  const year = postDate.getUTCFullYear();

  return {
    props: {
      title: fields?.title,
      image: fields?.image,
      video: videoSrc
        ? {
            src: videoSrc
          }
        : undefined, // hero component will render image when no video is passed
      theme: fields?.theme,
      featured: {
        date: `${month} ${day}, ${year}`,
        cat: fields?.featured?.fields?.cat,
        title: fields?.featured?.fields?.title
      },
      ...extraProps
    },
    component: Hero
  };
};

// component builder for rich text content
export const buildRichTextComponent = (fields: richTextContentType, extraProps?: GenericObject): ComponentBuilder => {
  const richText = fields.richtext;
  const elements = parseContentfulRichText(richText);

  return {
    props: {
      ...extraProps
    },

    component: () => <RichtextWrapper>{elements}</RichtextWrapper>
  };
};

export const buildVideoPlayerSection = (
  fields: videoPlayerSectionContentType,
  extraProps?: GenericObject
): ComponentBuilder => {
  const videoPlayerSection = {
    poster: fields?.videoPlayerSection?.fields?.poster,
    video: { src: fields?.videoPlayerSection?.fields?.video.fields.file.url },
    title: fields?.videoPlayerSection?.fields?.title,
    theme: fields?.videoPlayerSection?.fields?.theme
  };
  return {
    props: {
      quote: fields?.quote,
      author: fields?.author,
      videoPlayerSection,
      ...extraProps
    },

    component: VideoPlayerSection
  };
};

export const buildColumnsText = (fields: ColumnsTextContentType, extraProps?: GenericObject): ComponentBuilder => {
  const rightSide = parseContentfulRichText(fields?.rightSide);
  const leftSide = parseContentfulRichText(fields?.leftSide);
  const eyebrow = fields.eyebrow ? { text: fields?.eyebrow } : null;

  return {
    props: {
      eyebrow,
      theme: fields?.theme,
      leftSide,
      ...extraProps
    },
    childrenFields: {
      rightSide
    },
    component: ColumnsText
  };
};

export const buildSpacer = (fields: spacerContentType, extraProps?: GenericObject): ComponentBuilder => {
  return {
    props: {
      size: fields?.size,
      ...extraProps
    },
    component: Spacer
  };
};

export const buildFeaturedArticles = (
  fields: FeaturedArticlesContentyType,
  extraProps?: GenericObject
): ComponentBuilder => {
  const cards = fields?.newsPosts.map((post) => {
    const postDate = new Date(post?.fields?.publishDate);
    const month = postDate.toLocaleString('default', { month: 'short', timeZone: 'UTC' }).toUpperCase();
    const day = postDate.getUTCDate();
    const year = postDate.getUTCFullYear();

    return {
      image: post?.fields?.thumbnail,
      title: post?.fields?.category,
      date: `${month} ${day}, ${year}`,
      text: post?.fields?.pageTitle,
      cta: {
        href: `/${post?.fields?.slug}`
      }
    };
  });
  return {
    props: {
      eyebrow: fields?.eyebrow,
      title: fields?.heading,
      cta: {
        title: fields?.cta?.fields?.linkText,
        href: fields?.cta?.fields?.linkUrl,
        'aria-label': fields?.cta?.fields?.ariaLabel
      },
      cards,
      ...extraProps
    },
    component: FeaturedArticles
  };
};

export const buildLeaderPage = (fields: LeaderPageContentType, extraProps?: GenericObject): ComponentBuilder => {
  const rightSide = parseContentfulRichText(fields?.rightSideBio);
  const leftSide = parseContentfulRichText(fields?.leftSideBio);
  return {
    props: {
      ...extraProps
    },
    component: ({ children }) => (
      <>
        <BiographicHero title={fields?.leaderName} description={fields?.role} asset={fields?.headshot} />
        <SectionWrapper backgroundColor={Color.WHITE}>
          <Spacer size={Sizes.SMALL} />
          <ColumnsText leftSide={leftSide}>{rightSide}</ColumnsText>
          <Spacer size={Sizes.SMALL} />
          {children}
        </SectionWrapper>
      </>
    )
  };
};

export const buildLeadershipModule = (
  fields: LeadershipModuleContentType,
  extraProps?: GenericObject
): ComponentBuilder => {
  const directors: directorsProps = {
    label: fields?.boardOfDirectorsSectionTitle || '',
    list: fields?.boardMembers.map((el) => {
      const { name, roletitle } = el.fields;
      return {
        name,
        role: roletitle
      };
    })
  };

  const slides: Array<LeadershipCardProps> = fields.leaders.map((leaderPage) => {
    const { leaderName, shortRole, headshot, slug } = leaderPage?.fields;
    return {
      title: leaderName,
      image: headshot,
      description: shortRole,
      cta: {
        href: `/${extraProps?.lang || 'en'}/leader/${slug}`
      }
    };
  });
  return {
    props: {
      eyebrow: fields?.eyebrowText || '',
      title: fields?.title || '',
      description: fields?.description || '',
      slides,
      directors,
      ...extraProps
    },
    component: LeadershipModule
  };
};

export const buildHistoryTimeline = (
  fields: HistoryTimelineContentType,
  extraProps?: GenericObject
): ComponentBuilder => {
  const slides: Array<SlideProps> = fields?.slides.map(({ fields }) => {
    const { year, title, text, image, cta } = fields;
    const slideCta =
      cta?.fields.linkText && cta?.fields.linkUrl
        ? { href: cta.fields.linkUrl, title: cta.fields.linkText }
        : undefined;

    return {
      year,
      title,
      text,
      image,
      cta: slideCta
    };
  });
  return {
    props: {
      eyebrow: fields?.eyebrowText,
      title: fields?.title,
      slides,
      ...extraProps
    },
    component: HistoryTimeline
  };
};

export const buildOurLatestPostPage = (
  fields: OurLatestPostPageContentType,
  extraProps?: GenericObject
): ComponentBuilder => {
  return {
    props: {
      ...extraProps
    },
    component: () => <>{fields.pageTitle}</>
  };
};

export const buildMediaKit = (fields: MediaKitContentType, extraProps?: GenericObject): ComponentBuilder => {
  const modal = {
    title: fields.modalTitle,
    terms: fields.modalTerms,
    label: fields.modalLabel,
    closeLabel: fields.modalCloseLabel,
    cta: fields.callToActionTitle
  };
  const items = fields.innerBlocks?.map(({ fields }) => {
    const assetSrc = fields?.asset?.fields?.file.url;
    return {
      title: fields?.title,
      secondaryText: fields.date,
      tertiaryText: fields.filesSize,
      assetsLink: assetSrc,
      link: fields?.link
    };
  });
  return {
    props: {
      ...extraProps
    },
    component: () => <MediaKit modal={modal} items={items} />
  };
};

export const buildCallToAction = (fields: CTAContentType, extraProps?: GenericObject): ComponentBuilder => {
  const isJumpTo = fields.jumpToLink;
  const theme = isJumpTo ? ButtonType.Icon : ButtonType.Primary;
  const title = isJumpTo ? undefined : fields.linkText;
  let href = fields.linkUrl;

  if (fields.linkToPage != null) {
    const entity = fields.linkToPage;
    if (entity.fields?.slug && typeof entity.fields?.slug === 'string') {
      let subPath = '';
      if (entity.contentType === 'ourLatestPagePost') subPath = '/our-latest';
      if (entity.contentType === 'leaderPage') subPath = '/leader';
      href = `/${extraProps?.lang || 'en'}${subPath}/${entity.fields.slug}`;
    }
  }
  const props = {
    theme,
    href,
    title,
    ...extraProps
  };
  return {
    props,
    component: () => <Cta {...props}>{isJumpTo && <ChevronDownSvg />}</Cta>
  };
};
