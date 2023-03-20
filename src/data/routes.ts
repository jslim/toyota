export type Route = {
  readonly path: string;
  readonly title: string;
};

export interface Routes {
  readonly Home: Route;
  readonly WhatWeBuild: Route;
  readonly WhoWeAre: Route;
  readonly WhatsNew: Route;
  readonly Careers: Route;
  readonly Contact: Route;
}

const routes: Routes = {
  Home: {
    path: '/',
    title: 'Home'
  },
  WhatWeBuild: {
    path: '/what-we-build/',
    title: 'What we Build'
  },
  WhoWeAre: {
    path: '/who-we-are/',
    title: 'Who we Are'
  },
  WhatsNew: {
    path: '/Whats-new/',
    title: 'What’s new'
  },
  Careers: {
    path: '/careers/',
    title: 'Careers'
  },
  Contact: {
    path: '/contact/',
    title: 'Contact'
  }
};

export default routes;
