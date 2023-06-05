import { FC, memo, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import css from './MediaKit.module.scss';

import { ContentfulMediaAsset } from '@/data/types';

import DownloadAgreementModal from '@/components/DownloadAgreementModal/DownloadAgreementModal';
import ListItem from '@/components/ListItem/ListItem';

import LockBodyScrollService from '@/services/lock-body-scroll';

export type MediaKitProps = {
  className?: string;
  items: {
    title: string;
    secondaryText?: string;
    tertiaryText?: string;
    asset?: ContentfulMediaAsset;
    link?: string;
  }[];
};

const MediaKit: FC<MediaKitProps> = ({ className, items }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAsset, setModalAsset] = useState({} as ContentfulMediaAsset);

  const handleClick = useCallback((asset?: ContentfulMediaAsset) => {
    if (asset) {
      setModalOpen(true);
      setModalAsset(asset);
    }
  }, []);

  useEffect(() => {
    modalOpen ? LockBodyScrollService.lock() : LockBodyScrollService.unlock();
  }, [modalOpen]);

  return (
    <div className={classNames('MediaKit', css.root, className)}>
      {modalOpen && <DownloadAgreementModal assets={modalAsset} onClose={() => setModalOpen(false)} />}

      {items.map((item, key) => (
        <ListItem
          {...item}
          link={{ href: item.link }}
          key={key}
          onClick={() => handleClick(item.asset)}
          isMediaKit
          className={css.items}
        />
      ))}
    </div>
  );
};

export default memo(MediaKit);
