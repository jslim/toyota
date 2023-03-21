import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './Footer.module.scss';

import routes from '@/data/routes';

import BaseLink from '@/components/BaseLink/BaseLink';
import Cta, { ButtonType } from '@/components/Cta/Cta';
import Logo from '@/components/Logo/Logo';

import sanitizer from '@/utils/sanitizer';

import { useAppSelector } from '@/redux';

import SvgFacebookLogo from '@/components/svgs/Facebook.svg';
import SvgLinkedinLogo from '@/components/svgs/LinkedIn.svg';
import SvgLogoTitle from '@/components/svgs/logo-title.svg';
import SvgLogoCapital from '@/components/svgs/logo-woven-capital.svg';
import SvgLogoCity from '@/components/svgs/logo-woven-city.svg';
import SvgMediumLogo from '@/components/svgs/Medium.svg';
import SvgTwitterLogo from '@/components/svgs/Twitter.svg';
import SvgYoutubeLogo from '@/components/svgs/Youtube.svg';

export interface FooterProps {
  className?: string;
}

const locations = ['Tokyo', 'San Francisco Bay Area, CA', 'Seattle, WA', 'Ann Arbor, MI', 'Brooklyn, Ny', 'London'];

const socialMedia = [
  { linkedin: 'https://linkedin.com/' },
  { facebook: 'https://facebook.com/' },
  { twitter: 'https://twitter.com/' },
  { youtube: 'https://youtube.com/' },
  { medium: 'https://medium.com/' }
];

const externalLinks = [
  { title: 'Privacy Policy', link: '/' },
  { title: 'Terms Of Use', link: '/' },
  { title: 'Cookie Policy', link: '/' }
];

const siteName = 'Woven Planet Holdings, Inc.';

const Footer: FC<FooterProps> = ({ className }) => {
  const { footerNavLinks } = useAppSelector((state) => state.globalData);

  return (
    <footer className={classNames('Footer', css.root, className)}>
      <div className={css.footerWrapper}>
        <div className={css.topWrapper}>
          <div className={css.logo}>
            <Logo href={routes.Home.path} isWhite={true} />
          </div>
          <ul className={css.routes}>
            {footerNavLinks.map(
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
          <div className={css.locations}>
            {locations.map((location) => (
              <div className={css.location} key={location}>
                {location}
              </div>
            ))}
          </div>
        </div>
        <div className={css.bottomWrapper}>
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
                  ) : Object.keys(link)[0] === 'youtube' ? (
                    <SvgYoutubeLogo />
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
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
