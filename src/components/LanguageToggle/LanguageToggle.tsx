import { FC, memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { device } from '@jam3/detect';
import classNames from 'classnames';

import css from './LanguageToggle.module.scss';

import { Lang } from '@/data/types';

import BaseButton from '@/components/BaseButton/BaseButton';

import { useAppSelector } from '@/redux';

export type LanguageToggleProps = {
  className?: string;
};

const LanguageToggle: FC<LanguageToggleProps> = ({ className }) => {
  const router = useRouter();
  const initLang = useAppSelector((state) => state.activeLang);
  const [activeLang, setActiveLang] = useState(initLang);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setActiveLang(initLang);
  }, [initLang]);

  const handleLangChange = (lang: Lang) => {
    setOpen(false);
    setActiveLang(lang);
    router.push({
      query: {
        lang: lang,
        slug: router.asPath
          .split('/')
          .filter((item) => item !== '' && Object.values(Lang).every((lang) => item !== lang) && item)
          .join('/')
      }
    });
  };
  return (
    <div className={classNames('LanguageToggle', css.root, className)}>
      <div
        className={classNames(css.langWrapper, { [css.open]: open })}
        onMouseEnter={() => !device.touch && setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <div className={css.bg} />
        {Object.values(Lang).map((lang) => (
          <div className={classNames(css.lang, { [css.active]: activeLang === lang })} key={lang}>
            <BaseButton
              aria-label={lang}
              className={css.langButton}
              onClick={() => {
                setOpen(true);
                activeLang !== lang && open && handleLangChange(lang);
              }}
            >
              {lang}
            </BaseButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(LanguageToggle);
