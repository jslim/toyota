import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './Spacer.module.scss';

export type SpacerProps = {
  className?: string;
  size: Sizes;
};

export enum Sizes {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

const Spacer: FC<SpacerProps> = ({ className, size }) => {
  return (
    <div
      className={classNames('Spacer', css.root, className, {
        [css.medium]: size === Sizes.MEDIUM,
        [css.large]: size === Sizes.LARGE
      })}
    ></div>
  );
};

export default memo(Spacer);
