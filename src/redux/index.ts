import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CTAContentType, GlobalData } from '@/data/types';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    prevRoute: '',
    isWebpSupported: true,
    globalData: {
      mainNavLinks: [] as Array<CTAContentType>,
      footerNavLinks: [] as Array<CTAContentType>
    }
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
    }
  }
});

export const { setPrevRoute, setIsWebpSupported, setGlobalData } = actions;

export const store = configureStore({ reducer, devTools: process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production' });

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
