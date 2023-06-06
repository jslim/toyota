import { HeadProps, PageMetadataContentType } from '@/data/types';

export const buildPageMetaData = (metadata: PageMetadataContentType): HeadProps => {
  const title = metadata?.metaTitle ?? '';
  const description = metadata?.metaDescription ?? '';
  const keywords = metadata?.metaKeywords ?? [];
  const siteName = metadata?.metaSiteName ?? '';
  const image = metadata?.metaShareImage?.fields?.file?.url ?? '';

  return {
    title,
    description,
    keywords,
    siteName,
    image: image && `${image}?w=1200`
  };
};
