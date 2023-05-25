import { FC, memo, useRef, useState } from 'react';
import classNames from 'classnames';

import css from './MobileNav.module.scss';

import BaseButton from '@/components/BaseButton/BaseButton';
import BaseLink from '@/components/BaseLink/BaseLink';
import LanguageToggle from '@/components/LanguageToggle/LanguageToggle';
import Logo from '@/components/Logo/Logo';

import { setHomepageBannerVisibility, useAppDispatch, useAppSelector } from '@/redux';

export type MobileNavProps = {
  className?: string;
};

const MobileNav: FC<MobileNavProps> = ({ className }) => {
  const { mainNavLinks } = useAppSelector((state) => state.activeGlobalData);
  const activeRoute = useAppSelector((state) => state.activeRoute);
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
    dispatch(setHomepageBannerVisibility(false));
  };

  return (
    <div className={classNames('MobileNav', css.root, className)}>
      <div className={css.mobileNavBar}>
        <Logo className={css.logo} href="/" />

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
      {menuOpen && (
        <div className={css.mobileMenuCon}>
          <div className={css.mobileMenuWrapper}>
            <ul className={css.routes}>
              {mainNavLinks.map(
                ({ linkUrl, linkText, ariaLabel }) =>
                  linkText !== 'Home' && (
                    <li
                      key={linkText}
                      className={classNames({
                        [css.active]: activeRoute === linkUrl
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
      )}
    </div>
  );
};

export default memo(MobileNav);
