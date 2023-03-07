import { GetStaticProps } from 'next';

import PageAbout, { PageAboutProps } from '@/components/PageAbout/PageAbout';

import { getAllLangSlugs } from '@/utils/locales';

export const getStaticProps: GetStaticProps<PageAboutProps> = async () => {
  return {
    props: {
      head: { title: 'About' }
    }
  };
};

export async function getStaticPaths() {
  const paths = getAllLangSlugs();
  return {
    paths,
    fallback: false
  };
}

export default PageAbout;
