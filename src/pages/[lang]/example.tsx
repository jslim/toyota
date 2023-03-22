import { FC, memo } from 'react';
import { GetStaticProps } from 'next';
import classNames from 'classnames';

import { APIContentful } from '@/data/API';
import { LocalizedPageParams, PageProps } from '@/data/types';

import PageExample from '@/components/PageExample/PageExample';

import usePreviewData from '@/hooks/use-preview-data';
import { getAllLangSlugs, getLocaleByLang } from '@/utils/locales';

type ExamplePageData = {
  pageHeading: string;
};

export interface ExamplePageProps extends PageProps {
  data: ExamplePageData;
}

const Example: FC<ExamplePageProps> = ({ data }) => {
  const pageData = usePreviewData({
    // this is a mandatory hook to be called on every page
    staticData: data
  }) as ExamplePageData;

  return (
    <main className={classNames('Example')}>
      {/* always render nodes conditionally unless it's set as required field in CMS */}
      {Boolean(pageData?.pageHeading) && <h1>{pageData.pageHeading}</h1>}
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
      // IMPORTANT: wrap everything in "data" so that it can be swapped dynamically with Preview data
      data: {
        pageHeading: data?.entry?.pageHeading ?? ''
      }
    }
  };
};

export default memo(Example);
