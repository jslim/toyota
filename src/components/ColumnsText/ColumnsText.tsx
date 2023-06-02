import { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';

import css from './ColumnsText.module.scss';

import { ColumnType } from '@/data/variants';

import Eyebrow, { EyebrowProps } from '../Eyebrow/Eyebrow';

export type ColumnsTextProps = {
  className?: string;
  leftSide: string | ReactNode;
  theme?: ColumnType;
  eyebrow?: EyebrowProps;
  isSticky?: boolean;
  children: ReactNode;
  hasTable?: boolean;
};

const ColumnsText: FC<ColumnsTextProps> = ({
  className,
  leftSide,
  eyebrow,
  children,
  isSticky = false,
  hasTable = false,
  theme = ColumnType.COLUMNS_50_50
}) => {
  return (
    <div
      className={classNames('ColumnsTextText', css.root, className, css[theme], {
        [css.isSticky]: isSticky,
        [css.hasTable]: hasTable
      })}
    >
      {eyebrow && !isSticky && <Eyebrow className={css.eyebrow} {...eyebrow} />}
      <div className={css.titleContainer}>{leftSide}</div>
      <div className={css.textContainer}>{children}</div>
    </div>
  );
};

export default memo(ColumnsText);
