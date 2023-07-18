import { FC, memo } from 'react';
import dynamic from 'next/dynamic';
import NextHead from 'next/head';
import { useRouter } from 'next/router';

import { HeadProps, Lang } from '@/data/types';

import { getLocaleByLang } from '@/utils/locales';

import { useAppSelector } from '@/redux';

const MockFeaturePolicy = dynamic(() => import('@/components/Head/MockFeaturePolicy'), { ssr: false });
const MockContentSecurityPolicy = dynamic(() => import('@/components/Head/MockContentSecurityPolicy'), { ssr: false });

const TITLE_SEPARATOR = '-';

const Head: FC<HeadProps> = ({ title, keywords, description, siteName, image }) => {
  const router = useRouter();
  const { defaultPageMetadata } = useAppSelector((state) => state.activeGlobalData);

  const ogUrl = `${process.env.NEXT_PUBLIC_WEBSITE_SITE_URL}${router.asPath}`;
  const ogDefaultImage = image ?? defaultPageMetadata.image;
  const fullTitle = title
    ? `${title} ${TITLE_SEPARATOR} ${siteName ?? defaultPageMetadata.siteName}`
    : `${siteName ?? defaultPageMetadata.siteName}`;

  const altLang: Lang = router.query.lang === Lang.EN ? Lang.JP : Lang.EN;
  const altPath = router.asPath.replace(/^\/(en|jp)\//, `/${altLang}/`);
  const altUrl = `${process.env.NEXT_PUBLIC_WEBSITE_SITE_URL}${altPath}`;

  return (
    <NextHead>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <title>{fullTitle}</title>
      <meta name="description" content={description ?? defaultPageMetadata.description} />
      <meta name="keywords" content={(keywords ?? defaultPageMetadata.keywords)?.join(', ')} />
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <link rel="apple-touch-icon" sizes="180x180" href="/common/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/common/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/common/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/common/favicons/site.webmanifest" crossOrigin="use-credentials" />
      <link rel="mask-icon" href="/common/favicons/safari-pinned-tab.svg" color="#ffffff" />
      <link rel="shortcut icon" href="/common/favicons/favicon.ico" />
      <meta name="msapplication-config" content="/common/favicons/browserconfig.xml" />
      {/* Share meta tags */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image" content={ogDefaultImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description ?? defaultPageMetadata.description} />
      <meta name="twitter:image" content={'https:' + ogDefaultImage} />
      {/* Other recommends */}
      <link rel="canonical" href={ogUrl} />
      <link rel="alternate" href={altUrl} hrefLang={getLocaleByLang(altLang)} />

      {process.env.NEXT_PUBLIC_DNS_PREFETCH && (
        <>
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_DNS_PREFETCH} crossOrigin="true" />
          <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_DNS_PREFETCH} />
        </>
      )}

      {process.env.NODE_ENV === 'development' && (
        <>
          <MockFeaturePolicy />
          <MockContentSecurityPolicy />
        </>
      )}
    </NextHead>
  );
};

export default memo(Head);
