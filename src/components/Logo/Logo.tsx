import { FC, memo, useMemo } from 'react';
import classNames from 'classnames';

import css from './Logo.module.scss';

import BaseLink from '@/components/BaseLink/BaseLink';

import { useLayout } from '@/hooks';

import LogoSVG from '@/components/svgs/woven-logo.svg';
import LogoMobileSVG from '@/components/svgs/woven-logo-mobile.svg';
import LogoWhiteMobileSVG from '@/components/svgs/woven-logo-mobile-white.svg';
import LogoWhiteSVG from '@/components/svgs/woven-logo-white.svg';

export type LogoProps = {
  className?: string;
  title?: string;
  href?: string;
  isWhite?: boolean;
};

const Logo: FC<LogoProps> = ({ className, title, href, isWhite }) => {
  const { layout } = useLayout();
  const isMobile = useMemo(() => {
    return typeof window !== 'undefined' && (layout.tablet || layout.mobile);
  }, [layout.mobile, layout.tablet]);

  return (
    <div className={classNames('Logo', css.root, className, { [css.isMobile]: isMobile })}>
      <BaseLink title={title} href={href} aria-label="Toyota Logo">
        {isMobile ? (
          isWhite ? (
            <LogoWhiteMobileSVG className={css.logo} />
          ) : (
            <LogoMobileSVG className={css.logo} />
          )
        ) : isWhite ? (
          <LogoWhiteSVG className={css.logo} />
        ) : (
          <LogoSVG className={css.logo} />
        )}
      </BaseLink>
    </div>
  );
};

export default memo(Logo);
