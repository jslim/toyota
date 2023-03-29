import { FC, memo, useState } from 'react';
import classNames from 'classnames';

import css from './Cta.module.scss';

import BaseButton, { BaseProps as BaseButtonProps } from '@/components/BaseButton/BaseButton';
import BaseLink, { Props as BaseLinkProps } from '@/components/BaseLink/BaseLink';
import IconCircle from '@/components/IconCircle/IconCircle';

import ArrowSvg from '@/components/svgs/svg-arrow.svg';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Large = 'large',
  Icon = 'icon'
}
export type CtaProps = (BaseButtonProps | BaseLinkProps) & {
  isWhite?: Boolean;
  isActive?: Boolean;
  setActiveOutside?: Boolean;
  theme?: ButtonType;
};

const isLink = (props: CtaProps): props is BaseLinkProps => {
  // check if the specified property has href
  return 'href' in props;
};

const Cta: FC<CtaProps> = ({
  isWhite,
  isActive,
  setActiveOutside = false,
  theme = ButtonType.Primary,
  ...props
}: CtaProps) => {
  const [hover, setHover] = useState(false);
  return (
    <>
      {isLink(props) ? (
        <BaseLink
          {...props}
          className={classNames(props.className, css.root, {
            [css.isWhite]: isWhite
          })}
          onMouseEnter={() => !setActiveOutside && setHover(true)}
          onMouseLeave={() => !setActiveOutside && setHover(false)}
        >
          <IconCircle isWhite={isWhite} isActive={setActiveOutside ? isActive : hover} theme={theme}>
            {theme === ButtonType.Primary ? <ArrowSvg /> : props.children}
          </IconCircle>
          {props.title && <div className={css.label}>{props.title}</div>}
        </BaseLink>
      ) : (
        <BaseButton
          {...props}
          className={classNames(props.className, css.root, {
            [css.isWhite]: isWhite
          })}
          onMouseEnter={() => !setActiveOutside && setHover(true)}
          onMouseLeave={() => !setActiveOutside && setHover(false)}
        >
          <IconCircle isWhite={isWhite} isActive={setActiveOutside ? isActive : hover} theme={theme}>
            {theme === ButtonType.Primary ? <ArrowSvg /> : props.children}
          </IconCircle>
          {props.title && <div className={css.label}>{props.title}</div>}
        </BaseButton>
      )}
    </>
  );
};

export default memo(Cta);
