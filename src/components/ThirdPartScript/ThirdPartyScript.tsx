import { FC, memo, useEffect, useRef } from 'react';

export type ThirdPartyScriptProps = {
  sourceUrl?: string;
  scriptId?: string;
};

const ThirdPartScript: FC<ThirdPartyScriptProps> = ({ sourceUrl, scriptId }) => {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Force script to reload on component mount
    if (sourceUrl) {
      const script = document.createElement('script');
      script.src = sourceUrl;
      if (scriptId) script.id = scriptId;
      divRef.current?.appendChild(script);
    }
  }, [scriptId, sourceUrl]);

  return <div ref={divRef}></div>;
};

export default memo(ThirdPartScript);
