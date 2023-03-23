import { FC, memo } from 'react';
import { GetStaticProps } from 'next';
import classNames from 'classnames';

import { APIContentful } from '@/data/API';
import { GenericEntity, LocalizedPageParams, NextChapterContentType, PageProps } from '@/data/types';

import NextChapter from '@/components/NextChapter/NextChapter';

import usePreviewData from '@/hooks/use-preview-data';
import { getAllLangSlugs, getLocaleByLang } from '@/utils/locales';

type CareersPageData = {
  pageTitle: string;
  nextChapter: GenericEntity<NextChapterContentType>;
};

export interface CareersPageProps extends PageProps {
  data: CareersPageData;
}

const Careers: FC<CareersPageProps> = ({ data }) => {
  const pageData = usePreviewData({
    // this is a mandatory hook to be called on every page
    staticData: data
  }) as CareersPageData;

  return (
    <main className={classNames('Example')}>
      {/* always render nodes conditionally unless it's set as required field in CMS */}
      {Boolean(pageData.nextChapter.fields) ? (
        <NextChapter
          eyebrow={pageData.nextChapter.fields!.eyebrowText}
          link={{ href: pageData.nextChapter.fields!.linkUrl, title: pageData.nextChapter.fields!.titleText }}
          image={pageData.nextChapter.fields!.backgroundImage}
        />
      ) : null}
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

export const getStaticProps: GetStaticProps<CareersPageProps> = async ({ params }) => {
  const { lang } = params as LocalizedPageParams;
  const locale = getLocaleByLang(lang);

  const accessToken = process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN; // IMPORTANT: keep content token within 'getStaticProps' of each page
  const spaceId = process.env.CONTENTFUL_SPACE_ID; // IMPORTANT: keep space ID within 'getStaticProps' of each page

  const apiContentful = new APIContentful({ spaceId, accessToken });
  const data = await apiContentful.getEntryBySlug('careers', 'careersPage', { locale });

  return {
    props: {
      head: { title: data?.entry?.pageTitle ?? '' },
      // IMPORTANT: wrap everything in "data" so that it can be swapped dynamically with Preview data
      data: {
        pageTitle: data.entry.pageTitle ?? 'Careers',
        nextChapter: data.entry.nextChapter ?? null
      }
    }
  };
};

export default memo(Careers);
