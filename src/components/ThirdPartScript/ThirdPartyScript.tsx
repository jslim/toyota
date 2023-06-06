import { FC, memo } from 'react';

export type ThirdPartyScriptProps = {
  sourceUrl?: string;
  scriptId?: string;
};

const ThirdPartScript: FC<ThirdPartyScriptProps> = ({ sourceUrl, scriptId }) => {
  return sourceUrl ? <script id={scriptId} src={sourceUrl} type="text/javascript" async></script> : null;
};

export default memo(ThirdPartScript);
