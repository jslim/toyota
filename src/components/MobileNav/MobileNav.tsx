import { FC, memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';

import css from './MobileNav.module.scss';

import BaseButton from '@/components/BaseButton/BaseButton';
import BaseLink from '@/components/BaseLink/BaseLink';
import LanguageToggle from '@/components/LanguageToggle/LanguageToggle';
import Logo from '@/components/Logo/Logo';

import LockBodyScrollService from '@/services/lock-body-scroll';
import { cleanUrl } from '@/utils/basic-functions';

import { setHomepageBannerVisibility, useAppDispatch, useAppSelector } from '@/redux';

export type MobileNavProps = {
  className?: string;
};

const MobileNav: FC<MobileNavProps> = ({ className }) => {
  const { mainNavLinks, goToHomepage } = useAppSelector((state) => state.activeGlobalData);
  const lang = useAppSelector((state) => state.activeLang);
  const activeRoute = useAppSelector((state) => state.activeRoute);
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const animTL = useRef<GSAPTimeline>();

  const handleClick = () => {
    setMenuOpen(!menuOpen);
    dispatch(setHomepageBannerVisibility(false));
  };

  useEffect(() => {
    animTL.current = gsap
      .timeline({ paused: true })
      .from(ref.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        pointerEvents: 'none',
        duration: 0.6,
        ease: 'ease1'
      })
      .fadeIn([menuItemsRef.current?.children], { stagger: 0.05, ease: 'ease1' }, '-=0.5');
    return () => LockBodyScrollService.unlock();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      LockBodyScrollService.lock();
      animTL.current?.play();
    } else {
      animTL.current?.reverse();
      LockBodyScrollService.unlock();
    }
  }, [menuOpen]);

  return (
    <div className={classNames('MobileNav', css.root, className)}>
      <div className={css.mobileNavBar}>
        <Logo className={css.logo} href={'/' + lang} title={goToHomepage} />

        <BaseButton className={css.hamburgerWrapper} onClick={handleClick} aria-label="Click to view more menu options">
          {!menuOpen ? (
            <div className={css.hamburger} ref={hamburgerRef}>
              <span className={css.line} />
              <span className={css.line} />
            </div>
          ) : (
            <div className={css.close} ref={closeRef}>
              <span className={css.lineWrapper}>
                <span className={css.line} />
                <span className={css.line} />
              </span>
            </div>
          )}
        </BaseButton>
      </div>
      <div className={css.mobileMenuCon} ref={ref}>
        <div className={css.mobileMenuWrapper}>
          <ul className={css.routes} ref={menuItemsRef}>
            {mainNavLinks.map(
              ({ linkUrl, linkText, ariaLabel }) =>
                linkText !== 'Home' && (
                  <li
                    key={linkText}
                    className={classNames({
                      [css.active]: cleanUrl(linkUrl) === cleanUrl(activeRoute)
                    })}
                    onClick={() => setMenuOpen(false)}
                  >
                    <BaseLink href={linkUrl} title={linkText} aria-label={ariaLabel}>
                      {linkText}
                    </BaseLink>
                  </li>
                )
            )}
          </ul>
          <LanguageToggle className={css.langToggle} />
        </div>
      </div>
    </div>
  );
};

export default memo(MobileNav);
