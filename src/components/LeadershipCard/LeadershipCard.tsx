import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './LeadershipCard.module.scss';

import ContentfulImage from '../ContentfulImage/ContentfulImage';
import { ContentfulImageAsset } from '@/data/types';
import BaseLink, { Props as LinkProps } from '@/components/BaseLink/BaseLink';

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
        imageQuality={50}
        useSrcSet={false}
        imageSizeMobile={{ extraGutters: 0, numCols: 12 }}
        imageSizeTablet={{ extraGutters: 0, numCols: 12 }}
        imageSizeDesktop={{ extraGutters: 0, numCols: 12 }}
      />
      <div className={css.title}>{title}</div>
      <div className={css.description}>{description}</div>
    </BaseLink>
  );
};

export default memo(LeadershipCard);
