import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './ColumnsText.module.scss';
import sanitizer from '@/utils/sanitizer';
import { useLayout } from '@/hooks';
import { ColumnType } from '@/data/variants';

import Eyebrow, { EyebrowProps } from '../Eyebrow/Eyebrow';
import Cta, { CtaProps } from '../Cta/Cta';

export type ColumnsTextProps = {
  className?: string;
  title: string;
  text: string;
  theme?: ColumnType;
  eyebrow?: EyebrowProps;
  cta?: CtaProps;
  isCareer?: boolean;
};

const ColumnsText: FC<ColumnsTextProps> = ({
  className,
  title,
  eyebrow,
  text,
  cta,
  isCareer = false,
  theme = ColumnType['columns-50-50']
}) => {
  const { layout } = useLayout();
  return (
    <div className={classNames('ColumnsTextText', css.root, className, css[theme], { [css.isCareer]: isCareer })}>
      {eyebrow && !isCareer && <Eyebrow className={css.eyebrow} {...eyebrow} />}
      <div className={css.titleContainer}>
        {((isCareer && !layout.mobile) || !isCareer) && (
          <div className={css.titleWrapper}>
            <div className={css.title} dangerouslySetInnerHTML={{ __html: sanitizer(title) }} />
            {cta && <Cta className={css.cta} {...cta} />}
          </div>
        )}
      </div>
      <div className={css.textContainer}>
        <div className={css.text} dangerouslySetInnerHTML={{ __html: sanitizer(text) }} />
        {isCareer && layout.mobile && cta && <Cta className={css.cta} {...cta} />}
      </div>
    </div>
  );
};

export default memo(ColumnsText);
