import { FC, memo } from 'react';
import { GetStaticProps } from 'next';
import classNames from 'classnames';

import { APIContentful } from '@/data/API';
import { LocalizedPageParams, PageType } from '@/data/types';

import PageExample from '@/components/PageExample/PageExample';

import usePreviewData from '@/hooks/use-preview-data';
import { getAllLangSlugs, getLocaleByLang } from '@/utils/locales';
import { getPageBlocks } from '@/utils/parsers/get-page-blocks';

const Example: FC<PageType> = ({ data }) => {
  const pageData = usePreviewData({
    // this is a mandatory hook to be called on every page
    staticData: data
  });

  return (
    <main className={classNames('Example')}>
      {pageData?.innerBlocks?.map((el) => getPageBlocks(el)) ?? null}
      <PageExample />
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { lang } = params as LocalizedPageParams;
  const locale = getLocaleByLang(lang);

  const accessToken = process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN; // IMPORTANT: keep content token within 'getStaticProps' of each page
  const spaceId = process.env.CONTENTFUL_SPACE_ID; // IMPORTANT: keep space ID within 'getStaticProps' of each page

  const apiContentful = new APIContentful({ spaceId, accessToken });
  const data = await apiContentful.getEntryBySlug('example', 'testContentType', { locale });

  return {
    props: {
      head: { title: data?.entry?.pageTitle ?? '' },
      // IMPORTANT: wrap content in "data" object so that it can be swapped dynamically with Preview draft data
      data: {
        pageHeading: data?.entry?.pageHeading ?? ''
      }
    }
  };
};

export default memo(Example);
