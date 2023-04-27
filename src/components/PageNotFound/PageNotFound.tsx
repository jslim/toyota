import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './PageNotFound.module.scss';

import { PageProps } from '@/data/types';

import { Props as LinkProps } from '@/components/BaseLink/BaseLink';
import TextIntro, { TextIntroLayout } from '@/components/TextIntro/TextIntro';

export interface PageNotFoundProps extends PageProps {
  className?: string;
  eyebrow?: string;
  header?: string;
  description?: string;
  ctaProps?: LinkProps;
}

const PageNotFound: FC<PageNotFoundProps> = ({
  className,
  eyebrow = '404',
  header = 'Page Not Found',
  description,
  ctaProps
}) => {
  return (
    <main className={classNames('PageNotFound', css.root, className)}>
      <TextIntro
        layout={TextIntroLayout.DEFAULT_BACKGROUND_IMAGE}
        eyebrow={eyebrow}
        header={header}
        description={description}
        ctaProps={ctaProps}
      />
    </main>
  );
};

export default memo(PageNotFound);
