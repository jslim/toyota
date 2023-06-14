import { FC, memo, useMemo } from 'react';
import { GetStaticProps } from 'next';

import { APIContentful } from '@/data/API';
import {
  DefaultPageContentType,
  FilteredEntity,
  GenericEntity,
  NestedLocalizedPageParams,
  PageProps
} from '@/data/types';

import PageDefault from '@/components/PageDefault/PageDefault';

import usePreviewData from '@/hooks/use-preview-data';
import { getAllLangSlugs, getLocaleByLang } from '@/utils/locales';
import { getPageBlocks } from '@/utils/parsers/get-page-blocks';
import { buildPageMetaData } from '@/utils/parsers/page-metadata-parser-util';

import { useAppSelector } from '@/redux';

type DefaultPageData = FilteredEntity<DefaultPageContentType>;

export interface DefaultPageProps extends PageProps {
  data: DefaultPageData;
}

const homepageSlug = 'homepage';

const DefaultPage: FC<DefaultPageProps> = ({ data }) => {
  const globalStrings = useAppSelector((state) => state.activeGlobalStrings);
  const pageData = usePreviewData({
    // this is a mandatory hook to be called on every page
    staticData: data
  }) as DefaultPageData;

  const pageBlocks = useMemo(() => {
    return getPageBlocks(pageData, globalStrings);
  }, [pageData, globalStrings]);

  return (
    <PageDefault>
      {/* always render nodes conditionally unless it's set as required field in CMS */}
      {!!pageData?.fields ? pageBlocks : null}
    </PageDefault>
  );
};

export async function getStaticPaths() {
  const accessToken = process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN; // IMPORTANT: keep content token within 'getStaticProps' of each page
  const spaceId = process.env.CONTENTFUL_SPACE_ID; // IMPORTANT: keep space ID within 'getStaticProps' of each page

  const apiContentful = new APIContentful({ spaceId, accessToken });
  const data = await apiContentful.getEntriesByContentType('defaultPage', {});
  const pageSlugs = data.items.map((entry: GenericEntity) => entry.fields!.slug);
  const langPaths = getAllLangSlugs();

  const paths: Array<{ [key: string]: NestedLocalizedPageParams }> = [];

  pageSlugs.forEach((slug: string) => {
    paths.push(
      ...langPaths.map(({ params }) => ({
        params: {
          lang: params.lang,
          slug: slug === homepageSlug ? [] : [slug]
        }
      }))
    );
  });

  return {
    paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps<DefaultPageProps> = async ({ params }) => {
  const { lang, slug } = params as NestedLocalizedPageParams;
  const locale = getLocaleByLang(lang);

  const accessToken = process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN; // IMPORTANT: keep content token within 'getStaticProps' of each page
  const spaceId = process.env.CONTENTFUL_SPACE_ID; // IMPORTANT: keep space ID within 'getStaticProps' of each page

  const apiContentful = new APIContentful({ spaceId, accessToken });
  const data = await apiContentful.getEntryBySlug(slug?.[0] ?? homepageSlug, 'defaultPage', { locale, include: 10 });

  return {
    props: {
      head: buildPageMetaData(data.fields?.metadata?.fields),
      // IMPORTANT: wrap everything in "data" so that it can be swapped dynamically with Preview data
      data
    }
  };
};

export default memo(DefaultPage);
