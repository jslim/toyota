import { FC, memo, useMemo } from 'react';
import { GetStaticProps } from 'next';

import {
  FilteredEntity,
  GenericEntity,
  Lang,
  NestedLocalizedPageParams,
  OurLatestPostPageContentType,
  PageProps
} from '@/data/types';

import usePreviewData from '@/hooks/use-preview-data';
import { getAllLangSlugs } from '@/utils/locales';
import { getPageBlocks } from '@/utils/parsers/get-page-blocks';
import { buildPageMetaData } from '@/utils/parsers/page-metadata-parser-util';
import resolveResponse, { makeFilteredEntity } from '@/utils/parsers/response-parser-util';

import { useAppSelector } from '@/redux';

/* eslint-disable */
// @ts-ignore: populated during prebuild
import postDataEn from '@/json/our-latest-posts-en.json';
// @ts-ignore: populated during prebuild
import postDataJp from '@/json/our-latest-posts-jp.json';
/* eslint-enable */

type OurLatestPostData = FilteredEntity<OurLatestPostPageContentType>;

export interface OurLatestPostPageProps extends PageProps {
  data: OurLatestPostData;
}

const OurLatestPost: FC<OurLatestPostPageProps> = ({ data }) => {
  const globalStrings = useAppSelector((state) => state.activeGlobalStrings);
  const pageData = usePreviewData({
    // this is a mandatory hook to be called on every page
    staticData: data
  });

  const pageBlocks = useMemo(() => {
    return getPageBlocks(pageData, globalStrings);
  }, [pageData, globalStrings]);

  return <main className="OurLatestPost">{!!pageData?.fields ? pageBlocks : null}</main>;
};

export async function getStaticPaths() {
  const resolvedData = postDataEn;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (resolvedData as any).items = resolveResponse(postDataEn);

  const pageSlugs: Array<string> = [];

  resolvedData.items.forEach((entry: GenericEntity) => {
    // Only build pages that don't link out to a 3rd party
    if (!entry.fields!.externalLink) {
      pageSlugs.push(entry.fields!.slug);
    }
  });
  const langPaths = getAllLangSlugs();

  const paths: Array<{ [key: string]: NestedLocalizedPageParams }> = [];

  pageSlugs.forEach((slug: string) => {
    paths.push(
      ...langPaths.map(({ params }) => ({
        params: {
          lang: params.lang,
          slug
        }
      }))
    );
  });

  return {
    paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps<OurLatestPostPageProps> = async ({ params }) => {
  const { lang, slug } = params as NestedLocalizedPageParams;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolvedData: any = lang === Lang.EN ? postDataEn : postDataJp;

  resolvedData.items = resolveResponse(resolvedData);
  const data = makeFilteredEntity(
    resolvedData.items.filter((entry: GenericEntity) => entry.fields!.slug === slug)[0]
  ) as FilteredEntity;

  return {
    props: {
      head: buildPageMetaData(data.fields?.metadata?.fields),
      // IMPORTANT: wrap everything in "data" so that it can be swapped dynamically with Preview data
      data
    }
  };
};

export default memo(OurLatestPost);
