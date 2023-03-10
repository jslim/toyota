import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './Logo.module.scss';

import BaseLink from '@/components/BaseLink/BaseLink';

import LogoSVG from '@/components/svgs/logo.svg';
import LogoWhiteSVG from '@/components/svgs/logo-white.svg';

export type LogoProps = {
  className?: string;
  title?: string;
  href?: string;
  isWhite?: boolean;
};

const Logo: FC<LogoProps> = ({ className, title, href, isWhite }) => {
  return (
    <div className={classNames('Logo', css.root, className)}>
      <BaseLink title={title} href={href} aria-label="Toyota Logo">
        {isWhite ? <LogoWhiteSVG className={css.logo} /> : <LogoSVG className={css.logo} />}
      </BaseLink>
    </div>
  );
};

export default memo(Logo);
