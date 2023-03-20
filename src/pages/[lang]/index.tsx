import { GetStaticProps } from 'next';

import PageHome, { PageHomeProps } from '@/components/PageHome/PageHome';

import { getAllLangSlugs } from '@/utils/locales';

export async function getStaticPaths() {
  const paths = getAllLangSlugs();
  return {
    paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps<PageHomeProps> = async () => {
  return {
    props: {
      head: { title: 'Home' }
    }
  };
};

export default PageHome;
