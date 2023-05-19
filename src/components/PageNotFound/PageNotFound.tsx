import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './PageNotFound.module.scss';

import { PageProps } from '@/data/types';

import TextIntro, { TextIntroLayout } from '@/components/TextIntro/TextIntro';

import { useAppSelector } from '@/redux';

export interface PageNotFoundProps extends PageProps {
  className?: string;
}

const PageNotFound: FC<PageNotFoundProps> = ({ className }) => {
  const { notFoundPageHeader, notFoundPageDescription, notFoundPageButton } = useAppSelector(
    (state) => state.activeGlobalData
  );

  return (
    <main className={classNames('PageNotFound', css.root, className)}>
      <TextIntro
        layout={TextIntroLayout.DEFAULT}
        eyebrow={'404'}
        header={notFoundPageHeader}
        description={notFoundPageDescription}
        ctaProps={{ title: notFoundPageButton, href: '/' }}
      />
    </main>
  );
};

export default memo(PageNotFound);
