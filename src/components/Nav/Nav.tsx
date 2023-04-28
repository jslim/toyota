import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import css from './Nav.module.scss';

import Banner from '@/components/Banner/Banner';
import BaseLink from '@/components/BaseLink/BaseLink';
import LanguageToggle from '@/components/LanguageToggle/LanguageToggle';
import Logo from '@/components/Logo/Logo';
import MobileNav from '@/components/MobileNav/MobileNav';

import useLayout from '@/hooks/use-layout';

import { useAppSelector } from '@/redux';

export interface NavProps {
  className?: string;
}

const Nav: FC<NavProps> = ({ className }) => {
  const { mainNavLinks, skipToContentText } = useAppSelector((state) => state.activeGlobalData);
  const activeRoute = useAppSelector((state) => state.activeRoute);
  const [isMobile, setIsMobile] = useState(false);
  const { layout } = useLayout();
  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && (layout.mobile || layout.tablet));
  }, [layout]);

  return (
    <div className={css.navWrapper}>
      <Banner />
      <nav className={classNames('Nav', css.root, className)}>
        <div className={css.wrapper}>
          {!isMobile ? (
            <>
              <div className={css.menuWrapper}>
                <a tabIndex={0} aria-label={skipToContentText} className={css.skipToContent} href="#start-of-content">
                  {skipToContentText}
                </a>
                <Logo className={css.logo} href="/" />
                <ul className={css.routes}>
                  {mainNavLinks.map(
                    ({ linkUrl, linkText, ariaLabel }) =>
                      linkText !== 'Home' && (
                        <li
                          key={linkText}
                          className={classNames({
                            [css.active]: activeRoute === linkUrl
                          })}
                        >
                          <BaseLink href={linkUrl} title={linkText} aria-label={ariaLabel}>
                            {linkText}
                          </BaseLink>
                        </li>
                      )
                  )}
                </ul>
              </div>
              <LanguageToggle className={css.langToggle} />
            </>
          ) : (
            <MobileNav />
          )}
        </div>

        <section aria-hidden="true" id="start-of-content"></section>
        {/* </div> */}
      </nav>
    </div>
  );
};

export default Nav;
