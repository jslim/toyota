type CookieBot = {
  consent: {
    necessary: boolean;
    preferences: boolean;
    statistics: boolean;
    marketing: boolean;
    method: string;
  };
  consented: boolean;
  declined: boolean;
  hasResponse: boolean;
  doNotTrack: boolean;
  regulations: {
    gdprApplies: boolean;
    ccpaAppliess: boolean;
    lgpdApplies: boolean;
  };
  show: () => void;
  hide: () => void;
  rendew: () => void;
  withdraw: () => void;
};

interface Window {
  dataLayer: Array<object>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Cookiebot: CookieBot;
}

type SetTimeout = ReturnType<typeof setTimeout>;

declare module 'no-op' {
  export default function noop(...args): void;
}

declare module 'get-scroll' {
  export function getScrollTop(): number;
}

declare module '@jam3/stats' {
  export default function stats(): Stats;
}

declare module '*.svg' {
  const src: (props: React.SVGProps<SVGElement>) => React.ReactElement;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}
