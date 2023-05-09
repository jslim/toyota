import {
  CTAContentType,
  FilteredEntity,
  GlobalDataContentType,
  GlobalDataFields,
  NavLinks,
  SocialLinks
} from '@/data/types';
import { SocialPlatform } from '@/data/variants';

const convertCtaToNavLink = (link: FilteredEntity<CTAContentType>) => ({
  linkUrl: link.fields?.linkUrl ?? '',
  linkText: link.fields?.linkText ?? '',
  ariaLabel: link.fields?.ariaLabel ?? '',
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
  const skipToContentText = entity?.skipToContentText ?? 'Skip to content';
  const homepageBannerText = entity?.homepageBannerText ?? '';
  const showHomepageBanner = entity?.showHomepageBanner ?? false;
  const notFoundPageHeader = entity?.notFoundPageHeader;
  const notFoundPageDescription = entity?.notFoundPageDescription;
  const notFoundPageButton = entity.notFoundPageButton;

  return {
    mainNavLinks,
    footerNavLinks,
    footerLegalLinks,
    footerSocialLinks,
    footerOfficeLocations,
    skipToContentText,
    homepageBannerText,
    showHomepageBanner,
    notFoundPageHeader,
    notFoundPageDescription,
    notFoundPageButton
  };
};
