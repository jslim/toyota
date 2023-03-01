import { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';

import css from './IconCircle.module.scss';

export type IconCircleProps = {
  className?: string;
  children?: ReactNode;
  isWhite?: Boolean;
  isActive?: Boolean;
  isCta?: Boolean;
};

const IconCircle: FC<IconCircleProps> = ({ className, children, isWhite, isActive, isCta }) => {
  return (
    <div
      className={classNames('IconCircle', css.IconCircle, className, {
        [css.isWhite]: isWhite,
        [css.active]: isActive,
        [css.isCta]: isCta
      })}
    >
      {isCta && <span className={css.dot} />}
      <span className={css.overlay} />
      {children}
    </div>
  );
};

export default memo(IconCircle);
