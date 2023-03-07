import { FC, memo } from 'react';
import { GetStaticProps } from 'next';
import classNames from 'classnames';

import { APIContentful } from '@/data/API';
import { LocalizedPageParams, PageProps } from '@/data/types';

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
    staticData: data
  }) as ExamplePageData;

  return (
    <main className={classNames('Example')}>
      {/* always render nodes conditionally unless it's set as required field in CMS */}
      {Boolean(pageData?.pageHeading) && <h1>{pageData.pageHeading}</h1>}
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
  const entryId = '1CYWutLdxqoOOu9GH3jZII'; // IMPORTANT: keep entry ID here within 'getStaticProps'

  const apiContentful = new APIContentful({ spaceId, accessToken });
  const data = await apiContentful.getEntryById(entryId, { locale });

  return {
    props: {
      head: { title: data?.pageTitle ?? '' },
      // IMPORTANT: wrap everything in "data" so that it can be swapped dynamically with Preview data
      data: {
        pageHeading: data?.pageHeading ?? ''
      }
    }
  };
};

export default memo(Example);
