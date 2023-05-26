import { FC, memo, useCallback } from 'react';
import classNames from 'classnames';
import JSZip from 'jszip';

import css from './AssetsDownload.module.scss';

import { ContentfulImageAsset } from '@/data/types';

import BaseLink from '@/components/BaseLink/BaseLink';
import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';
import Cta from '@/components/Cta/Cta';
import Eyebrow from '@/components/Eyebrow/Eyebrow';
import IconCircle from '@/components/IconCircle/IconCircle';
import SectionWrapper from '@/components/SectionWrapper/SectionWrapper';

import { Color } from '@/utils/colors';
import PlayIcon from '@/components/VideoPlayer/VideoControls/svgs/play.svg';

import DownloadSvg from '@/components/svgs/svg-arrow-down.svg';
import { getImageUrl } from '@/utils/basic-functions';
import { useAppSelector } from '@/redux';

export type AssetsProps = {
  className?: string;
  title: string;
  assets?: ContentfulImageAsset[];
};

const AssetsDownload: FC<AssetsProps> = ({ className, title, assets }) => {
  const { downloadAssets } = useAppSelector((state) => state.activeGlobalStrings);

  const handleZipFolder = useCallback((files: ContentfulImageAsset[]) => {
    let zip = new JSZip();
    files.map((file) => {
      let blob = fetch(file.fields.file.url).then((r) => r.blob());
      return zip.file(file.fields.file.fileName, blob);
    });

    zip.generateAsync({ type: 'blob' }).then((blob: Blob | MediaSource) => {
      // create temp link to trigger download after the folder is populated
      let tempLink = document.createElement('a');
      tempLink.href = window.URL.createObjectURL(blob);
      tempLink.setAttribute('download', 'Article Assets');
      tempLink.click();
    });
  }, []);

  const assetComponent = (asset: ContentfulImageAsset, i: number) => {
    const isVideo = asset.fields.file.contentType.includes('video');
    return (
      <div className={css.imageWrapper} key={i}>
        {isVideo ? (
          <img className={css.image} src={getImageUrl('video-thumbnail.png').src} alt="" />
        ) : (
          <ContentfulImage
            className={css.image}
            asset={asset}
            imageQuality={50}
            imageSizeMobile={{ extraGutters: 0, numCols: 2 }}
            imageSizeTablet={{ extraGutters: 0, numCols: 4 }}
            imageSizeDesktop={{ extraGutters: 0, numCols: 4 }}
          />
        )}
        <BaseLink
          download={true}
          href={asset.fields.file.url}
          className={classNames(css.overlay, { [css.isVideo]: isVideo })}
        >
          <IconCircle isWhite={true} className={css.iconCircle}>
            {isVideo ? <PlayIcon className={css.playIcon} /> : <DownloadSvg />}
          </IconCircle>
        </BaseLink>
      </div>
    );
  };

  return (
    <div className={classNames('AssetsDownload', css.root, className)}>
      <SectionWrapper className={css.sectionWrapper} backgroundColor={Color.LIGHT_GREY}>
        <Eyebrow className={css.eyebrow} text={title} />
        <div className={css.assetsWrapper}>{assets?.map((asset, i) => assetComponent(asset, i))}</div>
        {assets && (
          <Cta download={true} className={css.cta} title={downloadAssets} onClick={() => handleZipFolder(assets)} />
        )}
      </SectionWrapper>
    </div>
  );
};

export default memo(AssetsDownload);
