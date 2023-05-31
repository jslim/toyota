import { FC, memo } from 'react';
import { GetStaticProps } from 'next';
import classNames from 'classnames';

import { APIContentful } from '@/data/API';
import { FilteredEntity, LocalizedPageParams, OurLatestPageContentType, PageProps } from '@/data/types';

import usePreviewData from '@/hooks/use-preview-data';
import { getAllLangSlugs, getLocaleByLang } from '@/utils/locales';
import { getPageBlocks } from '@/utils/parsers/get-page-blocks';
import { buildPageMetaData } from '@/utils/parsers/page-metadata-parser-util';

type OurLatestData = FilteredEntity<OurLatestPageContentType>;

export interface OurLatestPageProps extends PageProps {
  data: OurLatestData;
}

const OurLatest: FC<OurLatestPageProps> = ({ data }) => {
  const pageData = usePreviewData({
    // this is a mandatory hook to be called on every page
    staticData: data
  }) as OurLatestData;

  return (
    <main className={classNames('OurLatest')}>
      {/* always render nodes conditionally unless it's set as required field in CMS */}
      {!!pageData?.fields ? getPageBlocks(pageData) : null}
    </main>
  );
};

export async function getStaticPaths() {
  const paths = getAllLangSlugs();
  return {
    paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps<OurLatestPageProps> = async ({ params }) => {
  const { lang } = params as LocalizedPageParams;
  const locale = getLocaleByLang(lang);

  const accessToken = process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN; // IMPORTANT: keep content token within 'getStaticProps' of each page
  const spaceId = process.env.CONTENTFUL_SPACE_ID; // IMPORTANT: keep space ID within 'getStaticProps' of each page

  const apiContentful = new APIContentful({ spaceId, accessToken });
  const data = await apiContentful.getEntryBySlug('our-latest', 'ourLatestPage', { locale, include: 10 });

  return {
    props: {
      head: buildPageMetaData(data.fields?.metadata?.fields),
      // IMPORTANT: wrap everything in "data" so that it can be swapped dynamically with Preview data
      data
    }
  };
};

export default memo(OurLatest);
