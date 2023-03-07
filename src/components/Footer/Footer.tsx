import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './Footer.module.scss';

import routes from '@/data/routes';

import BaseLink from '@/components/BaseLink/BaseLink';
import Cta, { ButtonType } from '@/components/Cta/Cta';
import Logo from '@/components/Logo/Logo';

import sanitizer from '@/utils/sanitizer';

import SvgFacebookLogo from '@/components/svgs/Facebook.svg';
import SvgInstagramLogo from '@/components/svgs/Instagram.svg';
import SvgLinkedinLogo from '@/components/svgs/LinkedIn.svg';
import SvgLogoTitle from '@/components/svgs/logo-title.svg';
import SvgLogoCapital from '@/components/svgs/logo-woven-capital.svg';
import SvgLogoCity from '@/components/svgs/logo-woven-city.svg';
import SvgMediumLogo from '@/components/svgs/Medium.svg';
import SvgTwitterLogo from '@/components/svgs/Twitter.svg';

export interface FooterProps {
  className?: string;
}

const locations = ['Tokyo', 'San Francisco Bay Area, CA', 'Seattle, WA', 'Ann Arbor, MI', 'Brooklyn, Ny', 'London'];

const contact = 'contact@woven-planet.global';
const socialMedia = [
  { linkedin: 'https://linkedin.com/' },
  { twitter: 'https://twitter.com/' },
  { instagram: 'https://instagram.com/' },
  { facebook: 'https://facebook.com/' },
  { medium: 'https://medium.com/' }
];

const externalLinks = [
  { title: 'Privacy Policy', link: '/' },
  { title: 'Terms Of Use', link: '/' },
  { title: 'Cookie Policy', link: '/' }
];

const siteName = 'Woven Planet Holdings, Inc.';

const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <footer className={classNames('Footer', css.root, className)}>
      <div className={css.footerWrapper}>
        <Logo className={css.logo} href={routes.Home.path} isWhite={true} />
        <div className={css.topWrapper}>
          <div className={css.locations}>
            {locations.map((location) => (
              <div className={css.location} key={location}>
                {location}
              </div>
            ))}
          </div>
          <ul className={css.routes}>
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
            <li>
              <BaseLink href={'mail:' + contact} title={'email contact'} key={'email'}>
                {contact}
              </BaseLink>
            </li>
          </ul>
        </div>
        <div className={css.bottomWrapper}>
          <div className={css.logosWrapper}>
            <BaseLink href="#" className={css.logoTitle} title={'Toyota footer link'}>
              <SvgLogoTitle />
            </BaseLink>
            <BaseLink href="#" className={css.logoCity} title={'Woven City footer link'}>
              <SvgLogoCity />
            </BaseLink>
            <BaseLink href="#" className={css.logoCapital} title={'Woven Capital footer link'}>
              <SvgLogoCapital />
            </BaseLink>
          </div>
          <div className={css.linksWrapper}>
            <div className={css.socialMedia}>
              {socialMedia.map((link) => (
                <Cta
                  isWhite={true}
                  theme={ButtonType.Icon}
                  href={Object.values(link)[0]}
                  aria-label={Object.keys(link)[0]}
                  className={css.socialMediaButton}
                  key={Object.keys(link)[0]}
                >
                  {Object.keys(link)[0] === 'linkedin' ? (
                    <SvgLinkedinLogo />
                  ) : Object.keys(link)[0] === 'instagram' ? (
                    <SvgInstagramLogo />
                  ) : Object.keys(link)[0] === 'facebook' ? (
                    <SvgFacebookLogo />
                  ) : Object.keys(link)[0] === 'twitter' ? (
                    <SvgTwitterLogo />
                  ) : (
                    <SvgMediumLogo />
                  )}
                </Cta>
              ))}
            </div>
            <ul className={css.externalLinks}>
              {externalLinks.map((item) => (
                <li key={item.title}>
                  <BaseLink href={item.link} title={item.title}>
                    {item.title}
                  </BaseLink>
                </li>
              ))}
              <li className={css.copyright} key="copyright">
                {siteName}
                <span dangerouslySetInnerHTML={{ __html: sanitizer(' &copy; ') }} />
                {new Date().getFullYear()}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
