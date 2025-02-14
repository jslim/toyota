import { FC, memo, useMemo } from 'react';
import { GetStaticProps } from 'next';

import { PageType } from '@/data/types';

import Head from '@/components/Head/Head';
import PageDefault from '@/components/PageDefault/PageDefault';

import usePreviewData from '@/hooks/use-preview-data';
import { getAllLangSlugs } from '@/utils/locales';
import { getPageBlocks } from '@/utils/parsers/get-page-blocks';

import { useAppSelector } from '@/redux';

const Preview: FC<PageType> = ({ data: staticData }) => {
  const globalStrings = useAppSelector((state) => state.activeGlobalStrings);
  const pageData = usePreviewData({
    // this is a mandatory hook to be called on every page for dynamic preview data hydration
    staticData
  });

  const pageBlocks = useMemo(() => {
    return getPageBlocks(pageData, globalStrings);
  }, [pageData, globalStrings]);

  return (
    <PageDefault>
      <Head {...{ title: pageData?.fields?.pageTitle ?? 'Preview' }} />
      {/* always render nodes conditionally unless it's set as required field in CMS */}
      {!!pageData?.fields ? pageBlocks : null}
    </PageDefault>
  );
};

export async function getStaticPaths() {
  const paths = getAllLangSlugs();
  return {
    paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      // IMPORTANT: wrap content in "data" object so that it can be swapped dynamically with Preview draft data
      data: null
    }
  };
};

export default memo(Preview);
