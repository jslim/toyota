import { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';

import css from './IconCircle.module.scss';

import { ButtonType } from '@/components/Cta/Cta';

export type IconCircleProps = {
  className?: string;
  children?: ReactNode;
  isWhite?: boolean;
  isActive?: boolean;
  theme?: ButtonType;
  isDisabled?: boolean;
};

const IconCircle: FC<IconCircleProps> = ({ className, children, isWhite, isActive, isDisabled, theme }) => {
  return (
    <div
      className={classNames('IconCircle', css.IconCircle, css[theme || ''], className, {
        [css.isWhite]: isWhite,
        [css.active]: isActive,
        [css.disabled]: isDisabled
      })}
    >
      {(theme === ButtonType.Primary || theme === ButtonType.Secondary) && <span className={css.dot} />}
      <span className={css.overlay} />
      {children}
    </div>
  );
};

export default memo(IconCircle);
