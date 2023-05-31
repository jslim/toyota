import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './AccordionContentCard.module.scss';

import { Props as LinkProps } from '@/components/BaseLink/BaseLink';
import Cta, { ButtonType } from '@/components/Cta/Cta';

export type AccordionContentProps = {
  className?: string;
  title: string;
  text?: string;
  cta?: LinkProps;
};

const AccordionContentCard: FC<AccordionContentProps> = ({ className, title, text, cta }) => {
  return (
    <div className={classNames('AccordionContent', css.root, className)}>
      <div className={css.wrapper}>
        <p>{title}</p>
        {text && <p>{text}</p>}
      </div>

      {cta && <Cta className={css.cta} isWhite={true} theme={ButtonType.Secondary} {...cta} />}
    </div>
  );
};

export default memo(AccordionContentCard);
