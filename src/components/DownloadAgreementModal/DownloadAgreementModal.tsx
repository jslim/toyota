import { FC, memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import css from './DownloadAgreementModal.module.scss';

import BaseButton from '@/components/BaseButton/BaseButton';
import { Props as LinkProps } from '@/components/BaseLink/BaseLink';
import Cta from '@/components/Cta/Cta';

import CloseSvg from '@/components/svgs/close.svg';

export type DownloadAgreementModalProps = {
  className?: string;
  title: string;
  terms: string;
  label: string;
  cta: LinkProps;
  closeLabel?: string;
  onClose: () => void;
};

const DownloadAgreementModal: FC<DownloadAgreementModalProps> = ({
  className,
  title,
  terms,
  label,
  cta,
  closeLabel,
  onClose
}) => {
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

  return (
    <div
      className={classNames('DownloadAgreementModal', css.root, className)}
      onKeyDown={(event) => handleKeyPress(event)}
    >
      <div className={css.container} ref={containerRef}>
        <BaseButton title={closeLabel} onClick={onClose}>
          <CloseSvg className={css.close} />
        </BaseButton>
        <div className={css.title}>{title}</div>
        <p className={css.terms}>{terms}</p>
        <div className={css.checkboxWrapper}>
          <input type="checkbox" id="checkbox-id" className={css.checkbox} checked={isChecked} onChange={handleCheck} />
          <label htmlFor="checkbox-id" className={css.label}>
            {label}
          </label>
        </div>
        {isChecked ? <Cta {...cta} /> : <Cta title={cta.title} />}
      </div>
    </div>
  );
};

export default memo(DownloadAgreementModal);
