import { FC, memo, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import css from './AssetsDownload.module.scss';

import { ContentfulImageAsset } from '@/data/types';

import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';
import Cta from '@/components/Cta/Cta';
import Eyebrow from '@/components/Eyebrow/Eyebrow';
import IconCircle from '@/components/IconCircle/IconCircle';
import SectionWrapper from '@/components/SectionWrapper/SectionWrapper';
import DownloadAgreementModal from '@/components/DownloadAgreementModal/DownloadAgreementModal';

import { Color } from '@/utils/colors';
import PlayIcon from '@/components/VideoPlayer/VideoControls/svgs/play.svg';

import DownloadSvg from '@/components/svgs/svg-arrow-down.svg';
import { getImageUrl } from '@/utils/basic-functions';
import { useAppSelector } from '@/redux';
import BaseButton from '@/components/BaseButton/BaseButton';
import LockBodyScrollService from '@/services/lock-body-scroll';

export type AssetsProps = {
  className?: string;
  title: string;
  assets?: ContentfulImageAsset[];
};

const AssetsDownload: FC<AssetsProps> = ({ className, title, assets }) => {
  const { downloadAssets } = useAppSelector((state) => state.activeGlobalStrings);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<ContentfulImageAsset[] | ContentfulImageAsset>();

  const handleAssetFile = useCallback((assets: ContentfulImageAsset | ContentfulImageAsset[]) => {
    setModalOpen(true);
    setSelectedAsset(assets);
  }, []);

  useEffect(() => {
    modalOpen ? LockBodyScrollService.lock() : LockBodyScrollService.unlock();
  }, [modalOpen]);

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
        <BaseButton onClick={() => handleAssetFile(asset)} className={css.overlay}>
          <IconCircle isWhite={true} className={css.iconCircle}>
            <DownloadSvg />
          </IconCircle>
        </BaseButton>
      </div>
    );
  };

  return (
    <div className={classNames('AssetsDownload', css.root, className)}>
      {modalOpen && <DownloadAgreementModal onClose={() => setModalOpen(false)} assets={selectedAsset} />}
      <SectionWrapper className={css.sectionWrapper} backgroundColor={Color.LIGHT_GREY}>
        <Eyebrow className={css.eyebrow} text={title} />
        <div className={css.assetsWrapper}>{assets?.map((asset, i) => assetComponent(asset, i))}</div>
        {assets && (
          <Cta download={true} className={css.cta} title={downloadAssets} onClick={() => handleAssetFile(assets)} />
        )}
      </SectionWrapper>
    </div>
  );
};

export default memo(AssetsDownload);
