import { FC, memo, useState } from 'react';
import classNames from 'classnames';

import { device } from '@jam3/detect';
import { useRouter } from 'next/router';

import css from './LanguageToggle.module.scss';

import { Lang } from '@/data/types';

import BaseButton from '@/components/BaseButton/BaseButton';

import { useAppSelector } from '@/redux';

export type LanguageToggleProps = {
  className?: string;
};

const LanguageToggle: FC<LanguageToggleProps> = ({ className }) => {
  const router = useRouter();
  const activeLang = useAppSelector((state) => state.activeLang);
  const [open, setOpen] = useState(false);
  const handleLangChange = (lang: Lang) => {
    setOpen(false);
    router.push({ query: { lang: lang, slug: router.query.slug } });
  };
  return (
    <div className={classNames('LanguageToggle', css.root, className)}>
      <button
        className={classNames(css.langWrapper, { [css.open]: open })}
        onMouseEnter={() => !device.touch && setOpen(true)}
        onMouseLeave={() => !device.touch && setOpen(false)}
        onClick={() => device.touch && setOpen(!open)}
      >
        <div className={css.bg} />
        {Object.values(Lang).map((lang) => (
          <div className={classNames(css.lang, { [css.active]: activeLang === lang })} key={lang}>
            <BaseButton
              aria-label={lang}
              className={css.langButton}
              onClick={() => activeLang !== lang && handleLangChange(lang)}
            >
              {lang}
            </BaseButton>
          </div>
        ))}
      </button>
    </div>
  );
};

export default memo(LanguageToggle);
