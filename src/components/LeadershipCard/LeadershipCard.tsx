import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './LeadershipCard.module.scss';

import { ContentfulImageAsset } from '@/data/types';

import BaseLink, { Props as LinkProps } from '@/components/BaseLink/BaseLink';
import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';

export type LeadershipCardProps = {
  className?: string;
  title: string;
  image: ContentfulImageAsset;
  description: string;
  cta: LinkProps;
};

const LeadershipCard: FC<LeadershipCardProps> = ({ className, title, description, image, cta }) => {
  return (
    <BaseLink {...cta} className={classNames('LeadershipCard', css.root, className)}>
      <ContentfulImage
        className={css.image}
        asset={image}
        imageSizeMobile={{ extraGutters: 0, numCols: 2 }}
        imageSizeTablet={{ extraGutters: 1, numCols: 3 }}
        imageSizeDesktop={{ extraGutters: 1, numCols: 2 }}
      />
      <div className={css.content}>
        <div className={css.title}>{title}</div>
        <div className={css.description}>{description}</div>
      </div>
    </BaseLink>
  );
};

export default memo(LeadershipCard);
