import { FC, memo } from 'react';
import { GetStaticProps } from 'next';
import classNames from 'classnames';

import { APIContentful } from '@/data/API';
import { LocalizedPageParams, PageProps } from '@/data/types';

import usePreviewData from '@/hooks/use-preview-data';
import { getAllLangSlugs, getLocaleByLang } from '@/utils/locales';

type ADASPageData = {
  pageTitle: string;
};

export interface ADASPageProps extends PageProps {
  data: ADASPageData;
}

const ADAS: FC<ADASPageProps> = ({ data }) => {
  const pageData = usePreviewData({
    // this is a mandatory hook to be called on every page
    staticData: data
  }) as ADASPageData;

  return (
    <main className={classNames('ADAS')}>
      {/* always render nodes conditionally unless it's set as required field in CMS */}
      {Boolean(pageData?.pageTitle) && <h1>{pageData.pageTitle}</h1>}
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

export const getStaticProps: GetStaticProps<ADASPageProps> = async ({ params }) => {
  const { lang } = params as LocalizedPageParams;
  const locale = getLocaleByLang(lang);

  const accessToken = process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN; // IMPORTANT: keep content token within 'getStaticProps' of each page
  const spaceId = process.env.CONTENTFUL_SPACE_ID; // IMPORTANT: keep space ID within 'getStaticProps' of each page

  const apiContentful = new APIContentful({ spaceId, accessToken });
  const data = await apiContentful.getEntryBySlug('adas', 'adasPage', {
    locale,
    include: 10
  });

  return {
    props: {
      head: { title: data?.entry?.pageTitle ?? 'Future Automated Driving Applications' },
      // IMPORTANT: wrap everything in "data" so that it can be swapped dynamically with Preview data
      data: {
        pageTitle: data.entry.pageTitle ?? 'Future Automated Driving Ppplications'
      }
    }
  };
};

export default memo(ADAS);
