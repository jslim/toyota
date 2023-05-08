import { FC, memo, useCallback, useState } from 'react';
import classNames from 'classnames';

import css from './MediaKit.module.scss';
import DownloadAgreementModal from '@/components/DownloadAgreementModal/DownloadAgreementModal';
import ListItem from '@/components/ListItem/ListItem';

export type MediaKitProps = {
  className?: string;
  modal?: {
    title: string;
    terms: string;
    label: string;
    cta: string;
  };
  items: {
    title: string;
    secondaryText?: string;
    tertiaryText?: string;
    assetsLink?: string;
    link?: string;
  }[];
};

const MediaKit: FC<MediaKitProps> = ({ className, modal, items }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLink, setModalLink] = useState('');

  const handleClick = useCallback((link?: string) => {
    if (link) {
      setModalOpen(true);
      setModalLink(link);
    }
  }, []);

  return (
    <div className={classNames('MediaKit', css.root, className)}>
      {modalOpen && (
        <DownloadAgreementModal
          title={modal?.title}
          terms={modal?.terms}
          label={modal?.label}
          cta={{ href: 'https:' + modalLink, title: modal?.cta }}
          onClose={() => setModalOpen(false)}
        />
      )}

      {items.map((item, key) => (
        <ListItem
          {...item}
          link={{ href: item.link }}
          key={key}
          onClick={() => handleClick(item.assetsLink)}
          isMediaKit
          className={css.items}
        />
      ))}
    </div>
  );
};

export default memo(MediaKit);
