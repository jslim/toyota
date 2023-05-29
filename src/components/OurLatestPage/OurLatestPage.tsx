import { FC, memo, useEffect, useMemo, useState } from 'react';

import css from '@/components/ColumnsText/ColumnsText.module.scss';

import { OurLatestPostPageContentType } from '@/data/types';
import { ColumnType, SocialPlatform } from '@/data/variants';

import AssetsDownload from '@/components/Assets/AssetsDownload';
import ColumnsText from '@/components/ColumnsText/ColumnsText';
import Cta, { ButtonType } from '@/components/Cta/Cta';
import Hero, { HeroType } from '@/components/Hero/Hero';
import SocialIcon from '@/components/SocialIcon/SocialIcon';

import { formatDate, getMailTo } from '@/utils/basic-functions';
import { parseContentfulRichText } from '@/utils/parsers/rich-text-parser';
import share from '@/utils/share';

import { useAppSelector } from '@/redux';

import MailSvg from '@/components/svgs/mail.svg';
import ShareSvg from '@/components/svgs/share.svg';

import RelatedNews from '../RelatedNews/RelatedNews';

const socials = [
  {
    platform: SocialPlatform.LINKEDIN,
    label: 'Linkedin Icon'
  },
  {
    platform: SocialPlatform.FACEBOOK,
    label: 'Facebook Icon'
  },
  {
    platform: SocialPlatform.TWITTER,
    label: 'twitter Icon'
  }
];

const OurLatestPostPage: FC<OurLatestPostPageContentType> = ({
  articleAssets,
  pinnedPosts,
  body,
  publishDate,
  category,
  pageTitle,
  thumbnail,
  topic
}) => {
  const { copyLink, copyLinkSuccess, shareText, emailShareBody, emailShareSubject } = useAppSelector(
    (state) => state.activeGlobalStrings
  );
  const [url, setUrl] = useState('');
  const [copyTooltip, setCopyTooltip] = useState<string | null>(null);
  const assetsData = articleAssets?.fields;
  const content = useMemo(() => parseContentfulRichText(body), [body]);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    // hide copied tooltip
    if (copyTooltip === copyLinkSuccess) {
      timeout = setTimeout(() => {
        setCopyTooltip(null);
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [copyTooltip, copyLinkSuccess]);

  const leftSideContent = (
    <div>
      <div className={css.leftSideTopBar}>
        {publishDate && <span className={css.date}>{formatDate(publishDate)}</span>}
        {category && <span className={css.category}>{category}</span>}
      </div>

      <h2 className={css.title}>{pageTitle}</h2>
      <div className={css.shareButtons}>
        <span className={css.shareText}>{shareText}</span>
        {socials.map(({ platform, label }) => (
          <SocialIcon
            key={platform}
            className={css.socialMediaButton}
            platform={platform}
            href={share(platform, url, label)}
            label={label}
            isWhite={false}
          />
        ))}
        <Cta
          theme={ButtonType.Icon}
          className={css.socialMediaButton}
          href={getMailTo({
            email: '',
            subject: emailShareSubject,
            body: emailShareBody
          })}
        >
          <MailSvg />
        </Cta>
        <div
          onMouseEnter={() => copyTooltip !== copyLinkSuccess && setCopyTooltip(copyLink)}
          onMouseLeave={() => copyTooltip === copyLink && setCopyTooltip(null)}
        >
          <Cta
            aria-label={copyLink}
            theme={ButtonType.Icon}
            className={css.socialMediaButton}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopyTooltip(copyLinkSuccess);
            }}
            tooltip={copyTooltip}
          >
            <ShareSvg />
          </Cta>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Hero theme={HeroType.Detail} image={thumbnail} />
      <ColumnsText leftSide={leftSideContent} isSticky={true} theme={ColumnType.COLUMNS_40_60}>
        <span className={css.spacer} />
        {content}
      </ColumnsText>
      {assetsData?.assets.length && <AssetsDownload title={assetsData.eyebrowText} assets={assetsData.assets} />}
      <RelatedNews pinnedPosts={pinnedPosts} category={category} topics={topic} />
    </>
  );
};

export default memo(OurLatestPostPage);
