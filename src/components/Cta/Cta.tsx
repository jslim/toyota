import { FC, memo, useState } from 'react';
import classNames from 'classnames';

import css from './Cta.module.scss';
import BaseButton, { BaseProps as BaseButtonProps } from '@/components/BaseButton/BaseButton';
import BaseLink, { Props as BaseLinkProps } from '@/components/BaseLink/BaseLink';
import IconCircle from '@/components/IconCircle/IconCircle';

import ArrowSvg from '@/components/svgs/svg-arrow.svg';

export type CtaProps = (BaseButtonProps | BaseLinkProps) & {
  isWhite?: Boolean;
  fittedWidth?: Boolean;
  isBold?: Boolean;
  isVert?: Boolean;
};

const isLink = (props: CtaProps): props is BaseLinkProps => {
  // check if the specified property has href
  return 'href' in props;
};

const Cta: FC<CtaProps> = ({ isWhite, fittedWidth, isBold, isVert, ...props }: CtaProps) => {
  const [active, setActive] = useState(false);
  return (
    <>
      {isLink(props) ? (
        <BaseLink
          {...props}
          className={classNames(props.className, css.root, {
            [css.isWhite]: isWhite,
            [css.active]: active
          })}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          <IconCircle isCta={props.title ? true : false} isWhite={isWhite} isActive={active}>
            <ArrowSvg />
          </IconCircle>
          {props.title && <div className={css.label}>{props.title}</div>}
        </BaseLink>
      ) : (
        <BaseButton
          {...props}
          className={classNames(props.className, css.root, {
            [css.isWhite]: isWhite,
            [css.active]: active
          })}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          <IconCircle isCta={props.title ? true : false} isWhite={isWhite} isActive={active}>
            <ArrowSvg />
          </IconCircle>
          {props.title && <div className={css.label}>{props.title}</div>}
        </BaseButton>
      )}
    </>
  );
};

export default memo(Cta);
