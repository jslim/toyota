import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './BiographyText.module.scss';

export type BiographyTextProps = {
  className?: string;
  titles: string[];
  texts: string[];
};

const BiographyText: FC<BiographyTextProps> = ({ className, titles, texts }) => {
  return (
    <div className={classNames('BiographyText', css.root, className)}>
      <div className={css.titleContainer}>
        {titles.map((title, key) => (
          <h4 key={key} className={css.title}>
            {title}
          </h4>
        ))}
      </div>
      <div className={css.textContainer}>
        {texts.map((text, key) => (
          <p key={key} className={css.text}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default memo(BiographyText);
