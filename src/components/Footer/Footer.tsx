import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './Footer.module.scss';

import routes from '@/data/routes';

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

const Footer: FC<FooterProps> = ({ className }) => {
  const { footerNavLinks, footerLegalLinks, footerSocialLinks, footerOfficeLocations, companyName } = useAppSelector(
    (state) => state.activeGlobalData
  );
  const activeRoute = useAppSelector((state) => state.activeRoute);

  return (
    <footer className={classNames('Footer', css.root, className)}>
      <div className={css.footerWrapper}>
        <div className={css.topWrapper}>
          <div className={css.logo}>
            <Logo href={routes.Home.path} isWhite={true} />
          </div>
          <ul className={css.routes}>
            {footerNavLinks.map(
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
          <div className={css.locations}>
            {footerOfficeLocations?.map((location) => (
              <div className={css.location} key={location}>
                {location}
              </div>
            ))}
          </div>
        </div>
        <div className={css.bottomWrapper}>
          <div className={css.linksWrapper}>
            <div className={css.socialMedia}>
              {footerSocialLinks?.map(({ platform, linkUrl, linkText, ariaLabel }) => (
                <SocialIcon
                  key={platform}
                  className={css.socialMediaButton}
                  platform={platform}
                  href={linkUrl}
                  label={linkText ?? ariaLabel}
                  isWhite={true}
                />
              ))}
            </div>
            <ul className={css.externalLinks}>
              {footerLegalLinks?.map((item) => (
                <li key={item.linkText}>
                  <BaseLink href={item.linkUrl} title={item.linkText}>
                    {item.linkText}
                  </BaseLink>
                </li>
              ))}
              <li className={css.copyright} key="copyright">
                {companyName}
                <span dangerouslySetInnerHTML={{ __html: sanitizer(' &copy; ') }} />
                {new Date().getFullYear()}
              </li>
            </ul>
          </div>
          <div className={css.logosWrapper}>
            <BaseLink href="#" className={css.logoTitle} title={'Toyota footer link'}>
              <SvgLogoTitle className={css.footerLogos} />
            </BaseLink>
            <BaseLink href="#" className={css.logoCity} title={'Woven City footer link'}>
              <SvgLogoCity className={css.footerLogos} />
            </BaseLink>
            <BaseLink href="#" className={css.logoCapital} title={'Woven Capital footer link'}>
              <SvgLogoCapital className={css.footerLogos} />
            </BaseLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
