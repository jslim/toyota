import { FC, memo, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import css from './AssetsDownload.module.scss';

import { ContentfulImageAsset, ContentfulVideoAsset } from '@/data/types';

import BaseButton from '@/components/BaseButton/BaseButton';
import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';
import Cta from '@/components/Cta/Cta';
import DownloadAgreementModal from '@/components/DownloadAgreementModal/DownloadAgreementModal';
import Eyebrow from '@/components/Eyebrow/Eyebrow';
import IconCircle from '@/components/IconCircle/IconCircle';
import SectionWrapper from '@/components/SectionWrapper/SectionWrapper';
import PlayIcon from '@/components/VideoPlayer/VideoControls/svgs/play.svg';

import LockBodyScrollService from '@/services/lock-body-scroll';
import { getImageUrl } from '@/utils/basic-functions';
import { Color } from '@/utils/colors';

import { useAppSelector } from '@/redux';

import DownloadSvg from '@/components/svgs/svg-arrow-down.svg';

export type AssetsUnion = ContentfulImageAsset | ContentfulVideoAsset;

export type AssetsProps = {
  className?: string;
  title: string;
  assets?: AssetsUnion[];
};

const AssetsDownload: FC<AssetsProps> = ({ className, title, assets }) => {
  const { downloadAssets } = useAppSelector((state) => state.activeGlobalStrings);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetsUnion | AssetsUnion[]>();

  const handleAssetFile = useCallback((assets: AssetsUnion | AssetsUnion[]): void => {
    setModalOpen(true);
    setSelectedAsset(assets);
  }, []);

  useEffect(() => {
    modalOpen ? LockBodyScrollService.lock() : LockBodyScrollService.unlock();
  }, [modalOpen]);

  const assetComponent = (asset: AssetsUnion, i: number) => {
    const isVideo = asset.fields.file.contentType.includes('video');
    return (
      <div className={css.imageWrapper} key={i}>
        {isVideo ? (
          <img className={css.image} src={getImageUrl('video-thumbnail.png').src} alt="" />
        ) : (
          <ContentfulImage
            className={css.image}
            asset={asset as ContentfulImageAsset}
            imageQuality={50}
            imageSizeMobile={{ extraGutters: 0, numCols: 2 }}
            imageSizeTablet={{ extraGutters: 0, numCols: 4 }}
            imageSizeDesktop={{ extraGutters: 0, numCols: 4 }}
          />
        )}
        <BaseButton
          onClick={() => handleAssetFile(asset)}
          className={classNames(css.overlay, { [css.isVideo]: isVideo })}
        >
          <IconCircle isWhite={true} className={css.iconCircle}>
            {isVideo ? <PlayIcon className={css.playIcon} /> : <DownloadSvg />}
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
