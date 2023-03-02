import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './Logo.module.scss';
import BaseLink from '../BaseLink/BaseLink';
import LogoSVG from '@/components/svgs/logo.svg';

export type LogoProps = {
  className?: string;
  title?: string;
  href?: string;
};

const Logo: FC<LogoProps> = ({ className, title, href }) => {
  return (
    <div className={classNames('Logo', css.root, className)}>
      <BaseLink title={title} href={href} aria-label="Toyota Logo">
        <LogoSVG className={css.logo} />
      </BaseLink>
    </div>
  );
};

export default memo(Logo);
