import { FC, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import css from './Nav.module.scss';

import Banner from '@/components/Banner/Banner';
import BaseLink from '@/components/BaseLink/BaseLink';
import LanguageToggle from '@/components/LanguageToggle/LanguageToggle';
import Logo from '@/components/Logo/Logo';
import MobileNav from '@/components/MobileNav/MobileNav';

import resize from '@/services/resize';
import useLayout from '@/hooks/use-layout';
import { cleanUrl } from '@/utils/basic-functions';

import { setNavbarHeight, useAppDispatch, useAppSelector } from '@/redux';

export interface NavProps {
  className?: string;
}

const Nav: FC<NavProps> = ({ className }) => {
  const { mainNavLinks, skipToContentText, goToHomepage } = useAppSelector((state) => state.activeGlobalData);
  const activeRoute = useAppSelector((state) => state.activeRoute.split('?')[0]);
  const lang = useAppSelector((state) => state.activeLang);
  const [isMobile, setIsMobile] = useState(false);
  const { layout } = useLayout();
  const dispatch = useAppDispatch();
  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && (layout.mobile || layout.tablet));
  }, [layout]);

  const navRef = useCallback(
    (node: HTMLDivElement | null) => {
      const updateNavbarHeight = () => {
        const { height } = node!.getBoundingClientRect();
        dispatch(setNavbarHeight(height));
      };

      if (node !== null) {
        updateNavbarHeight();
        resize.listen(updateNavbarHeight);
      } else {
        resize.dismiss(updateNavbarHeight);
      }
    },
    [dispatch]
  );

  return (
    <div className={css.navWrapper}>
      <a tabIndex={0} aria-label={skipToContentText} className={css.skipToContent} href="#start-of-content">
        {skipToContentText}
      </a>
      <Banner />
      <nav className={classNames('Nav', css.root, className)} ref={navRef}>
        <div className={css.wrapper}>
          {!isMobile ? (
            <>
              <div className={css.menuWrapper}>
                <Logo className={css.logo} href={'/' + lang} title={goToHomepage} />
                <ul className={css.routes}>
                  {mainNavLinks.map(
                    ({ linkUrl, linkText, ariaLabel }) =>
                      linkText !== 'Home' && (
                        <li
                          key={linkText}
                          className={classNames({
                            [css.active]: cleanUrl(linkUrl) === cleanUrl(activeRoute)
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
      </nav>
    </div>
  );
};

export default Nav;
