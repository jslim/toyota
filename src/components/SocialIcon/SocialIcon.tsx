import { FC, memo, ReactElement, useState } from 'react';
import classNames from 'classnames';

import SvgFacebookLogo from '@/components/svgs/Facebook.svg';
import SvgInstagramLogo from '@/components/svgs/Instagram.svg';
import SvgLinkedinLogo from '@/components/svgs/LinkedIn.svg';
import SvgMediumLogo from '@/components/svgs/Medium.svg';
import SvgTwitterLogo from '@/components/svgs/Twitter.svg';
import SvgYoutubeLogo from '@/components/svgs/Youtube.svg';

import BaseLink from '../BaseLink/BaseLink';
import IconCircle from '../IconCircle/IconCircle';

export type SocialIconProps = {
  className?: string;
  platform: string;
  href: string;
  label: string;
  isWhite: boolean;
};

const SocialIcon: FC<SocialIconProps> = ({ className, platform, href, label, isWhite }) => {
  const [hover, setHover] = useState(false);

  const platformIconMap: { [key: string]: ReactElement } = {
    facebook: <SvgFacebookLogo />,
    instagram: <SvgInstagramLogo />,
    linkedin: <SvgLinkedinLogo />,
    medium: <SvgMediumLogo />,
    twitter: <SvgTwitterLogo />,
    youtube: <SvgYoutubeLogo />
  };

  return (
    <div
      className={classNames('SocialIcon', className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <BaseLink href={href} aria-label={label}>
        <IconCircle isWhite={isWhite} isActive={hover}>
          {platformIconMap[platform]}
        </IconCircle>
      </BaseLink>
    </div>
  );
};

export default memo(SocialIcon);
