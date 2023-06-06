import { FC, memo, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Script from 'next/script';

import { Lang, PageProps } from '@/data/types';

import { ExtendedAppProps } from '@/pages/_app';
import Footer from '@/components/Footer/Footer';
import Head from '@/components/Head/Head';
import Nav from '@/components/Nav/Nav';

import { GtmScript } from '@/utils/analytics';
import { checkWebpSupport } from '@/utils/basic-functions';

import {
  setActiveLang,
  setActiveRoute,
  setGlobalData,
  setGlobalStrings,
  setIsWebpSupported,
  setPrevRoute,
  useAppDispatch
} from '@/redux';

const DebugGrid = dynamic(() => import('@/components/DebugGrid/DebugGrid'), { ssr: false });
const AppAdmin = dynamic(() => import('@/components/AppAdmin/AppAdmin'), { ssr: false });

export type Props = PropsWithChildren<{}>;

const Layout: FC<ExtendedAppProps<PageProps>> = ({ Component, pageProps, globalData, globalStrings }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [cookiebot, setCookiebot] = useState<CookieBot | null>(null);
  const [cookieConsent, setCookieConsent] = useState<boolean>(false);
  const [showDebugGrid, setShowDebugGrid] = useState(true);

  const handleRouteChange = useCallback(
    (url: string) => {
      if (router.asPath !== url) {
        dispatch(setPrevRoute(router.asPath));
      }
    },
    [dispatch, router.asPath]
  );

  useEffect(() => {
    if (cookiebot) setCookieConsent(window.Cookiebot.consent.statistics);
    const handleConsentChange = () => {
      setCookieConsent(window.Cookiebot.consent.statistics);
    };

    if (cookiebot) window.addEventListener('CookiebotOnConsentReady', handleConsentChange);

    return () => {
      if (cookiebot) window.removeEventListener('CookiebotOnConsentReady', handleConsentChange);
    };
  }, [cookiebot]);

  useEffect(() => {
    dispatch(setActiveRoute(router.asPath));
  }, [dispatch, router.asPath]);

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, handleRouteChange]);

  useEffect(() => {
    checkWebpSupport('lossy', (isSupported) => dispatch(setIsWebpSupported(isSupported)));
  }, [dispatch]);

  // globalData prop is not accessible outside build so state was empty
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set in _document.tsx
      const globalData = JSON.parse(document.getElementById('__GLOBAL_DATA__')!.textContent as string);
      dispatch(setGlobalData(globalData));

      const globalStrings = JSON.parse(document.getElementById('__GLOBAL_STRINGS__')!.textContent as string);
      dispatch(setGlobalStrings(globalStrings));

      dispatch(setActiveLang((router?.query?.lang as Lang) ?? Lang.EN));
    }
  }, [dispatch, globalData, router]);

  // Should only run during build of each page to initialize state used when static building out nav
  if (typeof window === 'undefined' && globalData != null) {
    dispatch(setGlobalData(globalData));
    dispatch(setGlobalStrings(globalStrings));
    dispatch(setActiveLang((router?.query?.lang as Lang) ?? Lang.EN));
  }

  return (
    <>
      <GtmScript consent={cookieConsent} />

      <Head {...pageProps.head} />

      <Nav />

      <Component {...pageProps} />

      <Footer />

      <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="d06f53bd-2bee-4c36-bfb9-4c09b9a9f406"
        type="text/javascript"
        data-georegions="{'region':'US-06','cbid':'d1371937-1682-4728-a01d-eb33d7f1c2e4'}"
        data-cookieconsent="preferences,statistics,marketing"
        onLoad={() => setCookiebot(window.Cookiebot)}
      ></Script>
      {process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production' && (
        <>
          {showDebugGrid && <DebugGrid />}
          <AppAdmin showDebugGrid={showDebugGrid} setShowDebugGrid={setShowDebugGrid} />
        </>
      )}
    </>
  );
};

export default memo(Layout);
