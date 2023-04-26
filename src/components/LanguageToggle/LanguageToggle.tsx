import { FC, memo, useState } from 'react';
import classNames from 'classnames';

import css from './LanguageToggle.module.scss';

import { Lang } from '@/data/types';

import BaseButton from '@/components/BaseButton/BaseButton';

import { useAppSelector } from '@/redux';

export type LanguageToggleProps = {
  className?: string;
};

const LanguageToggle: FC<LanguageToggleProps> = ({ className }) => {
  // TODO set language on CMS level
  const activeLang = useAppSelector((state) => state.activeLang);
  const [open, setOpen] = useState(false);
  const handleLangChange = () => {
    setOpen(false);
  };
  return (
    <div className={classNames('LanguageToggle', css.root, className)}>
      <div
        className={classNames(css.langWrapper, { [css.open]: open })}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <div className={css.bg} />
        {Object.values(Lang).map((lang) => (
          <div className={classNames(css.lang, { [css.active]: activeLang === lang })} key={lang}>
            <BaseButton aria-label={lang} className={css.langButton} onClick={() => handleLangChange()}>
              {lang}
            </BaseButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(LanguageToggle);
