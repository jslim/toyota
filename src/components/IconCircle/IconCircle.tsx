import { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';

import css from './IconCircle.module.scss';

export type IconCircleProps = {
  className?: string;
  children?: ReactNode;
  isWhite?: Boolean;
  isActive?: Boolean;
  isCta?: Boolean;
  isLarge?: Boolean;
};

const IconCircle: FC<IconCircleProps> = ({ className, children, isWhite, isActive, isCta, isLarge }) => {
  return (
    <div
      className={classNames('IconCircle', css.IconCircle, className, {
        [css.isWhite]: isWhite,
        [css.active]: isActive,
        [css.isCta]: isCta,
        [css.isLarge]: isLarge
      })}
    >
      {isCta && <span className={css.dot} />}
      <span className={css.overlay} />
      {children}
    </div>
  );
};

export default memo(IconCircle);
