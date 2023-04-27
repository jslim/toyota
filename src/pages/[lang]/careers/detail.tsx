import { FC, memo, useEffect, useState, ReactNode, useMemo } from 'react';
import { GetStaticProps } from 'next';
import classNames from 'classnames';

import { useRouter } from 'next/router';
import { Job } from '@/data/types';
import { getAllLangSlugs } from '@/utils/locales';
import { ColumnType } from '@/data/variants';

import ColumnsText from '@/components/ColumnsText/ColumnsText';
import Cta from '@/components/Cta/Cta';
import TextIntro from '@/components/TextIntro/TextIntro';

import sanitizer from '@/utils/sanitizer';
import useLayout from '@/hooks/use-layout';
import PageNotFound from '@/components/PageNotFound/PageNotFound';

// set as global var for local translation
const eyebrowText = 'Careers';
const applyText = 'apply for this job';

const CareerDetail: FC = () => {
  const router = useRouter();
  const { layout } = useLayout();
  const [career, setCareer] = useState<Job>();
  const [leftSideContent, setLeftSideContent] = useState<ReactNode>();
  const [notFound, setNotFound] = useState<boolean>();

  const id = useMemo(() => {
    return router.query.jobID;
  }, [router]);

  useEffect(() => {
    if (!id) return;
    try {
      fetch('https://api.lever.co/v0/postings/woven-planet-2/' + id + '?mode=json')
        .then((res) => res.json())
        .then((data) => {
          if (data.categories) {
            setCareer(data);
          } else {
            setNotFound(true);
          }
        });
    } catch (e) {
      setNotFound(true);
      console.error('Unable to fetch Job postings: ', e);
    }
  }, [setCareer, id]);

  const subtitle = [
    career?.categories.location && career.categories.location,
    career?.categories.department + ' - ' + career?.categories.team,
    career?.categories.commitment && career.categories.commitment,
    career?.workplaceType && career.workplaceType
  ];

  useEffect(() => {
    setLeftSideContent(
      !layout.mobile && career ? (
        <div>
          <div dangerouslySetInnerHTML={{ __html: sanitizer(career.text || '') }} />
          <Cta href={career.applyUrl} title={applyText} />
        </div>
      ) : null
    );
  }, [layout, career]);

  return (
    <>
      {career && (
        <main className={classNames('CareerDetail')}>
          <TextIntro
            layout={ColumnType.COLUMNS_30_70}
            eyebrow={eyebrowText}
            header={career.text}
            subtitle={subtitle?.map((item, i) => (i === 0 && item ? item : ' / ' + item))}
            ctaProps={{ href: career.applyUrl, title: applyText }}
          />
          <ColumnsText theme={ColumnType.COLUMNS_30_70} isSticky={true} leftSide={leftSideContent}>
            <div dangerouslySetInnerHTML={{ __html: sanitizer(career.description || '') }} />
            {layout.mobile && <Cta href={career.applyUrl} title={applyText} />}
          </ColumnsText>
        </main>
      )}
      {notFound ? <PageNotFound head={{ title: 'Career Detail' }} /> : <main />}
    </>
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
      head: { title: 'Careers' }
    }
  };
};

export default memo(CareerDetail);
