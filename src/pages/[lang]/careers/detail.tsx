import { FC, memo, ReactNode, useEffect, useMemo, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import css from '@/components/ColumnsText/ColumnsText.module.scss';

import { Job } from '@/data/types';
import { ColumnType } from '@/data/variants';

import ColumnsText from '@/components/ColumnsText/ColumnsText';
import Cta from '@/components/Cta/Cta';
import PageNotFound from '@/components/PageNotFound/PageNotFound';
import Spacer, { Sizes } from '@/components/Spacer/Spacer';
import TextIntro from '@/components/TextIntro/TextIntro';

import useIntersectionObserver from '@/hooks/use-intersection-observer';
import useLayout from '@/hooks/use-layout';
import { getAllLangSlugs } from '@/utils/locales';
import sanitizer from '@/utils/sanitizer';

// set as global var for local translation
const eyebrowText = 'Careers';
const applyText = 'apply for this job';

const CareerDetail: FC = () => {
  const router = useRouter();
  const { layout } = useLayout();
  const [career, setCareer] = useState<Job>();
  const [leftSideContent, setLeftSideContent] = useState<ReactNode>();
  const [notFound, setNotFound] = useState<boolean>();
  const [setNode, isIntersection] = useIntersectionObserver(false, 0, '0% 0% -80% 0%');

  const id = useMemo(() => {
    return router.query.jobID;
  }, [router]);

  useEffect(() => {
    if (!id) return;
    try {
      fetch('https://api.lever.co/v0/postings/woven-by-toyota/' + id + '?mode=json')
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
        <div ref={(node: HTMLDivElement) => setNode(node)}>
          {isIntersection && (
            <>
              <div dangerouslySetInnerHTML={{ __html: sanitizer(career.text || '') }} />
              <Cta className={css.leftCta} href={career.applyUrl} title={applyText} />
            </>
          )}
        </div>
      ) : null
    );
  }, [layout, career, isIntersection, setNode]);

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
            className={'careerDetailTextIntro'}
          />
          <ColumnsText theme={ColumnType.COLUMNS_30_70} isSticky={true} leftSide={leftSideContent}>
            <div dangerouslySetInnerHTML={{ __html: sanitizer(career?.description ?? '') }} />
            {career?.lists?.map((list) => (
              <div key={list.text}>
                <b dangerouslySetInnerHTML={{ __html: sanitizer(list?.text ?? '') }} />
                <ul dangerouslySetInnerHTML={{ __html: sanitizer(list?.content ?? '') }} />
              </div>
            ))}
            <div dangerouslySetInnerHTML={{ __html: sanitizer(career?.additional ?? '') }} />
            {layout.mobile && <Cta href={career.applyUrl} title={applyText} />}
          </ColumnsText>
          <Spacer size={Sizes.SMALL} />
        </main>
      )}
      {notFound ? <PageNotFound head={{ title: 'Career Detail' }} /> : !career ? <main /> : null}
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
