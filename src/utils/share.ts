import { SocialPlatform } from '@/data/variants';

export default function socialShare(socialMediaType: SocialPlatform, url: string, text: string = '') {
  const encodedUrl = encodeURIComponent(String(url));
  const encodedText = encodeURIComponent(String(text));

  switch (socialMediaType) {
    case SocialPlatform.FACEBOOK:
      return `https://www.facebook.com/sharer.php?u=${encodedUrl}`;
    case SocialPlatform.TWITTER:
      return `http://twitter.com/share?url=${encodedUrl}&text=${encodedText}`;
    case SocialPlatform.LINKEDIN:
      return `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`;
    default:
      break;
  }
}
