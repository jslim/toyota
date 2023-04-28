import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GlobalDataFields } from '@/data/types';

import { defaultGlobalData } from '@/redux';

import Banner, { BannerProps } from './Banner';

const Mockstore = ({
  mockedState,
  children
}: {
  mockedState: { activeGlobalData: GlobalDataFields; homepageBannerHeight: number };
  children: ReactNode;
}) => (
  <Provider
    store={configureStore(
      createSlice({
        name: 'app',
        initialState: mockedState,
        reducers: {
          setHomepageBannerVisibility(state, action: PayloadAction<boolean>) {
            state.activeGlobalData = { ...state.activeGlobalData, showHomepageBanner: action.payload };
            state.homepageBannerHeight = !action.payload ? 0 : state.homepageBannerHeight;
          },
          setHomepageBannerHeight(state, action: PayloadAction<number>) {
            state.homepageBannerHeight = action.payload;
          }
        }
      })
    )}
  >
    {children}
  </Provider>
);

const initState = {
  activeGlobalData: {
    ...defaultGlobalData,
    showHomepageBanner: true,
    homepageBannerText: 'This is some banner text!'
  },
  homepageBannerHeight: 0
};

export const Default = (args: BannerProps) => (
  <Mockstore mockedState={initState}>
    <Banner {...args} />
  </Mockstore>
);
Default.args = {};

export default { title: 'components/Banner', excludeStories: /.*MockedState$/ };
