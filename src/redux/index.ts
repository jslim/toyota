import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GlobalData, Lang, NavLinks } from '@/data/types';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    prevRoute: '',
    isWebpSupported: true,
    globalData: {
      [Lang.EN]: {
        mainNavLinks: [] as Array<NavLinks>,
        footerNavLinks: [] as Array<NavLinks>,
        skipToContentText: ''
      },
      [Lang.JP]: {
        mainNavLinks: [] as Array<NavLinks>,
        footerNavLinks: [] as Array<NavLinks>,
        skipToContentText: ''
      }
    },
    activeGlobalData: {
      mainNavLinks: [] as Array<NavLinks>,
      footerNavLinks: [] as Array<NavLinks>,
      skipToContentText: ''
    },
    activeLang: Lang.EN
  },
  reducers: {
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
    }
  }
});

export const { setPrevRoute, setIsWebpSupported, setGlobalData, setActiveLang } = actions;

export const store = configureStore({ reducer, devTools: process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production' });

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
