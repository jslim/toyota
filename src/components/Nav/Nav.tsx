import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import css from './Nav.module.scss';

import routes from '@/data/routes';

import BaseLink from '@/components/BaseLink/BaseLink';
import LanguageToggle from '@/components/LanguageToggle/LanguageToggle';
import Logo from '@/components/Logo/Logo';
import MobileNav from '@/components/MobileNav/MobileNav';

import useLayout from '@/hooks/use-layout';

export interface NavProps {
  className?: string;
}

const Nav: FC<NavProps> = ({ className }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { layout } = useLayout();
  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && (layout.mobile || layout.tablet));
  }, [layout]);

  return (
    <nav className={classNames('Nav', css.root, className)}>
      <div className={css.wrapper}>
        {!isMobile ? (
          <>
            <div className={css.menuWrapper}>
              <Logo className={css.logo} href={routes.Home.path} />
              <ul className={css.routes}>
                <a tabIndex={0} aria-label="Skip to content" className={css.skipToContent} href="#start-of-content">
                  Skip to content
                </a>
                {Object.values(routes).map(
                  ({ path, title }, i) =>
                    title !== 'Home' && (
                      <li
                        key={path}
                        className={classNames({
                          // TODO: set active based on the page
                          [css.active]: i === 2
                        })}
                      >
                        <BaseLink href={path} title={title}>
                          {title}
                        </BaseLink>
                      </li>
                    )
                )}
              </ul>
            </div>
            <LanguageToggle className={css.langToggle} />
          </>
        ) : (
          <MobileNav links={Object.values(routes)} />
        )}
      </div>

      <section aria-hidden="true" id="start-of-content"></section>
    </nav>
  );
};

export default Nav;
