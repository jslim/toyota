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

import { useAppSelector } from '@/redux';

import DownloadSvg from '@/components/svgs/svg-arrow-down.svg';

export type AssetsProps = {
  className?: string;
  title: string;
  assets?: ContentfulImageAsset[];
};

const AssetsDownload: FC<AssetsProps> = ({ className, title, assets }) => {
  const { downloadAssets } = useAppSelector((state) => state.activeGlobalStrings);

  const handleZipFolder = useCallback((files: ContentfulImageAsset[]) => {
    let zip = new JSZip();
    files.forEach((file) => {
      let blob = fetch(file.fields.file.url).then((r) => r.blob());
      zip.file(file.fields.file.fileName, blob);
    });

    zip.generateAsync({ type: 'blob' }).then((blob: Blob | MediaSource) => {
      // create temp link to trigger download after the folder is populated
      let tempLink = document.createElement('a');
      tempLink.href = window.URL.createObjectURL(blob);
      tempLink.setAttribute('download', 'Article Assets');
      tempLink.click();
    });
  }, []);

  return (
    <div className={classNames('AssetsDownload', css.root, className)}>
      <SectionWrapper className={css.sectionWrapper} backgroundColor={Color.LIGHT_GREY}>
        <Eyebrow className={css.eyebrow} text={title} />
        <div className={css.assetsWrapper}>
          {assets?.map((image, i) => (
            <div className={css.imageWrapper} key={i}>
              <ContentfulImage
                className={css.image}
                asset={image}
                imageQuality={50}
                imageSizeMobile={{ extraGutters: 0, numCols: 2 }}
                imageSizeTablet={{ extraGutters: 0, numCols: 4 }}
                imageSizeDesktop={{ extraGutters: 0, numCols: 4 }}
              />
              <BaseLink download={true} href={image.fields.file.url} className={css.overlay}>
                <IconCircle isWhite={true} className={css.iconCircle}>
                  <DownloadSvg />
                </IconCircle>
              </BaseLink>
            </div>
          ))}
        </div>
        {assets && (
          <Cta download={true} className={css.cta} title={downloadAssets} onClick={() => handleZipFolder(assets)} />
        )}
      </SectionWrapper>
    </div>
  );
};

export default memo(AssetsDownload);
