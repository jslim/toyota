import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './Eyebrow.module.scss';

import { variants } from '@/data/variants';

export type EyebrowProps = {
  className?: string;
  text: string;
  variant?: string;
};

const Eyebrow: FC<EyebrowProps> = ({ className, text, variant = variants.LIGHT }) => {
  return (
    <div className={classNames('Eyebrow', css.root, className, { [css.dark]: variant === variants.DARK })}>
      <p className={css.text}>{text}</p>
    </div>
  );
};

export default memo(Eyebrow);
