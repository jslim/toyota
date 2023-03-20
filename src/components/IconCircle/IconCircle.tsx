import { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';

import css from './IconCircle.module.scss';

import { ButtonType } from '@/components/Cta/Cta';

export type IconCircleProps = {
  className?: string;
  children?: ReactNode;
  isWhite?: Boolean;
  isActive?: Boolean;
  theme?: ButtonType;
};

const IconCircle: FC<IconCircleProps> = ({ className, children, isWhite, isActive, theme }) => {
  return (
    <div
      className={classNames('IconCircle', css.IconCircle, className, {
        [css.isWhite]: isWhite,
        [css.active]: isActive,
        [css.primary]: theme === ButtonType.Primary,
        [css.large]: theme === ButtonType.Large,
        [css.secondary]: theme === ButtonType.Secondary
      })}
    >
      {(theme === ButtonType.Primary || theme === ButtonType.Secondary) && <span className={css.dot} />}
      <span className={css.overlay} />
      {children}
    </div>
  );
};

export default memo(IconCircle);
