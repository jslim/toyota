import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './Footer.module.scss';

import routes from '@/data/routes';
import { SocialPlatform } from '@/data/variants';

import BaseLink from '@/components/BaseLink/BaseLink';
import Logo from '@/components/Logo/Logo';

import sanitizer from '@/utils/sanitizer';

import { useAppSelector } from '@/redux';

import SvgLogoTitle from '@/components/svgs/logo-title.svg';
import SvgLogoCapital from '@/components/svgs/logo-woven-capital.svg';
import SvgLogoCity from '@/components/svgs/logo-woven-city.svg';

import SocialIcon from '../SocialIcon/SocialIcon';
export interface FooterProps {
  className?: string;
}

const locations = ['Tokyo', 'San Francisco Bay Area, CA', 'Seattle, WA', 'Ann Arbor, MI', 'Brooklyn, Ny', 'London'];

const socials = [
  {
    platform: SocialPlatform.LINKEDIN,
    href: 'https://linkedin.com/or-something',
    label: 'Linkedin Icon'
  },
  {
    platform: SocialPlatform.FACEBOOK,
    href: 'https://facebook.com/or-something',
    label: 'Facebook Icon'
  },
  {
    platform: SocialPlatform.TWITTER,
    href: 'https://twitter.com/or-something',
    label: 'twitter Icon'
  },
  {
    platform: SocialPlatform.YOUTUBE,
    href: 'https://youtube.com/or-something',
    label: 'Youtube Icon'
  },
  {
    platform: SocialPlatform.MEDIUM,
    href: 'https://medium.com/or-something',
    label: 'Medium Icon'
  }
];

const externalLinks = [
  { title: 'Privacy Policy', link: '/' },
  { title: 'Terms Of Use', link: '/' },
  { title: 'Cookie Policy', link: '/' }
];

const siteName = 'Woven Planet Holdings, Inc.';

const Footer: FC<FooterProps> = ({ className }) => {
  const { footerNavLinks } = useAppSelector((state) => state.activeGlobalData);

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
              {socials.map(({ platform, href, label }) => (
                <SocialIcon
                  key={platform}
                  className={css.socialMediaButton}
                  platform={platform}
                  href={href}
                  label={label}
                  isWhite={true}
                />
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
