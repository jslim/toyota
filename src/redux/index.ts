import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  GlobalData,
  GlobalDataFields,
  GlobalStrings,
  GlobalStringsFields,
  Lang,
  NavLinks,
  SocialLinks
} from '@/data/types';

import { buildPageMetaData } from '@/utils/parsers/page-metadata-parser-util';

export const defaultGlobalData: GlobalDataFields = {
  mainNavLinks: [] as Array<NavLinks>,
  footerNavLinks: [] as Array<NavLinks>,
  footerLegalLinks: [] as Array<NavLinks>,
  footerSocialLinks: [] as Array<SocialLinks>,
  footerOfficeLocations: [] as Array<string>,
  homepageBannerText: '',
  companyName: 'Woven by Toyota, Inc.',
  showHomepageBanner: false,
  skipToContentText: '',
  notFoundPageHeader: '',
  notFoundPageDescription: '',
  notFoundPageButton: '',
  defaultPageMetadata: buildPageMetaData({}),
  toyotaGlobalLink: {
    linkUrl: 'https://global.toyota/en/',
    linkText: '',
    ariaLabel: '',
    isActive: false
  },
  wovenCityLink: {
    linkUrl: 'https://www.woven-city.global/',
    linkText: '',
    ariaLabel: '',
    isActive: false
  },
  wovenCapitalLink: {
    linkUrl: 'https://woven.vc/',
    linkText: '',
    ariaLabel: '',
    isActive: false
  },
  languageToggleEnglish: 'English',
  languageToggleJapanese: 'Japanese'
};

export const defaultGlobalStrings: GlobalStringsFields = {
  shareText: 'Share Link',
  copyLink: 'Copy Link',
  copyLinkSuccess: 'Link Copied',
  relatedNews: 'Related News',
  emailShareSubject: 'Woven by Toyota',
  emailShareBody: '',
  downloadAssets: 'Download all assets',
  drag: 'Drag',
  learnMore: 'Learn More',
  downloadAgreementTitle: 'Download Agreement',
  downloadAgreementLabel: 'I have read, understood and accept the terms of the Download Agreement',
  downloadAgreementTerms:
    'The Content may only be used for editorial or personal, non-commercial purposes, and may not be used for any commercial purposes, including, without limitation, advertising, marketing and merchandising. In order to download the Content, you must first agree to abide by the following terms.',
  downloadAgreementCloseLabel: 'Close',
  downloadAgreementCallToActionTitle: 'Download'
};

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    prevRoute: '',
    activeRoute: '',
    isWebpSupported: true,
    globalData: {
      [Lang.EN]: { ...defaultGlobalData },
      [Lang.JP]: { ...defaultGlobalData }
    },
    activeGlobalData: { ...defaultGlobalData },
    globalStrings: {
      [Lang.EN]: { ...defaultGlobalStrings },
      [Lang.JP]: { ...defaultGlobalStrings }
    },
    activeGlobalStrings: { ...defaultGlobalStrings },
    activeLang: Lang.EN,
    homepageBannerHeight: 0
  },
  reducers: {
    setActiveRoute(state, action: PayloadAction<string>) {
      state.activeRoute = action.payload;
    },
    setPrevRoute(state, action: PayloadAction<string>) {
      state.prevRoute = action.payload;
    },
    setIsWebpSupported(state, action: PayloadAction<boolean>) {
      state.isWebpSupported = action.payload;
    },
    setGlobalData(state, action: PayloadAction<GlobalData>) {
      state.globalData = action.payload;
    },
    setGlobalStrings(state, action: PayloadAction<GlobalStrings>) {
      state.globalStrings = action.payload;
    },
    setActiveLang(state, action: PayloadAction<Lang>) {
      // Set any necessary state to the localized version based on Lang
      state.activeGlobalData = state.globalData[action.payload];
      state.activeLang = action.payload;
    },
    setHomepageBannerVisibility(state, action: PayloadAction<boolean>) {
      state.activeGlobalData = { ...state.activeGlobalData, showHomepageBanner: action.payload };
      state.homepageBannerHeight = !action.payload ? 0 : state.homepageBannerHeight;
    },
    setHomepageBannerHeight(state, action: PayloadAction<number>) {
      state.homepageBannerHeight = action.payload;
    }
  }
});

export const {
  setActiveRoute,
  setPrevRoute,
  setIsWebpSupported,
  setGlobalData,
  setGlobalStrings,
  setActiveLang,
  setHomepageBannerVisibility,
  setHomepageBannerHeight
} = actions;

export const store = configureStore({ reducer, devTools: process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production' });

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
