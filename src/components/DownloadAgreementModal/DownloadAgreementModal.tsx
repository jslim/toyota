import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import JSZip from 'jszip';

import css from './DownloadAgreementModal.module.scss';

import { ContentfulMediaAsset } from '@/data/types';

import { AssetsUnion } from '@/components/Assets/AssetsDownload';
import BaseButton from '@/components/BaseButton/BaseButton';
import Cta from '@/components/Cta/Cta';

import { useAppSelector } from '@/redux';

import CloseSvg from '@/components/svgs/close.svg';

type MediaUnion = AssetsUnion | ContentfulMediaAsset;

export type DownloadAgreementModalProps = {
  className?: string;
  onClose: () => void;
  assets?: MediaUnion[] | MediaUnion;
};

const DownloadAgreementModal: FC<DownloadAgreementModalProps> = ({ className, onClose, assets }) => {
  const {
    downloadAgreementTitle,
    downloadAgreementLabel,
    downloadAgreementTerms,
    downloadAgreementCloseLabel,
    downloadAgreementCallToActionTitle
  } = useAppSelector((state) => state.activeGlobalStrings);
  const [isChecked, setIsChecked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement | HTMLLIElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  const onDownloadClick = useCallback(async (files?: MediaUnion | MediaUnion[]) => {
    if (!files) return;

    if (Array.isArray(files)) {
      let zip = new JSZip();
      files.forEach((file) => {
        let blob = fetch(file.fields.file.url).then((r) => r.blob());
        zip.file(file.fields.file.fileName, blob);
      });

      zip.generateAsync({ type: 'blob' }).then((blob: Blob | MediaSource) => {
        // create temp link to trigger download after the folder is populated
        const tempLink = document.createElement('a');
        tempLink.href = window.URL.createObjectURL(blob);
        tempLink.setAttribute('download', 'Article Assets');
        tempLink.click();
      });
    } else {
      const tempLink = document.createElement('a');
      fetch(files.fields.file.url)
        .then((response) => response.blob())
        .then((blob) => URL.createObjectURL(blob))
        .then((assetUrl) => {
          const fileExtension = files.fields.file.url.split('.').pop();
          const fileName = files.fields.title;
          tempLink.href = assetUrl;
          tempLink.download = `${fileName}.${fileExtension}`;
          tempLink.click();
        });
    }
  }, []);

  return (
    <div
      className={classNames('DownloadAgreementModal', css.root, className)}
      onKeyDown={(event) => handleKeyPress(event)}
    >
      <div className={css.container} ref={containerRef}>
        <BaseButton className={css.close} title={downloadAgreementCloseLabel} onClick={onClose}>
          <CloseSvg />
        </BaseButton>
        <div className={css.title}>{downloadAgreementTitle}</div>
        <p className={css.terms}>{downloadAgreementTerms}</p>
        <div className={css.checkboxWrapper}>
          <input type="checkbox" id="checkbox-id" className={css.checkbox} checked={isChecked} onChange={handleCheck} />
          <label htmlFor="checkbox-id" className={css.label}>
            {downloadAgreementLabel}
          </label>
        </div>
        <Cta
          className={css.cta}
          title={downloadAgreementCallToActionTitle}
          isDisabled={!isChecked}
          onClick={() => onDownloadClick(assets)}
        />
      </div>
    </div>
  );
};

export default memo(DownloadAgreementModal);
