import { FC, memo, useRef, useState } from 'react';
import classNames from 'classnames';

import css from './MobileNav.module.scss';

import routes, { Route } from '@/data/routes';

import BaseButton from '@/components/BaseButton/BaseButton';
import BaseLink from '@/components/BaseLink/BaseLink';
import Logo from '@/components/Logo/Logo';

export type MobileNavProps = {
  className?: string;
  links: Route[];
};

const MobileNav: FC<MobileNavProps> = ({ className, links }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  return (
    <div className={classNames('MobileNav', css.root, className)}>
      <div className={css.mobileNavBar}>
        <Logo className={css.logo} href={routes.Home.path} />

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
        <div className={css.mobileMenuWrapper}>
          <ul className={css.routes}>
            {links.map(
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
      )}
    </div>
  );
};

export default memo(MobileNav);
