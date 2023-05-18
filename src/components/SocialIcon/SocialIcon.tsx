import { FC, memo, ReactElement, useState } from 'react';
import classNames from 'classnames';

import { SocialPlatform } from '@/data/variants';

import SvgFacebookLogo from '@/components/svgs/Facebook.svg';
import SvgInstagramLogo from '@/components/svgs/Instagram.svg';
import SvgLinkedinLogo from '@/components/svgs/LinkedIn.svg';
import SvgMediumLogo from '@/components/svgs/Medium.svg';
import SvgTwitterLogo from '@/components/svgs/Twitter.svg';
import SvgYoutubeLogo from '@/components/svgs/Youtube.svg';

import Cta, { ButtonType } from '../Cta/Cta';

export type SocialIconProps = {
  className?: string;
  platform: SocialPlatform;
  href: string;
  label?: string;
  isWhite: boolean;
};

const platformIconMap: { [key in SocialPlatform]: ReactElement } = {
  [SocialPlatform.FACEBOOK]: <SvgFacebookLogo />,
  [SocialPlatform.INSTAGRAM]: <SvgInstagramLogo />,
  [SocialPlatform.LINKEDIN]: <SvgLinkedinLogo />,
  [SocialPlatform.MEDIUM]: <SvgMediumLogo />,
  [SocialPlatform.TWITTER]: <SvgTwitterLogo />,
  [SocialPlatform.YOUTUBE]: <SvgYoutubeLogo />
};

const SocialIcon: FC<SocialIconProps> = ({ className, platform, href, label, isWhite }) => {
  const [hover, setHover] = useState(false);

  return (
    <Cta
      className={classNames('SocialIcon', className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      href={href}
      aria-label={label}
      isWhite={isWhite}
      isActive={hover}
      theme={ButtonType.Icon}
    >
      {platformIconMap[platform]}
    </Cta>
  );
};

export default memo(SocialIcon);
