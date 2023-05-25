import { FC, memo, useEffect, useMemo, useState } from 'react';
import { GetStaticProps } from 'next';
import classNames from 'classnames';

import css from '@/components/ColumnsText/ColumnsText.module.scss';

import {
  CardContentType,
  FilteredEntity,
  GenericEntity,
  Lang,
  NestedLocalizedPageParams,
  OurLatestPostPageContentType,
  PageProps
} from '@/data/types';
import { ColumnType, SocialPlatform } from '@/data/variants';

import AssetsDownload from '@/components/Assets/AssetsDownload';
import ColumnsText from '@/components/ColumnsText/ColumnsText';
import Cta, { ButtonType } from '@/components/Cta/Cta';
import Hero, { HeroType } from '@/components/Hero/Hero';
import PageNotFound from '@/components/PageNotFound/PageNotFound';
import SocialIcon from '@/components/SocialIcon/SocialIcon';

import usePreviewData from '@/hooks/use-preview-data';
import { formatDate } from '@/utils/basic-functions';
import { getMailTo } from '@/utils/basic-functions';
import { getAllLangSlugs } from '@/utils/locales';
import { getPageBlocks } from '@/utils/parsers/get-page-blocks';
import resolveResponse from '@/utils/parsers/response-parser-util';
import { makeFilteredEntity } from '@/utils/parsers/response-parser-util';
import { parseContentfulRichText } from '@/utils/parsers/rich-text-parser';
import share from '@/utils/share';

import { useAppSelector } from '@/redux';

import MailSvg from '@/components/svgs/mail.svg';
import ShareSvg from '@/components/svgs/share.svg';
/* eslint-disable */
// @ts-ignore: populated during prebuild
import postDataEn from '@/json/our-latest-posts-en.json';
// @ts-ignore: populated during prebuild
import postDataJp from '@/json/our-latest-posts-jp.json';
/* eslint-enable */

type OurLatestPostData = FilteredEntity<OurLatestPostPageContentType>;

export interface OurLatestPostPageProps extends PageProps {
  data: OurLatestPostData;
}

const socials = [
  {
    platform: SocialPlatform.LINKEDIN,
    label: 'Linkedin Icon'
  },
  {
    platform: SocialPlatform.FACEBOOK,
    label: 'Facebook Icon'
  },
  {
    platform: SocialPlatform.TWITTER,
    label: 'twitter Icon'
  }
];

const OurLatestPost: FC<OurLatestPostPageProps> = ({ data }) => {
  const { relatedNews, copyLink, copyLinkSuccess, shareText, emailShareBody, emailShareSubject } = useAppSelector(
    (state) => state.activeGlobalStrings
  );
  const [url, setUrl] = useState('');
  const [copyTooltip, setCopyTooltip] = useState<string | null>(null);
  const pageData = usePreviewData({
    // this is a mandatory hook to be called on every page
    staticData: data
  });
  const assetsData = pageData.fields.articleAssets?.fields;
  const relatedData = {
    id: 'id',
    contentType: 'featuredArticles',
    locale: pageData.locale,
    fields: {
      heading: relatedNews,
      eyebrow: '',
      newsPosts: pageData.fields.pinnedPosts?.map((item: CardContentType) => ({ ...item, contentType: 'card' }))
    }
  };

  const content = useMemo(() => parseContentfulRichText(pageData.fields.body), [pageData]);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    // hide copied tooltip
    if (copyTooltip === copyLinkSuccess) {
      timeout = setTimeout(() => {
        setCopyTooltip(null);
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [copyLinkSuccess, copyTooltip]);

  const leftSideContent = (
    <div>
      <div className={css.leftSideTopBar}>
        {data.fields.publishDate && <span className={css.date}>{formatDate(data.fields.publishDate)}</span>}
        {data.fields.category && <span className={css.category}>{data.fields.category}</span>}
      </div>

      <h2 className={css.title}>{data.fields.pageTitle}</h2>
      <div className={css.shareButtons}>
        <span className={css.shareText}>{shareText}</span>
        {socials.map(({ platform, label }) => (
          <SocialIcon
            key={platform}
            className={css.socialMediaButton}
            platform={platform}
            href={share(platform, url, label)}
            label={label}
            isWhite={false}
          />
        ))}
        <Cta
          theme={ButtonType.Icon}
          className={css.socialMediaButton}
          href={getMailTo({
            email: '',
            // TODO replace with emailSubject and emailBody from GlobalData
            subject: emailShareSubject,
            body: emailShareBody
          })}
        >
          <MailSvg />
        </Cta>
        <div
          onMouseEnter={() => copyTooltip !== copyLinkSuccess && setCopyTooltip(copyLink)}
          onMouseLeave={() => copyTooltip === copyLink && setCopyTooltip(null)}
        >
          <Cta
            aria-label="copy link"
            theme={ButtonType.Icon}
            className={css.socialMediaButton}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopyTooltip(copyLinkSuccess);
            }}
            tooltip={copyTooltip}
          >
            <ShareSvg />
          </Cta>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {!!pageData?.fields ? (
        <main className={classNames('OurLatestPost')}>
          <Hero theme={HeroType.Detail} image={pageData?.fields.thumbnail} />
          <ColumnsText leftSide={leftSideContent} isSticky={true} theme={ColumnType.COLUMNS_40_60}>
            <span className={css.spacer} />
            {content}
          </ColumnsText>
          {assetsData?.assets.length && <AssetsDownload title={assetsData.eyebrowText} assets={assetsData.assets} />}
          {relatedData.fields.newsPosts?.length && getPageBlocks(relatedData)}
        </main>
      ) : (
        <PageNotFound head={{ title: 'Our Latest Detail' }} />
      )}
    </>
  );
};

export async function getStaticPaths() {
  const resolvedData = postDataEn;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (resolvedData as any).items = resolveResponse(postDataEn);
  const pageSlugs = resolvedData.items.map((entry: GenericEntity) => entry.fields!.slug);
  const langPaths = getAllLangSlugs();

  const paths: Array<{ [key: string]: NestedLocalizedPageParams }> = [];

  pageSlugs.forEach((slug: string) => {
    paths.push(
      ...langPaths.map(({ params }) => ({
        params: {
          lang: params.lang,
          slug
        }
      }))
    );
  });

  return {
    paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps<OurLatestPostPageProps> = async ({ params }) => {
  const { lang, slug } = params as NestedLocalizedPageParams;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolvedData: any = lang === Lang.EN ? postDataEn : postDataJp;

  resolvedData.items = resolveResponse(postDataEn);
  const data = makeFilteredEntity(
    resolvedData.items.filter((entry: GenericEntity) => entry.fields!.slug === slug)[0]
  ) as FilteredEntity;

  return {
    props: {
      head: { title: data?.fields?.pageTitle ?? 'Our Latest' },
      // IMPORTANT: wrap everything in "data" so that it can be swapped dynamically with Preview data
      data
    }
  };
};

export default memo(OurLatestPost);
