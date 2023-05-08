import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GlobalData, GlobalDataFields, Lang, NavLinks, SocialLinks } from '@/data/types';

export const defaultGlobalData: GlobalDataFields = {
  mainNavLinks: [] as Array<NavLinks>,
  footerNavLinks: [] as Array<NavLinks>,
  footerLegalLinks: [] as Array<NavLinks>,
  footerSocialLinks: [] as Array<SocialLinks>,
  homepageBannerText: '',
  showHomepageBanner: false,
  skipToContentText: '',
  notFoundPageHeader: '',
  notFoundPageDescription: '',
  notFoundPageButton: ''
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
  setActiveLang,
  setHomepageBannerVisibility,
  setHomepageBannerHeight
} = actions;

export const store = configureStore({ reducer, devTools: process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production' });

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
