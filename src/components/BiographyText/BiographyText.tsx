import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './BiographyText.module.scss';

export type BiographyTextProps = {
  className?: string;
};

const BiographyText: FC<BiographyTextProps> = ({ className }) => {
  return (
    <div className={classNames('BiographyText', css.root, className)}>
      <div className={css.shortBio}></div>
      <div className={css.longBio}></div>
    </div>
  );
};

export default memo(BiographyText);
