import { FC, memo } from 'react';
import { GetStaticProps } from 'next';

import {
  FilteredEntity,
  GenericEntity,
  Lang,
  NestedLocalizedPageParams,
  OurLatestPostPageContentType,
  PageProps
} from '@/data/types';

import Spacer, { Sizes } from '@/components/Spacer/Spacer';

import usePreviewData from '@/hooks/use-preview-data';
import { getAllLangSlugs } from '@/utils/locales';
import { getPageBlocks } from '@/utils/parsers/get-page-blocks';
import { buildPageMetaData } from '@/utils/parsers/page-metadata-parser-util';
import resolveResponse, { makeFilteredEntity } from '@/utils/parsers/response-parser-util';

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
  const pageData = usePreviewData({
    // this is a mandatory hook to be called on every page
    staticData: data
  });

  return (
    <main className="OurLatestPost">
      {!!pageData?.fields ? getPageBlocks(pageData) : null}
      <Spacer size={Sizes.SMALL} />
    </main>
  );
};

export async function getStaticPaths() {
  const resolvedData = postDataEn;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (resolvedData as any).items = resolveResponse(postDataEn);
  const pageSlugs = resolvedData.items.map((entry: GenericEntity) => entry.fields!.slug);
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
