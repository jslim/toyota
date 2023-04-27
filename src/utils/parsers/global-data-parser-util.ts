import { CTAContentType, FilteredEntity, GlobalDataContentType, GlobalDataFields, NavLinks } from '@/data/types';

const convertCtaToNavLink = (link: FilteredEntity<CTAContentType>) => ({
  linkUrl: link.fields?.linkUrl ?? '',
  linkText: link.fields?.linkText ?? '',
  ariaLabel: link.fields?.ariaLabel ?? '',
  isActive: false
});

/**
 * Maps and/or filters fields from the GlobalData content type within Contentful into fields consumed by components.
 *
 * @param entity Fields on the GlobalData content type
 * @returns GlobalDataFields
 */
export const globalDataParserUtil = (entity: GlobalDataContentType): GlobalDataFields => {
  const mainNavLinks: Array<NavLinks> = entity?.mainNavLinks?.map((link) => convertCtaToNavLink(link));
  const footerNavLinks: Array<NavLinks> = entity?.footerNavLinks?.map((link) => convertCtaToNavLink(link));
  const skipToContentText = entity?.skipToContentText ?? 'Skip to content';
  const homepageBannerText = entity?.homepageBannerText ?? '';
  const showHomepageBanner = entity?.showHomepageBanner ?? false;
  const notFoundPageHeader = entity?.notFoundPageHeader;
  const notFoundPageDescription = entity?.notFoundPageDescription;
  const notFoundPageButton = entity.notFoundPageButton;

  return {
    mainNavLinks,
    footerNavLinks,
    skipToContentText,
    homepageBannerText,
    showHomepageBanner,
    notFoundPageHeader,
    notFoundPageDescription,
    notFoundPageButton
  };
};
