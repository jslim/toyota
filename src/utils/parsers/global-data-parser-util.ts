import {
  CTAContentType,
  FilteredEntity,
  GlobalDataContentType,
  GlobalDataFields,
  NavLinks,
  SocialLinks
} from '@/data/types';
import { SocialPlatform } from '@/data/variants';

import { buildPageMetaData } from './page-metadata-parser-util';

const convertCtaToNavLink = (link: FilteredEntity<CTAContentType>): NavLinks => ({
  linkUrl: link?.fields?.linkUrl ?? '',
  linkText: link?.fields?.linkText ?? '',
  ariaLabel: link?.fields?.ariaLabel ?? '',
  isActive: false
});

const convertCtaToSocialLink = (link: FilteredEntity<CTAContentType>) => {
  let platform = SocialPlatform.FACEBOOK;

  const url = link?.fields?.linkUrl;
  if (url.includes('twitter.com')) platform = SocialPlatform.TWITTER;
  if (url.includes('linkedin.com')) platform = SocialPlatform.LINKEDIN;
  if (url.includes('medium.com')) platform = SocialPlatform.MEDIUM;
  if (url.includes('youtube.com')) platform = SocialPlatform.YOUTUBE;

  return {
    linkUrl: link.fields?.linkUrl ?? '',
    linkText: link.fields?.linkText ?? '',
    ariaLabel: link.fields?.ariaLabel ?? '',
    platform
  };
};

/**
 * Maps and/or filters fields from the GlobalData content type within Contentful into fields consumed by components.
 *
 * @param entity Fields on the GlobalData content type
 * @returns GlobalDataFields
 */
export const globalDataParserUtil = (entity: GlobalDataContentType): GlobalDataFields => {
  const mainNavLinks: Array<NavLinks> = entity?.mainNavLinks?.map((link) => convertCtaToNavLink(link));
  const footerNavLinks: Array<NavLinks> = entity?.footerNavLinks?.map((link) => convertCtaToNavLink(link));
  const footerLegalLinks: Array<NavLinks> = entity?.footerLegalLinks?.map((link) => convertCtaToNavLink(link));
  const footerSocialLinks: Array<SocialLinks> = entity?.footerSocialLinks?.map((link) => convertCtaToSocialLink(link));
  const footerOfficeLocations = entity?.footerOfficeLocations || [];
  const footerCookiebotToggleLabel =
    entity?.footerCookiebotToggleLabel ?? 'Do Not Sell Or Share My Personal Information';
  const companyName = entity?.companyName ?? 'Woven by Toyota, Inc.';
  const skipToContentText = entity?.skipToContentText ?? 'Skip to content';
  const homepageBannerText = entity?.homepageBannerText ?? '';
  const homepageBannerClose = entity?.homepageBannerClose ?? 'Close';
  const showHomepageBanner = entity?.showHomepageBanner ?? false;
  const notFoundPageHeader = entity?.notFoundPageHeader;
  const notFoundPageDescription = entity?.notFoundPageDescription;
  const notFoundPageButton = entity?.notFoundPageButton;
  const defaultPageMetadata = buildPageMetaData(entity?.defaultPageMetadata?.fields ?? {});
  const toyotaGlobalLink = convertCtaToNavLink(entity?.toyotaGlobalLink);
  const toyotaGlobalLogo = entity?.toyotaGlobalLogo;
  const wovenCapitalLink = convertCtaToNavLink(entity?.wovenCapitalLink);
  const wovenCapitalLogo = entity?.wovenCapitalLogo;
  const wovenCityLink = convertCtaToNavLink(entity?.wovenCityLink);
  const wovenCityLogo = entity?.wovenCityLogo;
  const languageToggleEnglish = entity?.languageToggleEnglish ?? 'English';
  const languageToggleJapanese = entity?.languageToggleJapanese ?? 'Japanese';
  const goToHomepage = entity?.goToHomepage ?? 'Go to Homepage';

  return {
    mainNavLinks,
    footerNavLinks,
    footerLegalLinks,
    footerSocialLinks,
    footerOfficeLocations,
    footerCookiebotToggleLabel,
    companyName,
    skipToContentText,
    homepageBannerText,
    homepageBannerClose,
    showHomepageBanner,
    notFoundPageHeader,
    notFoundPageDescription,
    notFoundPageButton,
    defaultPageMetadata,
    toyotaGlobalLink,
    toyotaGlobalLogo,
    wovenCapitalLink,
    wovenCapitalLogo,
    wovenCityLink,
    wovenCityLogo,
    languageToggleEnglish,
    languageToggleJapanese,
    goToHomepage
  };
};
