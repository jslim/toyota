import { FC, memo, useRef, useState } from 'react';
import classNames from 'classnames';

import css from './MobileNav.module.scss';

import BaseButton from '@/components/BaseButton/BaseButton';
import BaseLink from '@/components/BaseLink/BaseLink';
import LanguageToggle from '@/components/LanguageToggle/LanguageToggle';
import Logo from '@/components/Logo/Logo';

import { useAppSelector } from '@/redux';

export type MobileNavProps = {
  className?: string;
};

const MobileNav: FC<MobileNavProps> = ({ className }) => {
  const { mainNavLinks } = useAppSelector((state) => state.activeGlobalData);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  return (
    <div className={classNames('MobileNav', css.root, className)}>
      <div className={css.mobileNavBar}>
        <Logo className={css.logo} href="/" />

        <BaseButton
          className={css.hamburgerWrapper}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Click to view more menu options"
        >
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
                ({ linkUrl, linkText, ariaLabel }, i) =>
                  linkText !== 'Home' && (
                    <li
                      key={linkText}
                      className={classNames({
                        // TODO: set active based on the page
                        [css.active]: i === 2
                      })}
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
