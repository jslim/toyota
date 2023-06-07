import { FC, memo, useEffect } from 'react';

export type ThirdPartyScriptProps = {
  sourceUrl?: string;
  scriptId?: string;
};

const ThirdPartScript: FC<ThirdPartyScriptProps> = ({ sourceUrl, scriptId }) => {
  useEffect(() => {
    // Force Cookie Declartion to init
    window?.CookieControl?.CookieDeclaration && window?.CookieControl?.CookieDeclaration();
  }, []);

  return sourceUrl ? <script id={scriptId} src={sourceUrl} type="text/javascript" async></script> : null;
};

export default memo(ThirdPartScript);
